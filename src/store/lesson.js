import { lessonService } from '../service'

const state = {
    'lessons': [],
    'currentLesson': null,
}

const actions = {
    updateLessons({commit}) {
        lessonService.fetchAll()
            .then((lessons) => {
                commit('lessonsUpdated', lessons)
            })
            .catch(() => {
                commit('lessonsUpdateError')
            })
    },
    updateCurrentLesson({commit}, {id}) {
        lessonService.fetchOne(id)
            .then((lesson) => {
                commit('currentLessonUpdated', lesson)
            })
            .catch(() => {
                commit('currentLessonUpdateError')
            })
    }
}

const mutations = {
    lessonsUpdated(state, lessons) {
        state.lessons = lessons
    },
    lessonsUpdateError(state) {
        state.lessons = []
    },
    currentLessonUpdated(state, lesson) {
        state.currentLesson = lesson
    },
    currentLessonUpdateError(state) {
        state.lesson = null
    },
}

export const lesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
