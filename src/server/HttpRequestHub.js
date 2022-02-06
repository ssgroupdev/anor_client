import {axiosInstance, setHeaders} from './host';
import { message } from "antd";

export const HttpRequestHub = (config = null) => {
    setHeaders();
    return axiosInstance(config).then((res) => {
        return res;
    }).catch((err) => {
        if (err.response) {
            console.log(err.response);
        }
        // message.error('Error happened!');
        return null;
    })
}