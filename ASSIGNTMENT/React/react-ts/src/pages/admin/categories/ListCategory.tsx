import React from 'react'
import { ICategory } from '../../../types/category'

type Props = {
    categories: ICategory[],
    onRemove: (_id: string) => void
}

const ListCategory = ({ categories, onRemove }: Props) => {
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
                            <th scope="col">Image</th>
                            <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cate, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{cate.name}</td>
                                    <td><img src={cate.image} alt="" width={100} /></td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => onHandleRemove(cate._id)}><i className="fa-solid fa-trash"></i></button>
                                        <a className='btn btn-warning' href={"/admin/categories/" + cate._id + "/update"}><i className="fa-solid fa-pen-to-square"></i></a>
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

export default ListCategory