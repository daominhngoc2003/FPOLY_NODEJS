import React, { useEffect, useState } from 'react'
import { IProduct } from '../../../types/products'
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

type IProps = {
    products: IProduct[],
    onUpdate: (product: IProduct) => void
}
const UpdateProduct = ({ onUpdate, products }: IProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const concurren = products.find((pro) => pro._id === String(id))
        reset(concurren);

    }, [products]);
    const onHandleSubmit = (data: any) => {
        onUpdate(data);
        navigate("/admin/products")
    }

    return (
        <div>
            <h1 className='text-center'>Update Products</h1>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" {...register("name")} id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">price</label>
                    <input type="text" className="form-control" {...register("price")} id="price" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" {...register("description")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="name" {...register("image")} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateProduct