<template>
<div>
    <b-row>
    <b-card-group rows v-bind:key="player.id" v-for="player in players">
      <Player v-bind:player="player" v-bind:categories="categories" v-on:del-player="$emit('del-player', player.id)" />
    </b-card-group>
  </b-row>
  </div>
</template>


<script>
import Player from './Player.vue';
export default {
  name: "Players",
  components: {
    Player
  },
  props: ["players", "categories"]
}
</script>

<style scoped>
</style>