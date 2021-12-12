<template>
    <div class="groups">
        <Group 
            v-for="(group, index) in groups"
            :key="index"
            v-bind:group="group"
        />
        <div class="item add"><span class="icon"></span></div>
        <div class="item account"></div>
    </div>
</template>

<script>
import Group from '@/components/Group';

export default {
    data() {
        return {
            groups: []
        }
    },
    components: {
        Group
    }
}
</script>
