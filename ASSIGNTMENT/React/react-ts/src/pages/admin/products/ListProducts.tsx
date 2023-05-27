import React from 'react'
import { IProduct } from '../../../types/products'

type Props = {
    products: IProduct[],
    onRemove: (_id: string) => void
}

const ListProducts = ({ products, onRemove }: Props) => {
    const onHandleRemove = (_id: string) => {
        onRemove(_id);
    }
    return (
        <div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((pro, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{pro.name}</td>
                                    <td>{Number(pro.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td>{pro.description}</td>
                                    <td><img src={pro.image} alt="" width={100} /></td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => onHandleRemove(pro._id)}><i className="fa-solid fa-trash"></i></button>
                                        <a className='btn btn-warning' href={"/admin/products/" + pro._id + "/update"}><i className="fa-solid fa-pen-to-square"></i></a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListProducts