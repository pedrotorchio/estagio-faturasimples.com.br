<script>
import VendasView from './views/VendasView'
import BoletosView from './views/BoletosView'
import api from '../modules/Api'

export default {
  data(){
    return {
      selectedTab: 0,
      modalComponent: null,
      vendas: []
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
            
            this.vendas = vendas
          })
    },
  },
  created(){
    this.getVendas()
  },
  components: {VendasView, BoletosView}
}
</script>
<template>
  <main>
    <v-tabs
        id="main-tabs"
        slot="extension"
        v-model="selectedTab"
        centered
        color="green lighten-1"
        slider-color="yellow"
      >
        <v-tab
          :key="0"
        >Vendas</v-tab>
        <v-tab
          :key="1"
        >Boletos</v-tab>
      </v-tabs>

      <v-tabs-items v-model="selectedTab" id="main-tabs-content">
        <v-tab-item
          :key="0"
        >
        <vendas-view :vendas="vendas"></vendas-view>
        </v-tab-item>
        <v-tab-item
          :key="1"
        >
        <boletos-view :vendas="vendas"></boletos-view>
        </v-tab-item>
      </v-tabs-items>
      
  </main>
</template>
<style lang="scss" scoped>

#main-tabs /deep/ .v-tabs__item{
  color: white;
}
#main-tabs-content{
  max-width: 764px;
  margin: 0 auto;
  overflow: hidden;
  background-color: white;
  padding: 16px !important;
}
</style>
<style lang="scss">
#modal{
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  overflow: hidden;
  &>#modal-component{
    width: 600px;
    background-color: white;
    padding: 16px;
    box-shadow: 0px 0px 0px transparent;
    transition: box-shadow 2s;
    border-radius: 4px;
  }
  
  &>button{
    color: white;
    font-weight: bold;
    position: absolute;
    right: 16px;
    top: 16px;
  }

  &.shown{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);

    &>#modal-component{
      box-shadow: 2px 2px 20px black;
    }
  }
  position: fixed;
  top: 0;
  left: 0;
  transition: background-color .4s;
}
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
.boleto{
  margin-left: 16px;
}
</style>
