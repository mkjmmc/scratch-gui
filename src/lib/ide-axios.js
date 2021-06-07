import axios from 'axios';

// import {
//     openIdeLogin
// } from '../reducers/modals';

// axios.defaults.baseURL = 'http://ide-server.yunqilab.com';
// axios.defaults.baseURL = 'http://localhost:4002/api';
// axios.defaults.baseURL = 'https://scratch.yzsteam.com/api';
axios.defaults.baseURL = 'https://xmybc.com/api';

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use(config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    console.log('request begin');
    return config;
});


// // get接口测试，传入一个参数id，请求/test/:id接口，返回response并且将数据通过指定的action保存到store。
// export const getTest = id => async (dispatch, getState) => {
//     try {
//         let response = await getData(`/test/${id}`)
//         await dispatch(saveReducer(response.data))
//     } catch (error) {
//         console.log('error: ', error)
//     }
// }

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(response => {
    const data = response.data;

    console.log(data);

    return data;
}, err => { // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
        switch (err.response.status) {
        case 400:
            err.message = '请求错误';
            break;

        case 401:
            err.message = '未授权，请登录';
            // window.location.href = '/';
            break;

        case 403:
            err.message = '拒绝访问';
            break;

        case 404:
            err.message = `请求地址出错: ${err.response.config.url}`;
            break;

        case 408:
            err.message = '请求超时';
            break;

        case 500:
            err.message = '服务器内部错误';
            break;

        case 501:
            err.message = '服务未实现';
            break;

        case 502:
            err.message = '网关错误';
            break;

        case 503:
            err.message = '服务不可用';
            break;

        case 504:
            err.message = '网关超时';
            break;

        case 505:
            err.message = 'HTTP版本不受支持';
            break;

        default:
        }
    }

    return Promise.reject(err);
});


const get = (url, authorization) => new Promise((resolve, reject) => {
    axios({
        method: 'GET',
        url: url,
        headers: {authorization: authorization},
        json: true
    })
        .then(res => {
            // console.log(`${url}\tGet请求到:`);
            // console.log(res);
            // alert('get:'+this.res);
            resolve(res);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
});
const post = (url, authorization, data) => new Promise((resolve, reject) => {
    axios({
        method: 'POST',
        url: url,
        headers: {authorization: authorization},
        json: true,
        data: data
    })
        .then(res => {
            // console.log(`${url}\tGet请求到:`);
            // console.log(res);
            // alert('get:'+this.res);
            resolve(res);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
});
const put = (url, authorization, data) => new Promise((resolve, reject) => {
    axios({
        method: 'PUT',
        url: url,
        headers: {authorization: authorization},
        json: true,
        data: data
    })
        .then(res => {
            // console.log(`${url}\tGet请求到:`);
            // console.log(res);
            // alert('get:'+this.res);
            resolve(res);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
});

// const mapDispatchToProps = dispatch => ({
//     openIdeLogin: () => dispatch(openIdeLogin())
// });
//
// export default injectIntl(connect(
//     null,
//     mapDispatchToProps
// )(axios));

export default {
    get,
    post,
    put
};
