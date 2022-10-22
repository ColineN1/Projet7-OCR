<template>
<div class="container">
    <main>
      <CreatePost />
      <DisplayPost />
    </main>
  </div>
</template>

<script>
import DisplayPost from '../components/DisplayPost.vue'
import CreatePost from '@/components/CreatePost.vue';
export default {
  name: "HomePage",
  components: {
    DisplayPost,
    CreatePost
},
}
 
</script>

<style>
    .container{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>