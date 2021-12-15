<template>
    <div>
        <div class='item mess' v-bind:class="message.direction">
            <div class='image'></div>
            <div class='message'>
                <div class='name-time'>
                    <div class='mess-name'>{{message.firstName}}</div>
                    <div class='time'>{{message.time}}</div>
                </div>
                <div class='text'>{{message.message}}</div>
            </div>
        </div>
        <div class="line" v-if="message.date">{{message.date}}</div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    .line {display:block;margin-bottom:32px;width:100%;height:1px;background: rgba(255, 255, 255, .1);border-radius:10px;font-weight: 400;font-size: 12px;color:rgba(255, 255, 255, .25);}
</style>