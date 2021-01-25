import Urls from '../urls'

export const bookLessonService = {
    add,
    fetchAll,
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

