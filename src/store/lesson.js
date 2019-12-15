import { lessonService } from '../service'

const state = {
    'lessons': [],
    'currentLesson': null,
    'status': {},
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
        lessonService.fetchById(id)
            .then((lesson) => {
                commit('currentLessonUpdated', lesson)
            })
            .catch(() => {
                commit('currentLessonUpdateError')
            })
    },
    saveLesson({commit}, {lesson}) {
        commit('savingLesson')

        lessonService.save(lesson)
            .then(() => commit('lessonSaved'))
            .catch(() => commit('lessonSaveError'))
    },
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
    savingLesson(state) {
        state.status = { savingLesson: true }
    },
    lessonSaved(state) {
        state.status = { savingLesson: false }
    },
    lessonSaveError(state) {
        state.status = { savingLesson: false }
    },
}

export const lesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
