<script>
import row from './Row'
import api from '../../modules/Api'
import newVendasDialog from '../dialogs/NewVendas'

export default {
  data(){
    return {
      list:[],
      dialogState: false
    }
  },
  methods:{
    getVendas(){
      api.getVendas()
          .then(vendas => {
            vendas = vendas.map(venda => ({
              ...venda,
              text: `${venda.cliente.nome} ${venda.cliente.cnpj}`
            }))
            
            this.list = vendas
          })
    },
    openDialog(){
      this.dialogState = true
    },
    closeDialog(){
      this.dialogState = false
    }
  },
  components: {row, newVendasDialog},
  created(){
    setInterval(this.getVendas(), 2000)
  }
}
</script>
<template>
  <div>
    <section>
      <row v-for="(item, i) in list" :key="i" :status="true" :icon="'check_circle'">
        <div class="title green--text text--lighten-1">
          <span>{{item.text}}</span>
          <span class="dollar">{{item.valor_venda}}</span>
        </div>
      </row>
    </section>
    <v-btn @click="openDialog" class="add-btn" flat icon color="yellow">
      <v-icon x-large color="cyan">add_circle</v-icon>
    </v-btn>
    <div id="modal" :class="{shown: dialogState}">
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

