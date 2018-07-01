<script>
export default {
  props:{
    color:{
      type: String,
      default: "green"
    },
  }
}
</script>
<template>
  <div>
    <v-text-field :color="color" label="Regular"></v-text-field>
    <v-text-field :color="color" label="Regular"></v-text-field>
    <v-text-field :color="color" label="Regular"></v-text-field>
    <v-btn @click="$emit('save')" color="success">Salvar</v-btn>
    <v-btn @click="$emit('close')" color="warning">Cancelar</v-btn>
  </div>
</template>
