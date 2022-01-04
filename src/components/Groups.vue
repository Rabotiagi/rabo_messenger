<template>
    <div class="groups">
        <Group 
            v-for="(group, index) in allGroups"
            :key="index+300"
            v-bind:group="group"
        />
        <div class="item add" v-on:click="showForm"><span class="icon"></span></div>
        <div class="item account"></div>

        <form class="image-form" v-on:submit="uppload">
            <input type="file" name="photo" class="photo-file" required>
            <button type="submit">submit</button>
        </form>

        <button v-on:click="ev1">1</button>
        <button v-on:click="ev2">2</button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Group from '@/components/Group';
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['socket', 'user', 'chat', 'allGroups']),
    components: {
        Group
    },
    methods: {
        showForm: function () {
            $('.create-group').classList.remove('disabled');
        },
        uppload: async function(event) {
            event.preventDefault();

            const file = $('.photo-file').files[0];

            if (file.name.indexOf('_') > -1) {
                alert('file name should not contain "_"');
                return;
            }
            if (file.size > 157286400) {
                alert('max allowed file size is 150 MB');
                return;
            }

            const data = new FormData();
            data.append('file', file);
            data.append('user', this.user);

            fetch('/photo', {
                method: 'POST',
                body: data
            }).then(res => {
                console.log(res);
            });
        },
        ev1: function() {
          document.cookie = "user-id=1";
          this.setUser();
        },
        ev2: function() {
          document.cookie = "user-id=2";
          this.setUser();
        }
    }
}
</script>
