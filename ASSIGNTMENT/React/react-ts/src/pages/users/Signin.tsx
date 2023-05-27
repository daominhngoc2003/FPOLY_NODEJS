import React from 'react'
import { useForm } from "react-hook-form";
import { IUser } from '../../types/auth';

type Props = {
    onSignin: (user: IUser) => void,
}
const Signin = ({ onSignin }: Props) => {
    const { register, handleSubmit } = useForm();
    const onHandleSubmit = (user: any) => {
        onSignin(user);
    }
    return (
        <div>
            <h1 className='text-center'>Signin</h1>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  {...register("email")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" {...register("password")} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signin