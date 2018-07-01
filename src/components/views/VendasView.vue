<script>
import row from './Row'
import newVendasDialog from '../dialogs/NewVendas'

export default {
  props:{
    vendas:{
      type: Array,
      default:[]
    }
  },
  data(){
    return {
      dialogState: false
    }
  },
  methods:{
    openDialog(){
      this.dialogState = true
    },
    closeDialog(){
      this.dialogState = false
    }
  },
  components: {row, newVendasDialog}
}
</script>
<template>
  <div>
    <section>
      <row v-for="(venda, i) in vendas" :key="i" :status="true" :icon="'check_circle'">
        <div class="title">
          <span>{{venda.text}}</span>
          <span class="dollar">{{venda.valor_venda}}</span>
        </div>
      </row>
    </section>
    <v-btn @click="openDialog" class="add-btn" flat icon color="yellow">
      <v-icon x-large color="green lighten-1">add_circle</v-icon>
    </v-btn>
    <div @click.self="closeDialog" id="modal" :class="{shown: dialogState}">
      <button @click="closeDialog">X</button>
      <new-vendas-dialog @close="closeDialog" id="modal-component"></new-vendas-dialog>
    </div>
  </div>
  
</template>
<style lang="scss" scoped>
.add-btn {
  margin-top: 16px;
}
.title{
  display: flex;
  justify-content: space-between;
}
.dollar::before{
  content: '$ ';
}
</style>

