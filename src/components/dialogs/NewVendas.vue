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
    <v-text-field :color="color" label="Nome" placeholder="Nome"></v-text-field>
    <v-text-field :color="color" label="Valor" placeholder="Valor"></v-text-field>
    <v-btn @click="$emit('save')" color="success">Salvar</v-btn>
    <v-btn @click="$emit('close')" color="warning">Cancelar</v-btn>
  </div>
</template>
