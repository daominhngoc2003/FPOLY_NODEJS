// components
import { ICategory } from '../../../types/category'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Select, message } from 'antd';
import { IProduct } from '../../../types/products';

// kiểu dữ liệu
type Props = {
    products: IProduct[],
    onAdd: (category: ICategory) => any
}

const AddCategory = ({ onAdd, products }: Props) => {
    // antd
    const { Option } = Select;
    const [form] = Form.useForm();
    // Điều hướng
    const navigate = useNavigate();

    // hàm xử lý
    const onFinish = (data: any) => {
        onAdd(data);

        message.success("Thêm danh mục thành công")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    // const onGenderChange = (value: string) => {
    //     switch (value) {
    //         case 'male':
    //             form.setFieldsValue({ note: 'Hi, man!' });
    //             break;
    //         default:
    //     }
    // };

    return (
        <div>
            <h1 className='text-center'>Add new Category</h1>
            <Form
                name="control-hooks"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                {/* <Form.Item name="products" label="Products" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={onGenderChange}
                        allowClear
                    >
                        {products.map((pro, index) => {
                            return (
                                <Option key={index} value={pro._id}>{pro.name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item> */}
                <Form.Item
                    label="Category name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Category name!' }, {
                        pattern: /^[^\s]+(\s+[^\s]+)*$/,
                        message: 'Spaces are not allowed in this field',
                    }]}
                >
                    <Input autoComplete="name" />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your Image!' }, {
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
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddCategory