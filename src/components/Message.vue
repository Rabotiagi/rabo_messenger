<template>
    <div class='item mess'>
        <div class='image'></div>
        <div class='message'>
            <div class='name-time'>
                <div class='mess-name'>{{message.sender}}</div>
                <div class='time'>{{message.time}}</div>
            </div>
            <div class='text'>{{message.message}}</div>
        </div>
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