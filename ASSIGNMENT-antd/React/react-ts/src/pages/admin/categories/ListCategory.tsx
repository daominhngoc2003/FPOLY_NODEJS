// components
import { ICategory } from '../../../types/category'
import { Button, Image, message, Popconfirm } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../types/products';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Search from 'antd/es/input/Search';

// định nghĩa kiểu dữ liệu
type Props = {
    categories: ICategory[],
    products: IProduct[],
    onRemove: (_id: string) => void,
    onKeyWords: (keys: string) => void,
}

const ListCategory = ({ categories, products, onRemove, onKeyWords }: Props) => {
    // hàm xóa
    const HandleDelete = (_id: string) => {
        onRemove(_id);
    }
    // hàm tìm kiếm
    const onSearch = (value: string) => console.log(value);
    const onHandleChange = (e: any) => {
        e.preventDefault();
        onKeyWords(e.target.value.toLowerCase());
    };

    // dữ liệu bảng
    const columns: ColumnsType<ICategory> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (record): any => {
                return < Image width={200} src={record} />
            }
        },

        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <button className='btn btn-warning'><Link to={"/admin/categories/" + record._id + "/update"}>Sửa</Link></button>
                    <Popconfirm
                        placement="top"
                        title={"Bạn có chắc chắn xóa"}
                        description={"Xóa rồi là mất"}
                        onConfirm={() => HandleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger>Xóa</Button>
                    </Popconfirm>
                </Space >
            ),
        },
    ];
    return (
        <div>
            <h1>Danh sách loại</h1>
            <Space direction="vertical">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    onChange={onHandleChange}
                />
            </Space>
            <Table columns={columns} dataSource={categories} />;
        </div>
    )
}

export default ListCategory