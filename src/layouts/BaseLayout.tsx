import React, { useState } from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { DesktopOutlined, PieChartOutlined, FileOutlined } from '@ant-design/icons';
import { Trans } from '@lingui/macro';
import styles from './BaseLayout.module.less';

const { Header, Content, Footer, Sider } = Layout;

export default function BaseLayout() {
  // 收缩侧边栏
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(isOpen) => setCollapsed(isOpen)}>
        {' '}
        <Tooltip placement="right" title={'公众号：前端要努力'}>
          <div className={styles.logo}>
            <Trans>前端要努力</Trans>
          </div>
        </Tooltip>
        <Menu theme="dark" defaultSelectedKeys={[`${useLocation().pathname}`]} mode="inline">
          <Menu.Item key="/doc" icon={<PieChartOutlined />}>
            <Link to={'/doc'}>文档</Link>
          </Menu.Item>
          <Menu.Item key="/icon" icon={<PieChartOutlined />}>
            <Link to={'/icon'}>图标</Link>
          </Menu.Item>
          <Menu.Item key="/auth" icon={<PieChartOutlined />}>
            <Link to={'/auth'}>权限</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub2" icon={<DesktopOutlined />} title="组件">
            <Menu.Item key="/custom">
              <Link to={'/custom'}>远程搜索框</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/locale" icon={<FileOutlined />}>
            <Link to={'/locale'}> 国际化搭建</Link>
          </Menu.Item>
          <Menu.SubMenu key="/table" icon={<DesktopOutlined />} title="表格">
            <Menu.Item key="/table/base">
              <Link to={'/table/base'}>基础表格</Link>
            </Menu.Item>{' '}
            <Menu.Item key="/table/drag">
              <Link to={'/table/drag'}>拖拽表格</Link>
            </Menu.Item>{' '}
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>
          vite-react-template ©2021 Created by 公众号：前端要努力 ；微信号843655240
        </Footer>
      </Layout>
    </Layout>
  );
}
