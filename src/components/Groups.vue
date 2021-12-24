<template>
    <div class="groups">
        <Group 
            v-for="(group, index) in allGroups"
            :key="index"
            v-bind:group="group"
        />
        <div class="item add" v-on:click="toggle"><span class="icon"></span></div>
        <div class="item account"></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Group from '@/components/Group';
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['socket', 'user', 'allGroups']),
    components: {
        Group
    },
    methods: {
        ...mapMutations(['updateGroups', 'updateContacts']),
        toggle: function () {
            $('.create-group').classList.toggle('inviz');
        }
    }
}
</script>