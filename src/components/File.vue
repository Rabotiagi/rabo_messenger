<template>
    <div class="item file">
        <div class="icon"></div>
        <div class="name">{{file.name}}</div>
        <div class="size">{{file.size}}</div>
        <div class="date">{{file.date}}</div>
    </div>
</template>

<script>
export default {
    props: {
        file: {
            type: Object,
            required: true
        }
    }
}
</script>