import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import queryString from 'querystring';

// 请到 https://www.volcengine.com 注册账号并申请 key
const accessKeyId = '';
const secretAccessKey = '';

const languages = ['zh-cn', 'en'];
const defaultLanguage = 'zh-cn';

// ============================ 火山翻译 ============================

/**
 * 不参与加签过程的 header key
 */
const HEADER_KEYS_TO_IGNORE = new Set([
  'authorization',
  'content-type',
  'content-length',
  'user-agent',
  'presigned-expires',
  'expect',
]);

/**
 * 翻译
 * @param SourceLanguage {string}
 * @param TargetLanguage {string}
 * @param TextList {string[]}
 */
export default async function volcano({ SourceLanguage, TargetLanguage, TextList }) {
  const signParams = {
    headers: {
      // x-date header 是必传的
      ['X-Date']: new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''),
      'Content-Type': 'application/json',
    },
    method: 'POST',
    query: {
      Version: '2020-06-01',
      Action: 'TranslateText',
    },
    body: JSON.stringify({
      SourceLanguage,
      TargetLanguage,
      TextList,
      Options: { Category: 'clean' },
    }),
    accessKeyId,
    secretAccessKey,
    serviceName: 'translate',
    region: 'cn-beijing',
  };
  const authorization = sign(signParams);
  const response = await fetch(
    `https://translate.volcengineapi.com?${queryString.stringify(signParams.query)}`,
    {
      headers: {
        ...signParams.headers,
        Authorization: authorization,
      },
      method: signParams.method,
      body: signParams.body,
    },
  );
  return response.json().then((res) => res.TranslationList.map((item) => item.Translation));
}

function sign(params) {
  const {
    headers = {},
    query = {},
    region = '',
    serviceName = '',
    method = '',
    pathName = '/',
    accessKeyId = '',
    secretAccessKey = '',
    body,
  } = params;
  const searchParams = new URLSearchParams(query);
  searchParams.sort();

  const datetime = headers['X-Date'];
  const date = datetime.substring(0, 8);
  // 创建正规化请求
  const [signedHeaders, canonicalHeaders] = getSignHeaders(headers);

  const canonicalRequest = [
    method.toUpperCase(),
    pathName,
    searchParams.toString() || '',
    `${canonicalHeaders}\n`,
    signedHeaders,
    crypto.createHash('sha256').update(body).digest('hex'),
  ].join('\n');
  const credentialScope = [date, region, serviceName, 'request'].join('/');
  // 创建签名字符串
  const stringToSign = ['HMAC-SHA256', datetime, credentialScope, hash(canonicalRequest)].join(
    '\n',
  );
  // 计算签名
  const kDate = hmac(secretAccessKey, date);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, serviceName);
  const kSigning = hmac(kService, 'request');
  const signature = hmac(kSigning, stringToSign).toString('hex');

  return [
    'HMAC-SHA256',
    `Credential=${accessKeyId}/${credentialScope},`,
    `SignedHeaders=${signedHeaders},`,
    `Signature=${signature}`,
  ].join(' ');
}

function hmac(secret, s) {
  return crypto.createHmac('sha256', secret).update(s, 'utf8').digest();
}

function hash(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex');
}

function getSignHeaders(originHeaders) {
  function trimHeaderValue(header) {
    return header.toString?.().trim().replace(/\s+/g, ' ') ?? '';
  }

  const needSignSet = new Set(['x-date', 'host'].map((k) => k.toLowerCase()));
  const h = Object.keys(originHeaders)
    .filter((k) => needSignSet.has(k.toLowerCase()))
    .filter((k) => !HEADER_KEYS_TO_IGNORE.has(k.toLowerCase()));

  const signedHeaderKeys = h
    .map((k) => k.toLowerCase())
    .sort()
    .join(';');
  const canonicalHeaders = h
    .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
    .map((k) => `${k.toLowerCase()}:${trimHeaderValue(originHeaders[k])}`)
    .join('\n');
  return [signedHeaderKeys, canonicalHeaders];
}

// ============================ 翻译处理 ============================

/**
 * 加载语言新消息
 * @returns {Promise<{ [key: string]: { [key: string]: string } }>}
 */
async function getLocales() {
  const messages = await Promise.all(
    languages.map((item) =>
      import(`./src/locales/${item}/messages.json`, { assert: { type: 'json' } }).then(
        (m) => m.default,
      ),
    ),
  );
  return Object.fromEntries(languages.map((item, index) => [item, messages[index]]));
}

const locales = await getLocales();

async function transform({ from, to, outputPath }) {
  const originLocales = locales[from];
  const targetLocales = locales[to];
  // 翻译队列，用于批量翻译
  let taskQueue = [];
  for (let index = 0, keys = Object.keys(originLocales); index < keys.length; index += 1) {
    const key = keys[index];
    const value = originLocales[key];
    // 已翻译则跳过
    // 特殊处理：httpCode 开头则跳过
    if (targetLocales[key] || key.startsWith('httpCode')) {
      continue;
    }
    // 转换文本中的 `{}` 变量为数字，避免被翻译替换
    const variables = extractTextVariable(value);
    taskQueue.push({ key, value, filledValue: fillVariableToNumber(value, variables), variables });
    // 队列已满时翻译
    if (taskQueue.length >= 16) {
      await batchTransition();
    }
  }
  // 循环结束后翻译剩下的文本
  if (taskQueue.length) {
    await batchTransition();
  }

  async function batchTransition() {
    const res = await volcano({
      TextList: taskQueue.map((n) => n.filledValue),
      TargetLanguage: to,
      SourceLanguage: 'zh',
    });
    taskQueue.forEach((item, i) => {
      const translated = restoreVariable(res[i], item.variables);
      targetLocales[item.key] = translated;
      console.log(`成功: ${item.value} -> ${translated}`);
    });
    taskQueue = [];
  }

  await fs.writeFileSync(
    path.resolve(process.cwd(), outputPath),
    JSON.stringify(targetLocales, null, 2),
  );
}

/**
 * @param text {string}
 */
function extractTextVariable(text) {
  const reg = /\{\w+?}|<\w+?>|<\/\w+?>/g;
  const result = [];
  let cursor = null;
  while ((cursor = reg.exec(text))) {
    result.push(cursor[0]);
  }
  return result;
}

// 使用独特的占位符，避免被翻译替换
function getUniqueIndex(index) {
  return `{${-1 - index}}`;
}

/**
 * @param text {string}
 * @param variables {string[]}
 */
function fillVariableToNumber(text, variables) {
  return variables.reduce((prev, curr, index) => prev.replace(curr, getUniqueIndex(index)), text);
}

/**
 * @param text {string}
 * @param variables {string[]}
 */
function restoreVariable(text, variables) {
  return variables.reduce((prev, curr, index) => prev.replace(getUniqueIndex(index), curr), text);
}

async function translate() {
  const tasks = languages
    .map((item) => ({
      from: defaultLanguage,
      to: item,
    }))
    .filter((item) => item.from !== item.to);

  for (const item of tasks) {
    console.log(`开始翻译: ${item.to}`);
    await transform({
      from: item.from,
      to: item.to,
      outputPath: `./src/locales/${item.to}/messages.json`,
    });
    console.log(`翻译完成: ${item.to}`);
  }
}

translate();
