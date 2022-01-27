import {HttpRequestHub} from '../../HttpRequestHub';
import {axiosInstanceFile} from "../../host";
import {message} from "antd";

const url = ""

export const getFile = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/file/?page=` + page + `&size=` + size,
    }
    return HttpRequestHub(config);
}

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
export const fileSend = (file) => {

    const test = new FormData();
    test.append("file", file);

    return createFile(test);

}


export const deleteFile = (id) => {
    const config = {
        method: 'DELETE',
        url: `/file/delete/` + id
    }
    return HttpRequestHub(config);
}