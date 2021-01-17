import Urls from '../urls'

export const propositionService = {
    add,
}

function add (proposition) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('propositions'),
                JSON.stringify(proposition)
            )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
