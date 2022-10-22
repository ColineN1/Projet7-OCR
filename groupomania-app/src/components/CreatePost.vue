
<template>
  <div class="createPost">
    <h2>Créer une publication</h2>
    <div class="createForm">
      <form id="data">
        <textarea wrap="soft" rows="5" name="description" v-model="description"
          placeholder="Aujourd'hui ... Ecrivez votre message ici !"></textarea>
        <label for="file"><i class="fas fa-file-image"></i> Ajouter une image</label>
        <input type="file" class="image" ref="file" id="file" name="file" accept="image/*" @change="addImg()"/>
        <div v-if="imagePreview">
          <img :src=imagePreview />
        </div>
        <button type="button" @click="createPost()">Partager</button>
      </form>
    </div>
  </div>
</template>

<script>
export default
  {
    name: 'CreatePost',
    data() {
      return {
        description: "",
        date: new Date().toLocaleString(),
        imageUrl: "",
        file: "",
        imagePreview: null,
      }
    },
    methods:
    {
      /*récupérer l'image ajoutée au post */
      addImg()
    {
      this.file = this.$refs.file.files[0];
      if (this.file && this.file['type'].split('/')[0] === 'image') 
      {
        this.imagePreview = URL.createObjectURL(this.file);
        console.log(this.imagePreview);
      }
      else 
      {
        this.$refs.file.value = null;
      }
    },
      /*envoyer le post au back */
      createPost() {
        if (this.description === "" && this.file === "") {
          alert("Votre publication est vide");
        }
        else {
          const data = new FormData();
          JSON.stringify(data.append("date", this.date));
          JSON.stringify(data.append("description", this.description));
          data.append("image", this.file.name[0]);

          const options =
          {
            method: 'POST',
            body: data,
            headers:
            {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            }
          };
          fetch('http://localhost:3000/groupomania/posts', options)
            .then(res => res.json())
            .then(() => {
              alert("Votre message a été publié avec succès");
              document.location.reload();
            })
            .catch(error => console.log('error message: ', error))
        }
      },
    }
  }
</script>

<style>
#file{
  width: 60%;
}
</style>