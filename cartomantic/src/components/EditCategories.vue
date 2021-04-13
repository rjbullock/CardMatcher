<template>
  <div class="mb-2">
     <b-button v-b-toggle.collapse-1 variant="primary">Edit Categories</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card class="p-0 m-0">
                <b-input-group v-for="(category, index) in categories" :key="category.value" size="lg" :prepend="index+1">
                  <b-form-input class="mr-0" v-model="category.label"  :id="category.label+category.value" type="text" :name="category.label"></b-form-input>
                </b-input-group>
          </b-card>
        </b-collapse>
  </div>
</template>

<script>

export default {
  name: "EditCategories",
  props: {
    categories: Array 
    }
}
</script>

<style scoped>
.card-body {
  padding: 0;
  border: none;
}
</style>