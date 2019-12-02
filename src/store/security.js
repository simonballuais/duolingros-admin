import { userService } from '../service'

const user = JSON.parse(localStorage.getItem('user'));
const state = {
    'status': {
        loggedIn: !!user,
        invalidCredentials: false,
    },
    'user': user,
    'token': null,
}

const actions = {
    login({commit}, {username, password}) {
        commit('loginRequest');

        userService.login(username, password)
            .then(
                (user, token) => {
                    commit('loginSuccess', user, token)
                }
            ).catch(
                () => {
                    commit('loginFailure')
                }
            )
    },
    logout({commit}) {
        userService.logout()
        commit('logout')
    }
}

const mutations = {
    loginRequest(state) {
        state.status.logginIn = true
        state.status.invalidCredentials = false
        state.user = null
    },
    loginSuccess(state, user, token) {
        state.status.loggedIn = true
        state.status.invalidCredentials = false
        state.user = user
        state.token = token
    },
    loginFailure(state) {
        state.status.invalidCredentials = true
        state.user = null
    },
    logout(state) {
        state.status = {}
        state.user = null
    },
}

export const security = {
    namespaced: true,
    state,
    actions,
    mutations,
}
