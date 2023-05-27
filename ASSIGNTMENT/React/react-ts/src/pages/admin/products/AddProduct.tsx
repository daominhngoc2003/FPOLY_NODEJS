import React from 'react'
import { useForm } from "react-hook-form";
import { IProduct } from '../../../types/products';
import { useNavigate } from 'react-router-dom';

type Props = {

    onAdd: (product: IProduct) => void;
}

const AddProduct = (props: Props) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onHandleSubmit = (data: any) => {
        props.onAdd(data);
        navigate("/admin/products")
    }
    return (
        <div>
            <h1 className='text-center'>Add new Products</h1>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" {...register("name")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">price</label>
                    <input type="text" className="form-control" id="price"  {...register("price")} />
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

export default AddProduct