const $ = require('jquery');
import router from '../../router/index';
import store from '../../store/index';
"use strict";
class Library {
    #realmName
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.#realmName = location.origin + '/' + location.pathname.split('/')[1] + '/';
        } else {
            this.#realmName = location.origin + '/gczt/';
        }
    }
    // 请求
    ajaxRequest (data) {
        const config = {
            type: data.type ? 'post' : data.type,
            url: this.#realmName + data.way,
            data: data.parameter,
            dataType: data.dataType === undefined ? 'json' : data.type,
            async: data.isAsyn ? true : data.isAsyn, // 异步
            success: response => {
                if (data.success) {
                    data.success(response);
                }
                // if (response.state === 0) {
                //     store.dispatch('showSlider', response.message);
                // }
            },
            error: err => {
                if (data.error) {
                    data.error(err);
                }
                if (err.readyState === 4 && err.status === 1000) {
                    router.push({ name: '错误页面' });
                }
            },
            complete: response => {
                if (data.complete) {
                    data.complete(response);
                }
            },
        };
        if (data.addOption) {
            Object.assign(config, data.addOption);
        }
        return $.ajax(config);
    }
}
export default new Library();