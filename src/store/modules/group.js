export default {
    state: {
        groups: []
    },
    getters: {
        allGroups(state) {
            return state.groups;
        }
    },
    mutations: {
        updateGroups(state, data) {
            const newArr = [];
            data.forEach(item => {
                if (Array.isArray(item.id)) {
                    newArr.push(item);
                }
            });
            state.groups = newArr;
        },
        addGroup(state, data) {
            state.groups.push(data);
        }
    }
}