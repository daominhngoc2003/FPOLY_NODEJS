import React from 'react'
import slideshow from '../components/views/slideshow/slideshow'
import Footer from '../components/views/Footer'
import { IProduct } from '../types/products'
import { ICategory } from '../types/category'

type Props = {
    products: IProduct[],
    categories: ICategory[],
}

const HomePage = ({ products, categories }: Props) => {
    return (
        <div>
            {slideshow()}
            <div className="container mt-5">
                <div className="row">
                    {products.map((pro, index) => {
                        return (
                            <div key={index} className="col-sm-3 shadow-hover">
                                <div className='text-center'>
                                    <a href={"/products/" + pro._id}><img src={pro.image} alt="" /></a>
                                </div>
                                <div className='shadow-sm p-3'>
                                    <a className='link-underline link-underline-opacity-0 text-black' href={"/products/" + pro._id}><h3>{pro.name}</h3></a>
                                    <span>{Number(pro.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> <br />
                                    <button className='btn btn-danger w-100 mt-2'><a className='link-underline link-underline-opacity-0 text-light' href={"/products/" + pro._id}>Xem thêm</a></button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default HomePage