import { Dropdown, Layout, Menu, theme, Avatar, Breadcrumb } from "antd";
import { Link, Outlet } from "react-router-dom";
import { getIsLogin, Logout } from "../../utils/userAuth";
import {UserOutlined, GlobalOutlined} from '@ant-design/icons';
import React from "react";
//import styles from './loginLayout.module.css'
const { Header, Content, Footer } = Layout
const items = [ 
 {
  key:'1',
  label:<Link to='/'>Home</Link>
 },
 {
  key:'2',
  label:<Link to='/about'>About</Link>
 },
 {
  key:'3',
  label:<Link to='/Login'>Login</Link>
 },
 {
  key:'4',
  label:<Link to='/teacher'>Teacher</Link>
 },
 {
  key:'5',
  label:<Link to='/Studen'>Student</Link>             
 },
 {
  key:'6',
  label:<Link to='/Class'>Class</Link>             
},
{
  key:'7',
  label:<Link to='/Subjct'>Subject</Link>             
                   },
{
key:'8',
label:<Link to='/Subjct'>..</Link>             
  },
];
// User Menu
const userMenu = (
 <Menu>
   <Menu.Item key="1" onClick={()=>{ Logout();window.location.href='/';}}>
   Logout
   </Menu.Item>                 
 </Menu>
);

// Language Menu 
const LanguageMenu =(
 <Menu>
  <Menu.Item key ='en'>English</Menu.Item>
  <Menu.Item key='kh'>Khmer</Menu.Item>
 </Menu>
);

// function Login Layout 1
const LoginLayout1 = () => {
  const isLogin = getIsLogin();
  const {
   token:{colorBgContainer, borderRadiusLG},
  }=theme.useToken();

  return (
   <Layout>
    <Header
      style ={{
        position :'sticky',
        top:0,
        zIndex:1,
        width:'100%',
        display:'flex',
        alignItems:'center',
      }}>
      <div className="demo-log"/>
      <Menu 
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['1']}
      items={items}
      style={{
        flex:1,
        minWidth:0,
      }}
      />
      {isLogin && (
       <>
         <Dropdown overlay={LanguageMenu} placement='bottomRight'>
           <GlobalOutlined style={{fontSize:'18px',color:'#fff', marginRight:'20px'}}/>

         </Dropdown>
         <Dropdown overlay={userMenu} placement='bottomRight'>
           <Avatar icon={<UserOutlined/>} style={{ cursor:'pointer'}}/>        
         </Dropdown>
      </>
)}
      
    </Header>
    <Content style ={{padding: '0 48px',}}>
        <Breadcrumb style={{margin:'16px 0',}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        <div style={{
          padding:24,
          minHeight:380,
          background:colorBgContainer,
          borderRadius:borderRadiusLG,
        }}>
        <Outlet />
        </div>
      </Content>
      <Footer style={{textAlign:'center',}}>
       Ant Design ©{new Date().getFullYear()} create by ant UED
      </Footer>
   </Layout>
  );
};
export default LoginLayout1;