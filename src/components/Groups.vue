<template>
    <div class="groups">
        <Group 
            v-for="(group, index) in groups"
            :key="index"
            v-bind:group="group"
        />
        <div class="item add" v-on:click="toggle"><span class="icon"></span></div>
        <div class="item account"></div>

        <div class="create-group">
            <div class="item add" v-on:click="toggle"><span class="icon"></span></div>
            <form class="search-form" autocomplete="off" v-on:submit="search">
                <input id="name" type="text" placeholder="Search...">
                <button type="submit" class="submit-search"></button>
            </form>
            <div class="heading">select user to add to a new group</div>
            <div class="users">
                <div class="usr">
                    <div class="imgg"></div>
                    <div class="name">yaroslav_els</div>
                </div>
                <div class="usr">
                    <div class="imgg"></div>
                    <div class="name">yaroslav_els</div>
                </div>
                <div class="usr">
                    <div class="imgg"></div>
                    <div class="name">yaroslav_els</div>
                </div>
                <div class="usr">
                    <div class="imgg"></div>
                    <div class="name">yaroslav_els</div>
                </div>
                <div class="usr">
                    <div class="imgg"></div>
                    <div class="name">yaroslav_els</div>
                </div>
                <div class="usr">
                    <div class="imgg"></div>
                    <div class="name">yaroslav_els</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Group from '@/components/Group';
import $ from '@/plugins/selector.js'

export default {
    data() {
        return {
            groups: []
        }
    },
    components: {
        Group
    },
    methods: {
        toggle: function (event) {
            $('.create-group').classList.toggle('inviz');
        },
        search: function (event) {
            event.preventDefault();

            $('.srch').style.display = 'flex';
            const name = event.target.elements.name.value;
            this.$store.state.socket.emit('findUsers', name, getCookie('user-id'));
        },
    }
}
</script>

<style scoped>
    .groups .create-group {
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 570px;
        height: fit-content;
        padding: 32px 24px;
        background: #191b20;
        border: 1px solid rgba(255, 255, 255, .25);
        border-radius: 25px;
    }
    .groups .create-group .item {
        position: absolute;
        left: 24px;
    }
    .groups .create-group form {
        margin-left: 94px;
    }
    .groups .create-group .heading {
        margin: 16px 8px 32px 102px;
    }
    .groups .create-group .item.add {
        transform: rotate(45deg)
    }
    .groups .create-group .users {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
        margin-left: 102px;
    }
    .groups .create-group .users .usr {
        display: flex;
        align-items: center;
    }
    .groups .create-group .users .usr .imgg {
        min-width: 50px;
        max-width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #fff;
        margin-right: 24px;
    }
    .groups .create-group .users .usr .name {
        font-size: 18px;
        line-height: 18px;
        color: #fff;
    }
</style>