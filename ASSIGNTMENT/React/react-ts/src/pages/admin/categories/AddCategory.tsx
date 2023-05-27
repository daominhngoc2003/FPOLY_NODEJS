import React from 'react'
import { useForm } from 'react-hook-form'
import { ICategory } from '../../../types/category'
import { useNavigate } from 'react-router-dom'

type Props = {
    onAdd: (category: ICategory) => any
}

const AddCategory = ({ onAdd }: Props) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onHandleSubmit = (data: any) => {
        onAdd(data);
        navigate("/admin/categories")
    }
    return (
        <div>
            <h1 className='text-center'>Add new Category</h1>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" {...register("name")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" {...register("image")} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddCategory