import * as authApi from '@/api/auth'

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        isLoggedIn: false,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user
        },
        setLoggedIn(state, bool) {
            state.isLoggedIn = bool
        }
    },
    actions: {
        async login(context, {id, password}){
            try {
                const res = await authApi.login(id,password);
                if (res.status === 200) {
                    context.commit('setToken', res.data.token);
                    context.commit('setUser', res.data.user);
                    context.commit('setLoggedIn', true);

                    location.replace('/')
                }
            } catch (e) {
                console.log("로그인 에러 !")
            }
        },
        async logout(context){
            try {
                    context.commit('setToken', null);
                    context.commit('setUser', null);
                    context.commit('setLoggedIn', false);
                    
                    location.replace('/login')
            } catch (e) {
                console.log(e)
            }
        },
    }
}