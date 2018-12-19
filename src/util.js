import axios from 'axios'
// RequestBody
export const postJsonRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
// formData
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const getRequest = (url, data = '') => {
    return axios({
        method: 'get',
        params: data,
        url: url,
    });
}

export const globalVar={
    serverUrl:'http://localhost:8003',
    fakeAuth : {
        isAuthenticated: false,
        authenticate(cb) {
            this.isAuthenticated = true;
            setTimeout(cb, 100); // fake async
        },
        signout(cb) {
            this.isAuthenticated = false;
            setTimeout(cb, 100);
        }
    }
}
