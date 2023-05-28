import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

import Nav from '../admin/Nav'
import { LaptopOutlined, NotificationOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { AntDesignOutlined, } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';

// const items1: MenuProps['items'] = [
//   {
//     key: 'dashboard',
//     label: (<Avatar.Group>
//       <Avatar src="https://res.cloudinary.com/fashsion-brand/image/upload/v1677003861/portfolio/jqfcw2bdpy9vcg5mciyr.jpg" />
//     </Avatar.Group>),
//     children: [
//       {
//         key: `ListProduct`,
//         label: (<a href='#'>Thông tin</a>),

//       },
//       {
//         key: `ListProduct`,
//         label: (<a href='/'>Thoát</a>),

//       },
//     ]
//   }]

const items2 = [
  {
    key: 'dashboard',
    label: (<Avatar.Group>
      <Avatar className='m-5' src="https://res.cloudinary.com/fashsion-brand/image/upload/v1677003861/portfolio/jqfcw2bdpy9vcg5mciyr.jpg" />
    </Avatar.Group>),
    children: [
      {
        key: `animation`,
        label: (<a href='#'>Thông tin</a>),

      },
      {
        key: `logout`,
        label: (<a href='/'>Thoát</a>),

      },
    ]
  },
  {
    key: 'dashboard',
    icon: React.createElement(NotificationOutlined),
    label: (<a href='/admin'>Dashboard</a>),
  },
  {
    key: 'products',
    icon: React.createElement(UserOutlined),
    label: 'Products',
    children: [
      {
        key: `ListProduct`,
        label: (<a href='/admin/products'>ListProduct</a>),

      },
      {
        key: `AddProduct`,
        label: (<a href='/admin/products/add'>AddProduct</a>),
      }

    ]
  },
  {
    key: 'category',
    icon: React.createElement(LaptopOutlined),
    label: 'Category',
    children: [
      {
        key: `ListCategory`,
        label: (<a href='/admin/categories'>ListCategory</a>),

      },
      {
        key: `AddCategory`,
        label: (<a href='/admin/categories/add'>AddCategory</a>),
      }

    ]
  },

];

type Props = {}

function AdminLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      {/* <Layout>
       <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header> 
        <Content style={{ padding: '0 50px' }}>

          <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}><main><Outlet /></main></Content>
          </Layout>
        </Content>
      </Layout> */}
      {/* <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header> */}
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items2} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
              <main><Outlet /></main>
            </div>
          </Content>
        </Layout>
      </Layout>

    </div>
  )
}

export default AdminLayout