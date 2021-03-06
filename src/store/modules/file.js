import transformDate from '@/plugins/transformDate.js';
import getCookie from '@/plugins/getCookie.js';

export default {
    state: {
        files: []
    },
    getters: {
        allFiles(state) {
            return state.files;
        }
    },
    mutations: {
        updateFiles(state, data) {
            data.forEach((item) => {
                if (item.size > 1048576) {
                    item.size = `${(item.size / 1048576).toFixed(3)} MB`;
                } else {
                    item.size = `${(item.size / 1024).toFixed(3)} KB`
                }
                if (item.sender == getCookie('user-id')) {
                    item.direction = 'outgoing';
                }
                item.name = item.fileName.split('_')[1];
                item.time = transformDate(item.time);
            })
            state.files = data;
        },
        addFile(state, item) {
            if (item.sender == getCookie('user-id')) {
                item.direction = 'outgoing';
            }
            item.name = item.fileName.split('_')[1];
            state.files.push(item);
        }
    }  
}