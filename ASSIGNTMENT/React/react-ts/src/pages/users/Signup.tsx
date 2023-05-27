import React from 'react'
import { useForm } from "react-hook-form";
import { IUser } from '../../types/auth';
type Props = {
    onSignup: (user: IUser) => void
}

const Signup = ({ onSignup }: Props) => {
    const { register, handleSubmit, formState: { errors }
    } = useForm();

    const onHandleSubmit = (user: any) => {
        onSignup(user);
    }
    return (
        <div>
            <h1 className='text-center'>Signup</h1>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" {...register("name")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  {...register("email")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" {...register("password")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="comfirmPassword" className="form-label">comfirmPassword</label>
                    <input type="password" className="form-control" id="comfirmPassword" {...register("confirmPassword")} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup