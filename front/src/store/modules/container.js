import * as containerApi from '@/api/container'
import bus from '../../utils/bus'

export default {
    namespaced: true,
    state: {
        containers: null,
        path: '자료구조',
        id: null,
    },
    mutations: {
        setContainers(state, containers) {
            state.containers = containers;
        },
        setContainerPath(state, path) {
            state.path = path;
        },
        setContainerId(state, id) {
            state.id = id;
        }
    },
    actions: {
        async getContainers(context) {
            try {
                const res = await containerApi.getContainers();
                if (res.status === 200) {
                    context.commit('setContainers', res.data.containers);
                }
            } catch (e) {
                alert('get container list error');
            }
        },
        async setContainerPath(context, {path}) {
            try {
                context.commit('setContainerPath', path);
            } catch (e) {
                alert('set container path error');
            }
        },
        async setContainerId(context, {id}) {
            try {
                context.commit('setContainerId', id);
            } catch (e) {
                alert('set container id error');
            }
        },

        async createContainer(context, {containerName}) {
            try {
                const res = await containerApi.createContainer(containerName);
                if (res.status === 200) {
                    const res = await containerApi.getContainers();
                    if (res.status === 200) {
                        context.commit('setContainers', res.data.containers);
                    }
                }
            } catch (e) {
                alert('create container error');
            } finally {
                bus.$emit('end:spinner');
            }
        },
        async deleteContainer(context, {containerId}) {
            try {
                const res = await containerApi.deleteContainer(containerId);
                if (res.status === 200) {
                    const res = await containerApi.getContainers();
                    if (res.status === 200) {
                        context.commit('setContainers', res.data.containers);
                    }
                }
            } catch (e) {
                alert('delete container error');
            } finally {
                bus.$emit('end:spinner');
            }
        }
    },
}