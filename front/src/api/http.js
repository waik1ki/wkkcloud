import axios from 'axios'
import store from '../store'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API
})

instance.interceptors.request.use(function(config){
    if (store.state.auth.token !== null) {
        config['headers'] = {
            Authorization: `Bearer ${store.state.auth.token}`
        }
    }

    return config;
});

instance.interceptors.response.use(
    function(res){
        if (res.data.respText !== undefined) {
            store.commit('setRespText', res.data.respText);
            store.commit('error/setValidationError', null);
            return res
        } else {
            store.commit('error/setValidationError', null);
            return res;
        }
    },
    function (errors) {
        if (errors.response.status === 422) {
            store.commit('error/setValidationError', errors.response.data.err);
        } else {
            return Promise.reject(errors)
        }
    }
);

export default instance