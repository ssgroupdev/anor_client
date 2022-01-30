import { HttpRequestHub } from '../HttpRequestHub';

export const loginUser = (obj) => {
    const config = {
        method: 'POST',
        url: `/auth/login`,
        data: obj
    }
    return HttpRequestHub(config);
}
export const registerUser = (obj) => {
    const config = {
        method: 'POST',
        url: `/auth/register`,
        data: obj
    }
    return HttpRequestHub(config);
}
export const checkCode = (username,code) => {
    const config = {
        method: 'POST',
        url: `/auth/check-code/`+username+"?code="+code
    }
    return HttpRequestHub(config);
}

export const forgotPassword = (username) => {
    const config = {
        method: 'POST',
        url: `/auth/forgot-password?username=`+username,

    }
    return HttpRequestHub(config);
}
export const newPassword = (username, password) => {
    const config = {
        method: 'POST',
        url: `/auth/reset-password/`+username+'?password='+password,
    }
    return HttpRequestHub(config);
}