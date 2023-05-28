import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Icon, { HomeOutlined, UserAddOutlined, AppleOutlined } from '@ant-design/icons';

const BaseLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let items: any = "";
  const user = JSON.parse(localStorage.getItem("user")!);
  const role = user && user.role;

  const { Header, Content, Sider, Footer } = Layout;
  if (localStorage.getItem("accessToken") && role !== "admin") {
    items = [
      {
        key: '#',
        label: (<a href='#'>Ngọc</a>),
      },
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: (<a href='/'>Trang chủ</a>),
      },
      {
        key: 'products',
        icon: React.createElement(NotificationOutlined),
        label: (<a href='/products'>Sản phẩm</a>),
      },
      {
        key: 'User',
        icon: <UserOutlined />,
        label: (<a href='/'>User</a>),
        children: [
          {
            key: `logout`,
            label: (<a href='/' onClick={() => { localStorage.removeItem("accessToken"), localStorage.removeItem("user") }}>logout</a>),
          },
        ]
      },
    ]
  }
  else if (role === "admin") {
    items = [
      {
        key: '#',
        label: (<a href='#'>Ngọc</a>),
      },
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: (<a href='/'>Trang chủ</a>),
      },
      {
        key: 'products',
        icon: React.createElement(NotificationOutlined),
        label: (<a href='/products'>Sản phẩm</a>),
      },
      {
        key: 'User',
        icon: <UserOutlined />,
        label: (<a href='/'>User</a>),
        children: [
          {
            key: `logout`,
            label: (<a href='/' onClick={() => { localStorage.removeItem("accessToken"), localStorage.removeItem("user") }}>logout</a>),
          },
          {
            key: `dashboard`,
            label: (<a href='/admin'>Trang quản trị</a>),
          }

        ]
      },
    ]
  }
  else {
    items = [
      {
        key: 'dashboard',
        label: (<a href='/admin'>Ngọc</a>),
      },
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: (<a href='/'>Trang chủ</a>),
      },
      {
        key: 'products',
        icon: React.createElement(NotificationOutlined),
        label: (<a href='/products'>Sản phẩm</a>),
      },
      {
        key: 'User',
        icon: <UserOutlined />,
        label: (<a href='/'>User</a>),
        children: [
          {
            key: `Signin`,
            label: (<a href='/signin'>Signin</a>),
          },
          {
            key: `Signup`,
            label: (<a href='/signup'>Signup</a>),
          },
        ]
      },
    ]

  }

  return (
    <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
        </Header>
        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <main><Outlet /></main>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Đào Minh Ngọc sdt: 0869827432</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default BaseLayout