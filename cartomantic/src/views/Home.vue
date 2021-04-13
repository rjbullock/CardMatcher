<template>
  <div id="app">
    <b-container>
      <b-row>
        <AddPlayer v-on:add-player="addPlayer" />
        <b-col class="text-right"><a :href="pdfLink" class="btn btn-primary" download="download">Download Card Charts PDF</a></b-col>
      </b-row>
      <b-row>
        <EditCategories :categories="categories" />
      </b-row>
      <Players v-bind:players="players" :categories="categories" v-on:del-player="deletePlayer" />
    </b-container>
  </div>
</template>

<script>
import Players from '../components/Players';
import AddPlayer from '../components/AddPlayer';
import EditCategories from '../components/EditCategories';

function initialCats (){
  return {
    
  }
}

export default {
  name: 'Home',
  components: {
    Players,
    AddPlayer,
    EditCategories
  },
  data() {
    return {
      players: [],
      pdfLink: require("@/assets/charts.pdf"),
      "categories": [
        {
          "label": "The Doer",
          "value": 1
        },
        {
          "label": "The Thinker",
          "value": 2
        },
        {
          "label": "The Creator",
          "value": 4
        },
        {
          "label": "The Helper",
          "value": 8
        },
        {
          "label": "The Persuader",
          "value": 16
        },
        {
          "label": "The Organizer",
          "value": 32
        }
        ]
    }
  },
  methods: {
    deletePlayer(id) {
      this.players = this.players.filter(player => player.id !== id);
      this.savePlayers();
    },
    addPlayer(newPlayer) {
      this.players = [...this.players, newPlayer];
      this.savePlayers();
    },
    savePlayers() {
      const parsed = JSON.stringify(this.players);
      localStorage.setItem('players', parsed);
    }
  },
  mounted() {
    if (localStorage.getItem('players')) {
      try {
        this.players = JSON.parse(localStorage.getItem('players'));
      } catch(e) {
        localStorage.removeItem('players');
      }
    }
    if (localStorage.getItem('categories')) {
      try {
        this.categories = JSON.parse(localStorage.getItem('categories'));
      } catch(e) {
        localStorage.removeItem('categories');
      }
    }
    else {
      const parsed = JSON.stringify(this.categories);
      localStorage.setItem('categories', parsed);
    }
  },
  watch: {
    categories: {
      deep: true,
      handler(newCats) {
        const parsed = JSON.stringify(newCats);
        localStorage.setItem('categories', parsed);
      }
    }
  }
}
</script>

<style>

</style>
