import React from 'react'
import { IUser } from '../../types/auth';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {
    onSignin: (user: IUser) => void,
}
const Signin = ({ onSignin }: Props) => {
    const navigate = useNavigate();
    const onFinish = (user: any) => {
        onSignin(user);
        // const storedUser = JSON.parse(localStorage.getItem("user")!);
        // if (storedUser && storedUser.password !== user.password) {
        //     alert("Sai mật khảu hoặc tài khaonr")
        //     return;
        // }
        // message.success("Đăng nhập thành công");
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <h1 className='text-center'>Signin</h1>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                initialValues={{ remember: true }}
                style={{ maxWidth: 700, margin: "0 auto" }}

            >
                <Form.Item
                    name="email"
                    rules={[{
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',

                    },]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} type='email' placeholder="Email" autoComplete="email" />
                </Form.Item>


                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',

                        },
                        {
                            min: 6,
                            message: 'Vui lòng nhập lớn hơn 6 ký tự!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="/signup">register now!</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Signin