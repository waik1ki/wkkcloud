import http from './http';

export function login(id, password) {
    return http.post('/user/login', {
        id,
        password
    });
}