import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        // Dấu chấm than chắc chắn dữ liệu có và không phải null
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken")!)}`
    }
})