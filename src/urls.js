import axios from 'axios'

const urls = {
    'login': 'login',
    'logout': 'logout',
    'lessons': 'lessons',
    'lesson': 'lessons/{id}',
}

const axiosConfigured = axios.create({
    baseURL: 'api',
});

axiosConfigured.defaults.headers.common['Content-Type'] = 'application/json'
axiosConfigured.defaults.headers.common['Accept'] = 'application/json'
axiosConfigured.defaults.headers.put['Content-Type'] = 'application/json'


export default {
    get(urlName, routeArguments) {
        let url = urls[urlName]

        if (! routeArguments) {
            return url
        }

        Object.keys(routeArguments).forEach(argName => {
            const argValue = routeArguments[argName]

            url = url.replace('{' + argName + '}', argValue)
        });

        return url
    },
    getAxios() {
        const token = localStorage.getItem('token')

        if (token) {
            axiosConfigured.defaults.headers.common['Authorization'] = 'Bearer ' + token
        }

        return axiosConfigured
    }
}
