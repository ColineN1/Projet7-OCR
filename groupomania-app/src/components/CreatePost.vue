
<template>
  <div class="createPost">
    <h2>Créer une publication</h2>
    <div class="createForm">
      <form id="data">
        <textarea wrap="soft" rows="5" maxlength="2000" name="description" v-model="description"
          placeholder="Aujourd'hui ... Ecrivez votre message ici (2000 caractères maximum) !"></textarea>
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
      }
      else 
      {
        this.$refs.file.value = null;
      }
    },
      /*envoyer le post au back */
      createPost() {
        if (!this.description || !this.file) {
          alert("Veuillez définir un texte et une image pour votre article");
        }
        else {
          const data = new FormData();
          data.append("date", this.date);
          data.append("description", this.description);
          data.append("image", this.file);

          this.$store.dispatch("post/createPost", data)
            .then(() => {
              this.description = ""
              this.date = new Date().toLocaleString()
              this.imageUrl = ""
              this.file = ""
              this.imagePreview = null
            })
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