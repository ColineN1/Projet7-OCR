<template>
    <div class="container">
        <div class="register">
            <div class="connection">
                <h1>Créer un compte</h1>
                <form class="sign-in-form">
                    <div class="form-group">
                        <label>Prénom</label>
                        <input type="text" name="firstName" v-model="firstName" required placeholder="Camille">
                        <label>Nom</label>
                        <input type="text" name="lastName" v-model="lastName" required placeholder="Martin">
                    </div>
                    <div class="form-group">
                        <label>Adresse e-mail</label>
                        <input type="email" name="email" v-model="email" required placeholder="nom@groupomania.com" @change="checkEmail()">
                        <label>Mot de passe</label>
                        <input type="password" name="password" v-model="password" required placeholder="****">
                    </div>
                    <button type="button" @click="signup()">Inscription</button>
                </form>
                <p>Déjà membre ? <br />
                    <router-link to="/">Connectez-vous !</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SignUp",
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    },
    methods: {
        checkEmail() {
            if (/^[A-Za-z0-9._%+-]+@groupomania\.com$/.test(this.email)) {
                return
            } else {
                alert("Email invalide! Vous devez faire partie de la société Groupomania pour vous connectez avec votre adresse mail professionnelle."); 
                this.email= "";
            }
        },
        signup() {
            const data =
            {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                admin: false,
            }
            this.$store.dispatch("auth/signup", data)
        }
    },
}
</script>

<style>
/* Style traité dans LoginPage.vue */
</style>