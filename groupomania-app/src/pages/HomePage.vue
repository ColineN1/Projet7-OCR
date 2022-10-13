<template>
<div class="container">
    <HeaderComponent :isConnected="isConnected" />
    <main>
      <h1 > Bienvenue, {{ user.firstName }} {{ user.lastName}} !</h1>
      <DisplayPost />
    </main>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import DisplayPost from '../components/DisplayPost.vue'
export default {
  name: "HomePage",
  components: {
    HeaderComponent,
    DisplayPost,
  },
  mounted() {
    this.getUserInfo();
  },
  /**
   * @todo à faire sur le hook du routing (comme les middlewares)
   * @see https://router.vuejs.org/guide/advanced/navigation-guards.html
   */
  beforeUpdate() {
    if (localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      console.log("ok");
    }
  },

  data() {
    /**
     * @todo state du auth store
     */
    return {
      userId: localStorage.getItem('userId'),
      admin: localStorage.getItem('admin'),
      user: {},
      author: "",
      // ça peut être un getter du store qui fait une propriété calculé basé sur l'existence du token dans le state
      isConnected: true,
    }
  },
  methods:
  {
    /*récupérer les info de l'utilisateur connecté*/
    /**
     * @todo auth store
     */
    getUserInfo() {
      const url = "http://localhost:3000/groupomania/auth/user/" + this.userId;
      const options =
      {
        method: "GET",
        headers:
        {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      };
      fetch(url, options)
        .then(response => response.json())
        .then(userData => {
          this.user = userData;
          this.author = this.user.firstName + ' ' + this.user.lastName;
        })
        .catch(error => console.log(error));
    },
  },
};
</script>

<style>
    .container{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>