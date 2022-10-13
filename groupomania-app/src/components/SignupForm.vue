<template>
    <div class="connection">
        <h1>Créer un compte</h1>
        <form class="sign-in-form">
            <label>Prénom</label>
            <input type="text" name="firstName" v-model="firstName" required placeholder="Camille">
            <label>Nom</label>
            <input type="text" name="lastName" v-model="lastName" required placeholder="Martin">
            <label>Adresse e-mail</label>
            <input type="email" name="email" v-model="email" required placeholder="nom@groupomania.fr">
            <label>Mot de passe</label>
            <input type="password" name="password" v-model="password" required placeholder="****">
            <button type="button" @click="signup()">Inscription</button>
        </form>
        <p>Déjà membre ? <br/> <router-link to="/">Connectez-vous !</router-link>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'SignupForm',
        data() {
            return {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
            }
        },
        methods: {
             signup() {
                const userData =
                {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                }
                console.log(userData);
                /* TO DO : ajouter regex comme,t ? ici? utiliser fonction Validate + ajout des messages d'erreur dans le code template*/
                // let password = this.input.password;
                // let regex = /^[a-zA-Z\-'çñàéèêëïîôüù ]{2,}$/;
                // if (!regex.test(password)) {
                //    document.getElementById("passwordError").textContent = "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 2 chiffres et un caractère spécial";
                //    return false;
                // }
                const options =
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                };
                /**
                 * @todo auth store
                 */
                fetch("http://localhost:3000/groupomania/auth/signup", options)
                    .then(res => res.json())
                    .then (() =>{
                        console.log(userData);
                        alert("Veuillez vous connecter") 
                        this.$router.push('/');				
                    })
                .catch(error => console.log(error))
            }
        }
    }
    </script>
    