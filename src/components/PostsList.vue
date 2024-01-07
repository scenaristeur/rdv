<template>
    <div>
        {{ posts }}
    </div>
</template>

<script>
export default {
    name: "PostsList",
    computed: {

        posts() {
            return this.$store.state.core.posts
        },
    }
}
</script>

<style scoped></style>