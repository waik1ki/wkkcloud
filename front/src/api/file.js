import http from './http';

export function getFileByContainer(id) {
    return http.post('/file/get/files', {
        id
    })
}
export function getRecentUploadFiles() {
    return http.get('/file/get/recent')
}

export function uploadFile(data) {
    return http.post('/file/upload', data , { headers: { 'Content-Type': 'multipart/form-data' } })
}

export function deleteFile(containerId, file) {
    return http.post('/file/delete', {
        containerId,
        file
    })
}

// 사용 안함
export function downloadFile(container, file) {
    return http.post('/file/download', {
        container,
        file
    })
}
export function downloadRecentFile(container, file) {
    return http.post('/file/download/recent', {
        container,
        file
    })
}