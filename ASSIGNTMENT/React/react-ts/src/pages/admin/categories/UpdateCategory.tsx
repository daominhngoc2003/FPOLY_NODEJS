import React, { useEffect } from 'react'
import { ICategory } from '../../../types/category'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

type Props = {
    categories: ICategory[],
    onUpdate: (category: ICategory) => void
}

const UpdateCategory = ({ categories, onUpdate }: Props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const concurren = categories.find((cate) => cate._id === String(id));
        reset(concurren)
    }, [categories])

    const onHandleSubmit = (data: any) => {
        onUpdate(data);
        navigate("/admin/categories")
    }
    return (
        <div>
            <h1 className='text-center'>Update Category</h1>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" {...register("name")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" {...register("image")} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default UpdateCategory