import axios from "axios";
import { baseUrl } from "./const";

export const $kinopoisk_api_public = axios.create({
    baseURL: baseUrl,
    headers: {
        "X-API-KEY": "d64d7150-d705-495a-a8fd-d73fa05e39a5",
    },
});

$kinopoisk_api_public.interceptors.request.use((config) => {
    if (!config?.headers) {
        throw new Error(
            "Expected 'config' and 'config.headers' not to be undefined"
        );
    }
    return config;
});

$kinopoisk_api_public.interceptors.response.use(
    (response) => {
        console.log(response.status);
        return response;
    },
    (error) => {
        if (!error.response) {
            console.error("Отсутствует подключение к сети");
        } else {
            console.error("Ошибка:", error.response.status);
        }
        return Promise.reject(error);
    }
);