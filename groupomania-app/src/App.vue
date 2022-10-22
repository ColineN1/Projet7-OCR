<template>
  <div id="app">
    <NavBar />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: { FooterComponent, NavBar },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
}
</style>