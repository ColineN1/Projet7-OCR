<template>
    <header>
        <a class="link" href="toHomePage()">
            <img class="imgLogo" src="../assets/logo.png" alt="Groupomania logo"/>
        </a>
        <nav v-if="isConnected">
            <ul> 
                <li @click="logout()"><i class="fas fa-power-off"></i> Déconnexion</li>  
            </ul>
        </nav>
        <nav v-if="!isConnected">
            <ul >
                <li><router-link to="/signup">Créer un compte</router-link></li>
                <li><router-link to="/">Se connecter</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/');
            console.log("déconnexion");
        },
        toHomePage() {
            this.$router.push({ path: "/" });
        }
    },
    props: ["isConnected"],
};
</script>

<style>
header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 80px;
    width: 100%;
}
.link{
    display: flex;
    justify-content: center;
    height: 80px;
}
nav{
    right: 20px;
}
img {
    
    overflow: hidden;
    position: relative;
    width:300px; 
    margin: 0 -100px;
    object-fit: cover;
}
</style>