import Urls from '../urls'

export const lessonService = {
    fetchAll,
}

function fetchAll() {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('lessons'))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
