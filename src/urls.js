import axios from 'axios'

let urls = {
    'login': 'login',
    'logout': 'logout',
}

let axiosConfigured = axios.create({
    baseURL: 'api',
});

axiosConfigured.defaults.headers.common['Content-Type'] = 'application/json'

export default {
    get(urlName) {
        return urls[urlName]
    },
    authHeader() {
        let user = JSON.parse(localStorage.getItem('user'))

        if (user && user.token) {
            return {'Authorization': 'Bearer ' + user.token}
        }

        return {};
    },
    getAxios() {
        window.console.log(axiosConfigured.defaults.headers);
        return axiosConfigured
    }
}
