import axios from "axios";

import {getCookie} from "../utils/useCookies";
import {userAccessTokenName} from "../constants/application";

export let host = "http://185.196.214.27";
// export let host = "http://localhost";
export let port = "8081";

export let token = getCookie(userAccessTokenName);
export const imgUrl = `${host}:${port}/api/file/preview/`;
export let langs = localStorage.getItem("lang") != null ? localStorage.getItem("lang") : "uz";

export let headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ` + getCookie(userAccessTokenName),
    "lang": langs
};

export const setHeaders = () => {
    headers.lang = localStorage.getItem("lang") != null ? localStorage.getItem("lang") : "uz";
}

export let axiosInstance = axios.create({
    baseURL: `${host}:${port}` + '/api',
    headers,
    timeout: 15000,
});

export let axiosInstanceFile = axios.create({
    baseURL: `${host}:${port}` + '/api/file/',
    timeout: 30000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export const setRequestHeader = (userToken) => {
    token = getCookie(userAccessTokenName);

    headers = {
        ...headers,
        "Authorization": `Bearer ${userToken}`,
    }

    axiosInstance = axios.create({
        baseURL: `${host}:${port}` + '/api',
        headers,
        timeout: 15000,
    })
}