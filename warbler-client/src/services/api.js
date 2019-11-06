import axios from "axios";

export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return new axios[method](path, data).then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err.response.data.error);
        });
    });
}