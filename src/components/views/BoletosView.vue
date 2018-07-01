<script>
import row from './Row'
import api from '../../modules/Api'
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
  components: {row, newVendasDialog},
}
</script>
<template>
  <div>
    <section>
      <section v-for="(venda, i) in vendas" :key="i">
        <row :status="true" :icon="'check_circle'">
          <div class="title">
            <span>Boletos de {{venda.cliente.nome}}</span>
            <span class="dollar">{{venda.valor_venda}}</span>
          </div>
        </row>
        <row  class="boleto" v-for="(boleto, i) in venda.boletos" :key="i" :href="boleto">
          {{++i}}
        </row>
        <p v-if="venda.boletos.length == 0">Sem boletos</p>
      </section>
    </section>
  </div>
  
</template>
<style scoped>
.boleto{
  height: 40px !important;
}
p{
  padding-left: 32px;
  text-align: left;
}
</style>


