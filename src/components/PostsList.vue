<template>
    <b-list-group>
        <b-list-group-item v-for="p in posts" :key="p.uuid" href="#" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ p.title }}</h5>
                <small>disparition : {{ new Date(p.end).toLocaleString() }}   <br>auteur: {{ p.author }}</small>
            </div>

            <p class="mb-1">
                {{ p.content }}</p>

            <small>{{ p.tags }}
             
            </small>
        </b-list-group-item>

    </b-list-group>
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