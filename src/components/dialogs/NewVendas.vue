<script>
export default {
  props:{
    color:{
      type: String,
      default: "green"
    },
  },
  data(){
    return {
      cliente: '',
      valor: ''
    }
  },
  methods:{
    clear(){
      this.cliente = ''
      this.valor = ''
    },
    close(){
      this.clear()
      this.$emit('close')
    },
    save(){
      this.$emit('save', {
        clienteNome: this.cliente, 
        valorVenda: this.valor
        })
      this.close()
    }
  }
}
</script>
<template>
  <div>
    <v-text-field :color="color" label="Nome do Cliente" placeholder="Cliente" v-model="cliente"></v-text-field>
    <v-text-field :color="color" label="Valor" placeholder="Valor" v-model="valor"></v-text-field>
    <v-btn @click="save" color="success">Salvar</v-btn>
    <v-btn @click="close" color="warning">Cancelar</v-btn>
  </div>
</template>
