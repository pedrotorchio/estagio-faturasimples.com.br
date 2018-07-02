<script>
/**
 * GUI de visualização de lista de Vendas, exclusão e criação através de dialogo de criação de venda
 */
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
      <row v-for="venda in vendas" 
      :key="venda.id" :status="true" 
      :icon="'check_circle'" :uid="venda.id"  
      @delete="$emit('deleteVenda', $event)">  
      
        <div class="title">
          <span>{{venda.text}}</span>
          <span class="dollar">{{venda.valor_venda}}</span>
        </div>
      </row>
    </section>
    <v-btn @click="openDialog" class="add-btn" flat icon color="yellow">
      <v-icon x-large color="green lighten-1">add_circle</v-icon>
    </v-btn>

    <!-- dialogo de criação -->
    <div @click.self="closeDialog" id="modal" :class="{shown: dialogState}">
      <button @click="closeDialog">X</button>
      <new-vendas-dialog @close="closeDialog" @save="$emit('createVenda', $event)" id="modal-component"></new-vendas-dialog>
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

