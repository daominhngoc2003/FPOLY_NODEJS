import { instance } from "./instance"
import { IProduct } from "../types/products";

export const getAllProduct = (keywords: string) => {
    return instance.get(`/products?_keywords= ${keywords}`);
}

export const getOneProduct = (id: string) => {
    return instance.get("/products/" + id);
}

export const updateProduct = (product: IProduct) => {
    return instance.put("/products/" + product._id, product);
}
export const addProduct = (product: IProduct) => {
    return instance.post("/products", product);
}

export const removeProduct = (_id: string) => {
    return instance.delete("/products/" + _id);
}