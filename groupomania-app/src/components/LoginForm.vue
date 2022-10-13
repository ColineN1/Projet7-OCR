<template>
    <div class="connection">
        <h1>Se connecter</h1>
        <form class="sign-in-form">
            <label>Adresse e-mail</label>
            <input type="email" name="email" v-model="email" required placeholder="nom@groupomania.fr">
            <label>Mot de passe</label>
            <input type="password" name="password" v-model="password" required placeholder="****">
            <button type="button" @click="login()">Connexion</button>
        </form>
        <p>Pas encore membre ?<br/> <router-link to="/signup">Créez un compte !</router-link>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'LoginForm',
        data() {
            return {
                email: "",
                password: "",
            }
        },
        methods:
        {
            login() 
            {
                const user =
                {
                    email: this.email,
                    password: this.password
                }
                const options =
                {
                    method: 'POST',
                    body: JSON.stringify(user),                    
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                };
                /**
                 * @todo .env pour la base url http://localhost:3000/groupomania
                 * @todo action du auth store
                 */
                fetch('http://localhost:3000/groupomania/auth/login', options)
                    .then(res => res.json())
                    .then(data => 
                    {
                        if (data.userId && data.token) 
                        {
                            const { token, userId, admin } = data

                            /**
                             * @todo JSON.stringify d'un objet authUser
                             * @todo faire ça dans auth store
                             */
                             // LoginForm -> mutation -> authStore -> met à jour le localstorage
                             // Arrive sur l'app -> authStore -> récupérer le localstorage (peut-être qu'il n'y a rien dedans)
                            localStorage.setItem("token", token);
                            localStorage.setItem("userId", (userId));
                            localStorage.setItem("admin", JSON.stringify(admin));
                            this.$router.push('/HomePage');
                        }
                        else 
                        {
                            alert("Identifiants incorrects");
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
    }
    </script>