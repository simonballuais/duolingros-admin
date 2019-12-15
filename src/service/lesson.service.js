import Urls from '../urls'

export const lessonService = {
    fetchAll,
    fetchOne,
}

function fetchAll () {
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

function fetchOne (id) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('lesson', {id}))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
