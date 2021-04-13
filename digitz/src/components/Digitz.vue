<template>
  <div class="hello">
    <h1 class="p-1 m-0 mb-5 border border-dark bg-success text-white">Digitz</h1>
     <b-row class="my-1">
      <b-col sm="12" class="text-center">
        <label for="known"><strong>Enter Known Digits:</strong></label>
        <b-form-input id="known" v-model="known" type="number"></b-form-input>
      </b-col>
    </b-row>
    <b-row> 
      <b-col>
        <h1>? = {{mysteryNumber}}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
          <b-button v-on:click="reset">Reset</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>

function roundTo9(sum) {
  return (Math.ceil(sum/9)*9) - sum;
}

export default {
  name: 'Digitz',
  data() {
      return {
        known: null
      }
  },
  methods:
  {
      reset(){
        this.known = null;
      }
  },
  computed: {
      mysteryNumber: function () {
      // `this` points to the vm instance
      var sum = 0;
      var value = this.known;

      while (value) {
          sum += value % 10;
          value = Math.floor(value / 10);
      }

      return roundTo9(sum);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
