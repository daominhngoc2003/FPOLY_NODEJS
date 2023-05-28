
// conponents
import React, { useEffect, useState } from 'react'
import { IProduct } from '../../../types/products'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';
import { ICategory } from '../../../types/category';
import type { FormInstance } from 'antd/es/form';
import TextArea from 'antd/es/input/TextArea';

// định nghĩa kiểu dữ liệu
type IProps = {
    products: IProduct[],
    categories: ICategory[],
    onUpdate: (product: IProduct) => void
}

const UpdateProduct = ({ onUpdate, products, categories }: IProps) => {
    const formRef = React.useRef<FormInstance>(null);
    const { Option } = Select;
    const navigate = useNavigate();

    // Lấy ra id
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const concurren = products.find((pro) => pro._id === id);
        if (concurren) {
            formRef.current?.setFieldsValue(concurren);
        }
    }, [id, products])

    const onFinish = (values: any) => {
        const productUpdate = {
            ...values,
            _id: id
        }
        onUpdate(productUpdate);
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

    // k cần để ý
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
            <h1 className='text-center'>Update Products</h1>
            <Form
                name="control-ref"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
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
                    rules={[{ required: true, message: 'Please input price!' }]}
                >
                    <Input autoComplete="price" />
                </Form.Item>

                <Form.Item label="Description" name="description"
                    rules={[{ required: true, message: 'Please input description!' }]}>
                    <TextArea rows={4} autoComplete="description" />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input image!' }]}
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
        </div>
    )
}

export default UpdateProduct