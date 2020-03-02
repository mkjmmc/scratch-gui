import axios from './ide-axios.js';

const getIdeAccountInfo = authorization => axios.get('/v1/account/scinfo', authorization);
const postIdeAccountLogin = (authorization, loginName, password) => axios.post('/v1/account/login', authorization, {login_name: loginName, password});

export {
    getIdeAccountInfo,
    postIdeAccountLogin
};
