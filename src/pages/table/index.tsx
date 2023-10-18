import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { useAntdTable } from 'ahooks';
import type { ColumnsType } from 'antd/lib/table';

const { Option } = Select;

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  list: Item[];
}

const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: Record<string, any>,
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

export function Component() {
  const [form] = Form.useForm();

  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { type, changeType, submit, reset } = search;

  const columns: ColumnsType<Item> = [
    {
      title: '姓名',
      dataIndex: ['name', 'last'],
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
  ];

  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="姓名" name="name">
              <Input placeholder="姓名" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="邮箱" name="email">
              <Input placeholder="邮箱" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="电话" name="phone">
              <Input placeholder="电话" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              重置
            </Button>
            <Button type="link" onClick={changeType}>
              基础查询
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );

  const searchForm = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item name="gender">
          <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
            <Option value="">全部</Option>
            <Option value="male">男性</Option>
            <Option value="female">女性</Option>
          </Select>
        </Form.Item>
        <Form.Item name="name">
          <Input.Search placeholder="输入姓名" style={{ width: 240 }} onSearch={submit} />
        </Form.Item>
        <Button type="link" onClick={changeType}>
          高级查询
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      {type === 'simple' ? searchForm : advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
}
