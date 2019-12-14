import axios from 'axios'

let urls = {
    'login': 'login',
    'logout': 'logout',
    'lessons': 'lessons',
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
            return {
                'Authorization': 'Bearer ' + user.token,
                'Accept': 'application/json',
            }
        }

        return {};
    },
    getAxios() {
        return axiosConfigured
    }
}
