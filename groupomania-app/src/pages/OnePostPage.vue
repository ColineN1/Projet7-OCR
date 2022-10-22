<template>
    <div class="container">
        <div class="edit_post">
            <p>Modifier le contenu</p>
            <form name="editPost" id="editPost">
                <textarea type="text" aria-label="contenu" v-model="description"></textarea>
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
            userId: localStorage.getItem('userId'),
            admin: localStorage.getItem('admin'),
            newImage: "",
            newContent: "",
            imagePreview: null,
        }
    },
    created() {
        this.getOnePost(this.postId);
    },
    beforeUpdate() {
        if(localStorage.getItem("token") == null)
        {
            this.$router.push("/");
        } else{
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
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                },
            }
            fetch(url, options)
                .then(res => res.json())
                .then(singlePostData => {
                    this.userId = singlePostData.userId;
                    this.date = singlePostData.date;
                    this.description = singlePostData.description;
                    this.imageUrl = singlePostData.imageUrl;
                })
                .catch(error => console.log(error));
        },
        /* add file to post */
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
        /* edit a post*/
        editPost() 
        {
            /* if empty */
            if (this.description == "" && this.file === "") 
            {
                 alert("Votre publication est vide");
            }
            /* post with no image */
            else if (this.file === "")  
            {
                const newContent = {
                    userId: this.userId,
                    date: this.date,
                    description: this.description,
                }
                console.log(newContent);
                const options =
                {
                    method: 'PUT',
                    body: JSON.stringify(newContent),
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                };
                fetch(`http://localhost:3000/groupomania/post/${this.postId}`, options)
                    .then((res => res.json()
                        .then(res => {
                            console.log(res);
                            alert("Votre message a été modifié avec succès");
                            this.$router.push('/');                            
                        })
                        .catch(error => console.log('error', error))))
           }
           /* post with image */
            else 
            {
                const newPost = new FormData();
                newPost.append("userId", localStorage.getItem("userId"));
                newPost.append("date", this.date);
                newPost.append("description", this.description);
                newPost.append("imageUrl", this.file);
                for (const value of newPost.values()) {
                    console.log(value);
                }
                const options =
                {
                    method: 'PUT',
                    body: newPost,
                    headers:
                    {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                };
                fetch(`http://localhost:3000/groupomania/post/${this.postId}`, options)
                    .then(res => {
                        console.log(res);
                        return res.json();
                    })
                    .then(resData => {
                        console.log(resData);
                        alert("Votre message a été modifié avec succès");
                        this.$router.push('/HomePage');
                    })
                    .catch(error => console.log('error message: ', error))
            }
        }
    }
}
</script>