<template>
    <div class="container">
        <div class="login">
            <h1>Se connecter</h1>
            <form class="sign-in-form">
                <label>Adresse e-mail</label>
                <input type="email" name="email" v-model="email" required placeholder="nom@groupomania.fr">
                <label>Mot de passe</label>
                <input type="password" name="password" v-model="password" required placeholder="****">
                <button type="button" @click="login()">Connexion</button>
            </form>
            <p>Pas encore membre ?<br />
                <router-link to="/signup">Créez un compte !</router-link>
            </p>
        </div> 
    </div>
</template>

<script>
export default {
  name: "LoginPage",
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
                 const data =
                 {
                     email: this.email,
                     password: this.password
                 }
                 this.$store.dispatch("auth/login", data)
             }
        }
};
</script> 
    
<style >
label {
    padding: 12px 0px 12px 20px;
    display: inline-block;
}
a{
    font-weight: bold;
    text-decoration: none;
    color: #4E5166;
    cursor: pointer;
}

.login,
.register {
   margin : 5%;
   width: 80%;
}
form {
    width:90%;
    padding: 20px;
    border: 1px solid #f1f1f1;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    display: flex;
    position: center;
    display: inline-block;
}

button {
  background-color: #4E5166;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
  width: 100%;
  margin: 20px 0;
}

button:hover {
    background-color: #FFD7D7;
    color: black;
}

input {
    margin: 5px;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
    padding: 10px;
    border-radius: 30px;
    width: 23%;
}

#error {
    color: red;
}

@media (max-width: 800px) {
    form {
    display: flex;
    flex-direction: column;
}
label {
    padding: 20px 50px 0px 12px;
    display: inline-block;
}
.login,
.register {
   margin : 5%;
   width: 80%;
}
input {
    width: 80%;
}
}
</style>