import axios from 'axios'

const urls = {
    'login': 'login',
    'logout': 'logout',
    'lessons': 'lessons',
}

const axiosConfigured = axios.create({
    baseURL: 'api',
});

axiosConfigured.defaults.headers.common['Content-Type'] = 'application/json'
axiosConfigured.defaults.headers.common['Accept'] = 'application/json'


export default {
    get(urlName) {
        return urls[urlName]
    },
    getAxios() {
        const token = localStorage.getItem('token')

        if (token) {
            axiosConfigured.defaults.headers.common['Authorization'] = 'Bearer ' + token
        }

        return axiosConfigured
    }
}
