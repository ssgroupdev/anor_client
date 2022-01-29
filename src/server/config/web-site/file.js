import {HttpRequestHub} from '../../HttpRequestHub';
import {axiosInstanceFile} from "../../host";
import {message} from "antd";

const url = ""

export const createFile = (obj) => {
    const config = {
        method: 'POST',
        url: `/`,
        data: obj
    }
    return axiosInstanceFile(config).then(res => res).catch(err => {
        if (err.response) {
            console.log(err.response);
        }
        message.error('Error happened!')
        return null;
    });
}
