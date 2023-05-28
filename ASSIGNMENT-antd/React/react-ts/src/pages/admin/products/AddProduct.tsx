// components
import React from 'react'
import { IProduct } from '../../../types/products';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { ICategory } from '../../../types/category';
const { TextArea } = Input;

// định nghĩa kiểu dữ liệu
type Props = {
    categories: ICategory[],
    onAdd: (product: IProduct) => void;
}

const AddProduct = ({ onAdd, categories }: Props) => {
    // antd
    const formRef = React.useRef<FormInstance>(null);
    const { Option } = Select;

    // sử dụng hàm để chuyển hướng
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        onAdd(values);
        message.success("Thêm sản phẩm thành công")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFill = () => {
        formRef.current?.setFieldsValue({ note: 'Hello world!', gender: 'male' });
    };

    // ko cần để ý
    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                formRef.current?.setFieldsValue({ note: 'Hi, man!' });
                break;
            default:
                break;
        }
    };
    return (
        <div>
            <h1 className='text-center'>Add new Products</h1>
            <Form
                name="control-ref"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 30 }}
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                ref={formRef}

            >
                <Form.Item name="categoryId" label="CategoryId" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={onGenderChange}
                        allowClear
                    >
                        {categories.map((cate, index) => {
                            return (
                                <Option key={index} value={cate._id}>{cate.name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name products!' }]}
                >
                    <Input autoComplete="name" />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input price!' }, {
                        pattern: /^[^\s]+(\s+[^\s]+)*$/,
                        message: 'Spaces are not allowed in this field',
                    },]}
                >
                    <Input autoComplete="price" />
                </Form.Item>

                <Form.Item label="Description" name="description"
                    rules={[{ required: true, message: 'Please input description!' }, {
                        pattern: /^[^\s]+(\s+[^\s]+)*$/,
                        message: 'Spaces are not allowed in this field',
                    }]}>
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input image!' }, {
                        pattern: /^[^\s]+(\s+[^\s]+)*$/,
                        message: 'Spaces are not allowed in this field',
                    }]}
                >
                    <Input autoComplete="image" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                    </Button>

                </Form.Item>
            </Form>
        </div >
    )
}

export default AddProduct