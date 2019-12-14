import { lessonService } from '../service'

const state = {
    'lessons': [],
}

const actions = {
    getLessons({commit}) {
        lessonService.fetchAll()
            .then((lessons) => {
                commit('lessonsFetched', lessons)
            })
            .catch(() => {
                commit('lessonsFetchError')
            })
    },
}

const mutations = {
    lessonsFetched(state, lessons) {
        state.lessons = lessons
    },
    lessonsFetchError(state) {
        state.lessons = []
    },
}

export const lesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
