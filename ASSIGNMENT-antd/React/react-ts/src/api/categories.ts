import { instance } from "./instance"
import { ICategory } from "../types/category";

export const getAllCategory = (keywords: string) => {
    return instance.get(`/categories?_keywords=${keywords}`);
}
export const getOneCategory = (_id: string) => {
    return instance.get("/categories/" + _id);
}
export const updateCategory = (category: ICategory) => {
    return instance.put("/categories/" + category._id, category);
}
export const RemoveCategory = (_id: string) => {
    return instance.delete("/categories/" + _id);
}
export const CreateCategory = (category: ICategory) => {
    return instance.post("/categories", category);
}
