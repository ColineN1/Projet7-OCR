<template>
  <router-view />
  <FooterComponent />
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {FooterComponent},
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
}
</style>