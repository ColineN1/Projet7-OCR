<template>
    <div class="container">
        <HeaderComponent :isConnected="isConnected" />
        <main>
            <LoginForm />
        </main>
    </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import LoginForm from '../components/LoginForm.vue'
export default
    {
        name: "SignIn",
        components:
        {
            HeaderComponent,
            LoginForm
        },
        data() {
            return {
                isConnected: false,
            }
        }
    }
</script> 
    
<style>
</style>