// conponents
import React from 'react';
import { IProduct } from '../../../types/products'
import { Image, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ICategory } from '../../../types/category';
import Icon, { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AudioOutlined, FormOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Pagination } from 'antd';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
// import Highlighter from 'react-highlight-words';

// định nghĩa kiểu dữ liệu
type Props = {
    categories: ICategory[],
    products: IProduct[],
    onKeyWords: (keys: string) => void,
    onRemove: (_id: string) => void
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

type DataIndex = keyof DataType;

const ListProducts = ({ products, onRemove, categories, onKeyWords }: Props) => {
    // antd
    const { Search } = Input;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    // các hàm xử lý
    // hàm tìm kiếm
    const onSearch = (value: string) => console.log(value);
    const onHandleChange = (e: any) => {
        e.preventDefault();
        onKeyWords(e.target.value.toLowerCase());
    };
    // hàm xóa
    const onHandleRemove = (_id: string) => {
        onRemove(_id);
    }
    //
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    // const handleReset = (clearFilters: () => void) => {
    //     clearFilters();
    //     setSearchText('');
    // };
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>

                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>

        ),

    })

    // dữ liệu đổ ra bảng
    const columns: ColumnsType<IProduct> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (record): any => {
                return (
                    <Image
                        width={200}
                        src={record}
                    />
                )
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (record): any => {
                return record.slice(0, 25).concat("...");
            }
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (record): any => {
                // console.log(categories.find(cate => cate._id === record));
                const catename = categories.find(cate => cate._id === record);
                return catename?.name
            }

        },
        {
            title: 'Action',
            key: 'action',
            render: (record) =>
            (
                <Space size="middle">

                    <Popconfirm
                        placement="top"
                        title={"Bạn có chắc chắn muốn xóa"}
                        description={"Xóa là mất"}
                        onConfirm={() => onHandleRemove(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' ><Link to={"/admin/products/" + record._id + "/update"}><FormOutlined /></Link></Button>
                        <Button type='primary' danger><DeleteOutlined /></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
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
            <Table columns={columns} dataSource={products} />

        </div >
    )
}

export default ListProducts