import Urls from '../urls'

export const questionService = {
    add,
}

function add (question) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('questions'),
                JSON.stringify(question)
            )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
