<template>
    <div class="add-smoothie container">
        <h2 class=" center-align indigo-text"> Add new smoothie recipe</h2>
        <form @submit.prevent="AddSmoothie">
        <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" name="title" v-model="title">
        </div>
        <div v-for="(ing, index) in ingredients" :key="index" class="field">
            <label for="ingredient">ingredient:</label>
            
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="filed" add-ingredient>
            <label for="add-ingredient">Add an ingredient</label>
            <input type="text" name="text" @keydown.tab.prevent="addIng" v-model="another">
        </div>
        <div class="field center-align">
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <button class="btn pink">Add smoothie</button>
        </div>
        </form>
    </div>
</template>

<script>
import { db } from '@/main';
import slugify from 'slugify'
export default {
    name: 'AddSmoothie',
    data(){
        return {
            title: null,
            another:null,
            ingredients:[],
            feedback: null,
            slug: null

        }
    },

    methods: {
        AddSmoothie(){
            if(this.title){
                this.feedback = null

                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"\-:@']/g,
                    lower: true
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
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
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(ingredient => { 
                return ingredient != ing
            })
        }
    }
}
</script>

<style>
    .add-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width:500px;
    }
    .add-smoothie{
        font-size: 2em;
        margin: 20px auto;
    }
    .add-smoothie .field{
        margin: 20px auto;
        position: relative;
    }
    .add-smoothie .delete {
        position: absolute;
        right:0;
        bottom: 16px;
        color:#aaa;
        font-size:1em;
        cursor: pointer;
    }
    .add-smoothie .delete:hover{
        color:rgb(128, 128, 128)
    }
</style>