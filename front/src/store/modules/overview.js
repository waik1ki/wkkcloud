import * as overviewApi from '@/api/overview'

export default {
    namespaced: true,
    state: {
        overview: null,
        totalSize: null,
    },
    mutations: {
        setOverview(state, data){
            state.overview = data
        },
        setTotalSize(state, data){
            state.totalSize = data
        },
    },
    actions: {
        async getOverview(context) {
            try {
                const res = await overviewApi.getOverview()
                if (res.status === 200) {
                    context.commit('setOverview', res.data.overview)
                    
                    var total = 0

                    for (var i = 0; i < res.data.overview.length; i++) {
                        total = total + res.data.overview[i].size
                        console.log(res.data.overview[i].size)
                    }
                    
                    context.commit('setTotalSize', total)

                }
            } catch (e) {
                alert('get summary error')
            }
        },
    },
}