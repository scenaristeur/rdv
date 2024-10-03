<template>
    <!-- style="max-width: 20rem;" 
        img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
-->
<div>
    <b-card
    title="Posts"
    tag="article"
      class="mb-2"
  >
    <b-card-text>
      Do you think something ? Post it !
      <br>
      Disparition dans une semaine
      <div>
      
        <b-form-input v-model="title" placeholder="Titre"></b-form-input>
        <!-- <div class="mt-2">Value: {{ titre }}</div> -->
        <b-form-textarea id="textarea" v-model="content" placeholder="Dites quelque chose..." rows="3"
            max-rows="6"></b-form-textarea>
            <b-form-input v-model="tags" placeholder="tags comma separated"></b-form-input>
        <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->

    </div>
    </b-card-text>

    <b-button href="#" variant="primary" @click="sendPost">Envoyer</b-button>
  </b-card>

<PostsList />
</div>



</template>

<script>
import PostsList from '@/components/PostsList.vue'


export default {
    name: "PostView"    ,
    components: {
        PostsList
    },
    data: function () {
        return {
            title: '',
            content: '',
            tags: ''
        }
    },
    methods: {
        sendPost: function () {
            let date = new Date();
            let end = date.setDate(date.getDate() + 7);
            let post = {
                title: this.title,  
                content: this.content, 
                tags: this.tags,
                end: end
            }
            this.$store.dispatch('core/updateYstorePosts', post)
            this.title = ''
            this.content = ''
            this.tags = ''
        }
    }
}
</script>

<style scoped></style>