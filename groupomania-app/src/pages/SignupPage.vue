<template>
    <div class="container">
        <HeaderComponent :isConnected="isConnected" />
        <main>
            <SignupForm />
        </main>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import SignupForm from '../components/SignupForm.vue'
export default
    {
        name: "SignUp",
        components:
        {
            HeaderComponent,
            SignupForm,
        },
        data() {
            return {
                isConnected: false,
            }
        },
    }
</script>

<style>

</style>