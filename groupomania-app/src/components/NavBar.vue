<template>
  <div id="nav">
    <router-link to="/"><img class="imgLogo" src="../assets/logo.png" alt="Groupomania logo" /></router-link>
    <span v-if="isLogged">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link to="/signup">SignUp</router-link> |
      <router-link to="/login">Login</router-link>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "NavBar",
  computed: {
    ...mapGetters('auth', [
      'isLogged'
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ])
  },
};
</script>
  
<style>
#nav {
  display: flex;
  justify-content: center;
  align-items: center;
  Height: 100px;
}

span {
  justify-content: flex-end;
}

img {
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 300px;
}
</style>