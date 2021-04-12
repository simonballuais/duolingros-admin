import { lessonService } from '../service'
import { propositionService } from '../service'
import { questionService } from '../service'
import { translationService } from '../service'
import { bookLessonService } from '../service'
import Memento from '../misc/memento'

const state = {
    'bookLessons': [],
    'lessons': [],
    'currentLesson': null,
    'status': {
        savingLesson: false,
    },
    'lessonMemento': Memento(),
    'lessonUndoable': false,
    addingProposition: false,
    propositionSaved: false,
    propositionSaveError: false,
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
    deleteLesson({commit, dispatch}, {id}) {
        commit('savingLesson')

        lessonService.remove({id})
            .then(() => {
                dispatch('loadAllBookLessons')
            })
            .catch(() => null)
    },
    undoCurrentLesson({commit, dispatch, state}) {
        commit('currentLessonUndone')
        state.lessonMemento.undo()
        dispatch('saveCurrentLesson')
    },
    saveCurrentLesson({commit, dispatch}) {
        commit('savingLesson')

        lessonService.save(state.currentLesson)
            .then(() => {
                commit('lessonSaved')
                dispatch('updateCurrentLesson', {id: state.currentLesson.id})
            })
            .catch(() => commit('lessonSaveError'))
    },
    saveProposition({commit, dispatch, state}, {proposition}) {
        commit('addingProposition')

        propositionService.add(proposition)
            .then(() => {
                commit('propositionSaved')
                dispatch('updateCurrentLesson', {id: state.currentLesson.id})
            })
            .catch(() => commit('propositionSaveError'))
    },
    savePropositionButDontUpdate({commit}, {proposition}) {
        commit('addingProposition')

        return new Promise((resolve, reject) =>
            propositionService.add(proposition)
            .then(() => {
                commit('propositionSaved')
                resolve()
            })
            .catch(() => {
                commit('propositionSaveError')
                reject()
            })
        )
    },
    deleteProposition({dispatch, state}, {id}) {
        propositionService.remove({id})
            .then(() => {
                dispatch('updateCurrentLesson', {id: state.currentLesson.id})
            })
            .catch(() => null)
    },
    saveQuestion({dispatch, state}, {question}) {
        return new Promise((resolve, reject) =>
            questionService.add(question)
                .then((newQuestion) => {
                    dispatch('updateCurrentLesson', {id: state.currentLesson.id})
                    resolve(newQuestion)
                })
                .catch(reject)
        )
    },
    saveQuestionButDontUpdate({state}, {question}) {
        state

        return new Promise((resolve, reject) =>
            questionService.add(question)
                .then((questionId) => resolve(questionId))
                .catch(reject)
        )
    },
    deleteQuestion({dispatch, state}, {id}) {
        questionService.remove({id})
            .then(() => {
                dispatch('updateCurrentLesson', {id: state.currentLesson.id})
            })
            .catch(() => null)
    },
    deleteQuestionButDontUpdate({state}, {id}) {
        state

        return new Promise((resolve, reject) =>
            questionService.remove({id})
                .then(resolve)
                .catch(reject)
        )
    },
    saveTranslation({dispatch, state}, {translation}) {
        translationService.add(translation)
            .then(() => {
                dispatch('updateCurrentLesson', {id: state.currentLesson.id})
            })
            .catch(() => null)
    },
    saveTranslationButDontUpdate({state}, {translation}) {
        state

        return new Promise((resolve, reject) =>
            translationService.add(translation)
                .then(resolve)
                .catch(reject)
        )
    },
    deleteTranslation({dispatch, state}, {id}) {
        translationService.remove({id})
            .then(() => {
                dispatch('updateCurrentLesson', {id: state.currentLesson.id})
            })
            .catch(() => null)
    },
    deleteTranslationButDontUpdate({state}, {id}) {
        state

        return new Promise((resolve, reject) =>
            translationService.remove({id})
                .then(resolve)
                .catch(reject)
        )
    },
    loadAllBookLessons({commit}) {
        bookLessonService.fetchAll()
            .then((bookLessons) => {
                commit('bookLessonsUpdated', bookLessons)
            })
            .catch(() => {
                commit('bookLessonsUpdateError')
            })
    },
    saveBookLesson({dispatch}, {bookLesson}) {
        bookLessonService.add(bookLesson)
            .then(() => {
                dispatch('loadAllBookLessons')
            })
            .catch(() => null)
    },
    patchBookLesson({commit}, {id, data}) {
        commit('savingLesson')

        bookLessonService.patch(id, data)
            .then((bookLessons) => {
                commit('lessonSaved', bookLessons)
            })
            .catch(() => null)
    },
    deleteBookLesson({commit}, {id}) {
        commit('savingLesson')

        bookLessonService.remove({id})
            .then(() => {
                commit('removeLocalBookLesson', id)
            })
            .catch(() => null)
    },
    saveLesson({dispatch}, {lesson}) {
        lessonService.add(lesson)
            .then(() => {
                dispatch('loadAllBookLessons')
            })
            .catch(() => null)
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
        state.lessonMemento.reset(lesson)
    },
    currentLessonUndone(state) {
        const previousLessonState = state.lessonMemento.undo()

        if (!previousLessonState) {
            return
        }

        state.currentLesson = previousLessonState
        state.lessonUndoable = state.lessonMemento.undoable()
    },
    currentLessonUpdateError(state) {
        state.currentLesson = null
    },
    savingLesson(state) {
        state.status.savingLesson = true
        state.lessonMemento.addState(state.currentLesson)
        state.lessonUndoable = state.lessonMemento.undoable()
    },
    lessonSaved(state) {
        state.status.savingLesson = false
    },
    lessonSaveError(state) {
        state.status.savingLesson = false
    },
    addingProposition(state) {
        state.addingProposition = true
        state.propositionSaved = false
        state.propositionSaveError = false
    },
    propositionSaved(state) {
        state.addingProposition = false
        state.propositionSaved = true
        state.propositionSaveError = false
    },
    propositionSaveError(state) {
        state.addingProposition = false
        state.propositionSaved = false
        state.propositionSaveError = true
    },
    bookLessonsUpdated(state, bookLessons) {
        state.bookLessons = bookLessons
    },
    bookLessonsUpdateError(state) {
        state.bookLessons = []
    },
    removeLocalBookLesson(state, id) {
        state.bookLessons = state.bookLessons.filter(e => e.id !== id)
    }
}

export const lesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
