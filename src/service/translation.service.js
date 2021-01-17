import Urls from '../urls'

export const translationService = {
    remove,
}

function remove (id) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .delete(Urls.get('translation', id))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
