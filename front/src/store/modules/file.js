import * as fileApi from '@/api/file'
import bus from  '../../utils/bus'

export default {
    namespaced: true,
    state: {
        files: null,
        // selectedBlobs: null,
    },
    mutations: {
        setFiles(state, files) {
            state.files = files
        },
        // setSelectedBlobs(state, blobs) {
        //     state.selectedBlobs = blobs
        // },
    },
    actions: {
        async getFileByContainer(context, {containerId}) {
            try {
                const res = await fileApi.getFileByContainer(containerId)
                if (res.status === 200) {
                    context.commit('setFiles', res.data.files)
                }
            } catch (e) {
                alert('get files error')
            } finally {
                bus.$emit('end:spinner');
            }
        },
        async getRecentUploadFiles(context) {
            try {
                const res = await fileApi.getRecentUploadFiles()
                if (res.status === 200) {
                    context.commit('setFiles', res.data.files)
                }
            } catch (e) {
                alert('get files error')
            }
        },
        async uploadFile(context, {data, containerId}) {
            try {
                const res = await fileApi.uploadFile(data)
                if (res.status === 200) {
                    const res = await fileApi.getFileByContainer(containerId)
                    if (res.status === 200) {
                        context.commit('setFiles', res.data.files)
                    }
                }
            } catch (e) {
                alert('upload file error')
            } finally {
                bus.$emit('end:spinner');
            }
        },
        async deleteFile(context, {containerId, file}) {
            try {
                const res = await fileApi.deleteFile(containerId, file)
                if (res.status === 200) {
                    const res = await fileApi.getFileByContainer(containerId)
                    if (res.status === 200) {
                        context.commit('setFiles', res.data.files)
                    }
                }
            } catch (e) {
                alert('delete file error')
            } finally {
                bus.$emit('end:spinner');
            }
        },

        // async setSelectedBlobs(context, {files}) {
        //     try {
        //         context.commit('setSelectedBlobs', files)
        //     } catch (e) {
        //         alert('set seleted blobs error')
        //     }
        // },
        // async downloadBlob(context, {container, file}) {
        //     try {
        //         const res = await blobApi.downloadBlob(container, file)
        //         if (res.status === 200) {
        //             console.log(res.data.status)
        //         }
        //     } catch (e) {
        //         alert('download blob error')
        //     }
        // },
        // async downloadRecentBlob(context, {file}) {
        //     try {
        //         const res = await blobApi.downloadRecentBlob("", file)
        //         if (res.status === 200) {
        //             console.log(res.data.status)
        //         }
        //     } catch (e) {
        //         alert('download blob error')
        //     }
        // },
    },
}