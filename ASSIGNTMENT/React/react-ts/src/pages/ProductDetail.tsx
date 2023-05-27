import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { IProduct } from '../types/products';
import { getOneProduct } from '../api/product';
type Props = {
    products: IProduct[]
}

const ProductDetail = ({ products }: Props) => {
    const { id } = useParams<{ id: string }>();
    const [product, setproduct] = useState<IProduct>();
    useEffect(() => {
        const concurren = products.find((pro) => pro._id === String(id))
        setproduct(concurren);

    }, [products]);

    return (
        <div className="container">
            <h1>{product?.name}</h1>
            <span>view</span>
            <hr />
            <div className="row">
                <div className="col text-center">
                    <img src={product?.image} width={350} alt="" />
                </div>
                <div className="col">
                    <div>
                        <div>
                            <span>{Number(product?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            <span><del>{Number("20000000").toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del></span>
                        </div>
                        <div>
                            <button>Mua ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail