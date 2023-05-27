import React from 'react'
import slideshowproduct from '../components/views/slideshow/slideshow-product'
import { IProduct } from '../types/products'
import { ICategory } from '../types/category'

type Props = {
    products: IProduct[],
    categories: ICategory[],
}

const ProductPage = ({ products, categories }: Props) => {
    return (
        <div>
            {slideshowproduct()}
            <div className="container mt-3">
                <div className="row ">
                    {categories.map((cate) => {
                        return (
                            <a href='' className="col-md-2 border rounded-start link-underline link-underline-opacity-0 text-center bg-white">
                                <div className=' pt-3'>
                                    <img width={100} className='border  bg-secondary-subtle p-3 rounded-circle' src={cate.image} alt="" />
                                </div>
                                <div className=' p-3'>
                                    <h5 className='text-black'>{cate.name}</h5>
                                </div>
                            </a>
                        )
                    })}
                </div>
                <div className='my-3'>
                    <img src="https://images.fpt.shop/unsafe/fit-in/1200x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/1/638159449604337600_H7.png" alt="" />
                </div>
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

export default ProductPage