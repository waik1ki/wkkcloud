import http from './http';

export function getContainers() {
    return http.get('/container/get')
}
export function createContainer(name) {
    return http.post('/container/create', {
        name
    })
}
export function deleteContainer(id) {
    return http.post('/container/delete', {
        id
    })
}