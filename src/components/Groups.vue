<template>
    <div class="groups">
        <Group 
            v-for="(group, index) in allGroups"
            :key="index"
            v-bind:group="group"
        />
        <div class="item add" v-on:click="showForm"><span class="icon"></span></div>
        <div class="item account"></div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Group from '@/components/Group';
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['allGroups']),
    components: {
        Group
    },
    methods: {
        showForm: function () {
            $('.create-group').classList.remove('disabled');
        }
    }
}
</script>