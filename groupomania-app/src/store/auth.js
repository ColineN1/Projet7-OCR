import axios from 'axios';
import router from "../router/index";

export default {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem('token'),
        user: {},
    }),
    getters: { // Computed
        isLogged(state) {
            return !!state.token
        },
        getUserId(state) {
            if (state.user.email) {
                return state.user.userId
            }
            return false
        },
        isAdmin(state) {
            if (state.user.email && state.token && state.user.role) {
                return true
            }
            return false
        }
    },
    mutations: { // Dès que je souhaites modifier le state
        clearToken(state) {
            localStorage.clear();
            state.token = null
        },
        updateUser(state, user) {
            state.user = user
            localStorage.setItem("user", JSON.stringify(user))
          },
          updateToken(state, token) {
            state.token = token
            localStorage.setItem("token", token)
          },
    },
    actions: { // Tout ce qui est asynchrone
        signup({ commit }, data) {
            axios
                .post("http://localhost:3000/groupomania/auth/signup", data)
                .then((response) => {
                    commit('updateUser', response.data.user)
                    commit("updateToken", response.data.token)
                    router.push({ name: "HomePage" });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        login({ commit }, data) {
            axios
                .post("http://localhost:3000/groupomania/auth/login", data)
                .then((response) => {
                    commit('updateUser', response.data.user)
                    commit("updateToken", response.data.token)
                    router.push({ name: "HomePage" });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        logout({ commit }) {
            commit('clearToken');
            router.push('login');
        },
    }
}