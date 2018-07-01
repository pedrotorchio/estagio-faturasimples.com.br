<script>
export default {
  props: {
    icon:{
      type: String
    },
    status:{
      type: Boolean,
      default: true
    },
    href:{
      type: String,
      required: false
    }
  }
}
</script>
<template>
    <article class="row">
      <div class="icon-container">
        <a :href="href" v-if="href" target="_blank" title="Visualizar">
          <v-icon medium color="green lighten-1">remove_red_eye</v-icon>
        </a>
        <slot v-else-if="icon" name="icon">
          <v-icon x-large :color="status? 'green lighten-1' : 'orange lighten-1'" v-html="icon"></v-icon>
        </slot>
        
      </div>
      <div class="text-container"><slot></slot></div>
      <div class="actn-container">
        <v-btn flat icon color="yellow">
          <v-icon x-large color="red lighten-1" v-if="icon" >delete_forever</v-icon>
        </v-btn>
      </div>
    </article>
</template>
<style lang="scss" scoped>
  .row{
    display: flex;
    flex-direction: row;
    height: 64px;
    align-items: center;
    padding: 8px;
    font-size: 18px;
    > .icon-container {
      flex: 0 0 auto;
    }
    > .text-container{
      flex: 1 1 auto;
      text-align: left;
      padding-left: 24px;
    }
    > .actn-container{
      flex: 0 0 auto;
    }
  }

</style>

