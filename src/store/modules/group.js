export default {
    state: {
        groups: [],
        chosenUsers: []
    },
    getters: {
        allGroups(state) {
            return state.groups;
        },
        chosenUsers(state) {
            return state.chosenUsers;
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
        },
        updateChosenUsers(state, data) {
            state.chosenUsers = data;
        },
        chooseUser(state, data) {
            const match = state.chosenUsers.find(item => item == data);
            if (match) {
                state.chosenUsers.splice(state.chosenUsers.indexOf(match), 1);
                return;
            }
            state.chosenUsers.push(data);
        }
    }
}