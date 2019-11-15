<template>
    <div v-if="smoothie" class="edit-smoothie">
        <h2>Edit  {{smoothie.title}}</h2>

         
        <form @submit.prevent="EditSmoothie">
        <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" name="title" v-model="smoothie.title">
        </div>
        <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
            <label for="ingredient">ingredient:</label>
            
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="filed" add-ingredient>
            <label for="add-ingredient">Add an ingredient</label>
            <input type="text" name="text" @keydown.tab.prevent="addIng" v-model="another">
        </div>
        <div class="field center-align">
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <button class="btn pink">Edit smoothie</button>
        </div>
        </form>
    </div>

</template>
<script>

import { db } from '@/main';
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data(){
        return{
            smoothie: null,
            another: null,
            feedback: null
        }

    },
    methods: {
        EditSmoothie(){
            if(this.smoothie.title){
                this.feedback = null

                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"\-:@']/g,
                    lower: true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(() => {

                            db.collection('smoothies').get().then(snapshot => { 
                                this.$router.push({name: 'index', params:snapshot})
                            })
                    
                })
                }
                else{
                    this.feedback = 'You must enter a smoothie title'
                }
        },
        addIng(){
            if(this.another){
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIng(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => { 
                return ingredient != ing
            })
        }
    },
     created(){
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>
<style>


   .edit-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width:500px;
    }
    .edit-smoothie{
        font-size: 2em;
        margin: 20px auto;
    }
    .edit-smoothie .field{
        margin: 20px auto;
        position: relative;
    }
    .edit-smoothie .delete {
        position: absolute;
        right:0;
        bottom: 16px;
        color:#aaa;
        font-size:1em;
        cursor: pointer;
    }
    .edit-smoothie .delete:hover{
        color:rgb(128, 128, 128)
    }

</style>