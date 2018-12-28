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


/**
 * 下面的主要为了登录认证
 * */
const LOGIN_COOKIE_NAME = 'sessionId'

export function isAuthenticated () {
    return _getCookie(LOGIN_COOKIE_NAME)
}

export function authenticateSuccess (token) {
    _setCookie(LOGIN_COOKIE_NAME, token)
}

export function logout () {
    _setCookie(LOGIN_COOKIE_NAME, '', 0)
}

function _getCookie (name) {
    let start, end
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + '=')
        if (start !== -1) {
            start = start + name.length + 1
            end = document.cookie.indexOf(';', start)
            if (end === -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(start, end))
        }
    }
    return ''
}

function _setCookie (name, value, expire) {
    let date = new Date()
    date.setDate(date.getDate() + expire)
    document.cookie = name + '=' + escape(value) + '; path=/' +
        (expire ? ';expires=' + date.toGMTString() : '')
}
