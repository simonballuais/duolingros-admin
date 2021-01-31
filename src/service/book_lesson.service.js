import Urls from '../urls'

export const bookLessonService = {
    add,
    fetchAll,
    patch,
}

function add (bookLesson) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('book_lessons'),
                JSON.stringify(bookLesson)
            )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function patch (id, data) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .put(
                Urls.get('book_lesson', {id}),
                JSON.stringify(data)
            )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function fetchAll () {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('book_lessons'))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

