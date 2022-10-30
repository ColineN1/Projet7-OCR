<template>
    <div class="container">
        <div class="edit_post">
            <p>Modifier le contenu</p>
            <form name="editPost" id="editPost">
                <textarea wrap="soft" rows="5" maxlength="2000" name="description" v-model="description"></textarea>
                <div class="post__image" v-if="imageUrl">
                    <img :src="imageUrl">
                </div>
                <label for="file"><i class="fas fa-file-image"></i> Modifier l'image </label>
                <input type="file" class="image" ref="file" id="file" name="file" accept="image/*" @change="addImg()" />
                <div v-if="imagePreview">
                    <img :src=imagePreview />
                </div>
                <button type="button" @click="editPost()">Modifier</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditPage",
    components: {

    },
    data() {
        return {
            postId: this.$route.params.id,
            description: "",
            date: "",
            imageUrl: "",
            file: "",
            newImage: "",
            newContent: "",
            imagePreview: null,
        }
    },
    created() {
        this.getOnePost(this.postId);
        console.log("ok");
    },
    beforeUpdate() {
        if (localStorage.getItem("token") == null) {
            this.$router.push("/");
        } else {
            console.log("ok");
        }
    },
    methods:
    {
        /* get a post using its ID*/
        getOnePost(id) {
            const url = `http://localhost:3000/groupomania/post/${id}`;
            const options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            fetch(url, options)
                .then(res => res.json())
                .then(singlePostData => {
                    this.date = singlePostData.date;
                    this.description = singlePostData.description;
                    this.imagePreview = singlePostData.imageUrl;
                    this.file = singlePostData.imageUrl;
                })
                .catch(error => console.log(error));
        },
        /* add file to post */
        addImg() {
            this.file = this.$refs.file.files[0];
            if (this.file && this.file['type'].split('/')[0] === 'image') {
                this.imagePreview = URL.createObjectURL(this.file);
                console.log(this.imagePreview);
            }
            else {
                this.$refs.file.value = null;
            }
        },
        /* edit a post*/
        editPost() {
            if (!this.description || !this.file) {
                alert("Veuillez définir un texte et une image pour votre article");
                console.log("ok", this.description, this.file);
            }
            else {
                const newPost = new FormData();
                newPost.append("description", this.description);
                newPost.append("image", this.file);
                const options =
                {
                    method: 'PUT',
                    body: newPost,
                    headers:
                    {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                };
                console.log("ok", this.description, this.file);
                console.log(newPost);
                console.log(this.postId);
                fetch(`http://localhost:3000/groupomania/post/${this.postId}`, options)
                    .then(res => {
                        res.json();
                        if (res.status === 200) {
                            alert("Publication modifiée !");
                            this.$router.push('/');
                        }
                        else {
                            alert("Vous n'avez pas les droits pour modifier cette publication.");
                            this.$router.push('/');
                        }
					})
                    .catch(error => console.log('error message: ', error))
            }
        }
    }
}
</script>