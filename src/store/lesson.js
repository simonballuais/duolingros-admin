import { lessonService } from '../service'
import Memento from '../misc/memento'

const state = {
    'lessons': [],
    'currentLesson': null,
    'status': {
        savingLesson: false,
    },
    'lessonMemento': Memento(),
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
        commit('updatingCurrentLesson');

        lessonService.fetchById(id)
            .then((lesson) => {
                commit('currentLessonUpdated', lesson)
            })
            .catch(() => {
                commit('currentLessonUpdateError')
            })
    },
    undoCurrentLesson({commit}) {
        commit('currentLessonUndone')
    },
    saveCurrentLesson({commit}) {
        commit('savingLesson')

        lessonService.save(state.currentLesson)
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
    updatingCurrentLesson(state) {
        state.currentLesson = null
    },
    currentLessonUpdated(state, lesson) {
        state.currentLesson = lesson
        state.lessonMemento.reset(lesson)
    },
    currentLessonUndone(state) {
        const previousLessonState = state.lessonMemento.undo()

        if (!previousLessonState) {
            return
        }

        state.currentLesson = previousLessonState
    },
    currentLessonUpdateError(state) {
        state.currentLesson = null
    },
    savingLesson(state) {
        state.status.savingLesson = true
        state.lessonMemento.addState(state.currentLesson)
    },
    lessonSaved(state) {
        state.status.savingLesson = false
    },
    lessonSaveError(state) {
        state.status.savingLesson = false
    },
}

export const lesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
