<template>
<div>
        <b-card tag="article" class="mb-3 mr-3" bg-variant="info" text-variant="white" :header="player.name">
          <b-card-text class="text-left" >
            <b-form-checkbox v-bind:id="player.id + '-' + categories[0].label" :value="categories[0].value" size="lg" v-model="cardGroups">{{categories[0].label}}</b-form-checkbox>
            <b-form-checkbox v-bind:id="player.id + '-' + categories[1].label" :value="categories[1].value" size="lg" v-model="cardGroups">{{categories[1].label}}</b-form-checkbox>
            <b-form-checkbox v-bind:id="player.id + '-' + categories[2].label" :value="categories[2].value" size="lg" v-model="cardGroups">{{categories[2].label}}</b-form-checkbox>
            <b-form-checkbox v-bind:id="player.id + '-' + categories[3].label" :value="categories[3].value" size="lg" v-model="cardGroups">{{categories[3].label}}</b-form-checkbox>
            <b-form-checkbox v-bind:id="player.id + '-' + categories[4].label" :value="categories[4].value" size="lg" v-model="cardGroups">{{categories[4].label}}</b-form-checkbox>
            <b-form-checkbox v-bind:id="player.id + '-' + categories[5].label" :value="categories[5].value" size="lg" v-model="cardGroups">{{categories[5].label}}</b-form-checkbox>
            <h2 class="border border-light mt-2 pt-2 pb-2 text-center"><strong>{{ card }}</strong></h2>
          </b-card-text>
          <b-card-footer class="text-center">
            <button @click="$emit('del-player', player)" class="del">x</button>
          </b-card-footer>
      </b-card>
      
</div>
</template>

<script>
import json from '@/assets/stacks.json';

var cards = json;

export default {
  name: "Player",
  props: ["player", "categories"],
  data: function() {
    return {
      cardGroups: []

      }
  },
  methods: {
  
  },
computed: {
    card() {
      var _index = this.cardGroups.reduce((acc, item) => acc + parseInt(item, 10), 0);
      if(_index == 0 || _index > 52) {
        return "N/A";
      }
      else{
        return cards.cards[this.cardGroups.reduce((acc, item) => acc + parseInt(item, 10), 0)];  
      }
    }
  }
}
</script>

<style scoped>
  .player {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
  }
  .is-complete {
    text-decoration: line-through;
  }
  .del {
    background: #ff0000;
    color: #fff;
    border: none;
    padding: 10px;
    font-weight: bold;
    border-radius: 20%;
    cursor: pointer;
  }
  .card-body {
    padding: 1rem;
  }

  .card-footer { background-color: none;}
</style>