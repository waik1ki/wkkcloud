export default {
    namespaced: true,
    state: {
        validations: null
    },
    mutations:{
        setValidationError(state, error) {
            state.validations = error;
        }
    }
}