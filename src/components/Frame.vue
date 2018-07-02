<script>
/**
 * Componente que gerencia a logistica dos dados de vendas
 * Faz contato com a api e armazena listagem, passando-a para componentes GUI adequados, divididos por tabs
 * 
 */
import VendasView from './views/VendasView'
import BoletosView from './views/BoletosView'
import api from '../modules/Api'

export default {
  data(){
    return {
      selectedTab: 0,
      modalComponent: null,
      vendas: [],
      isLoading: false,
      color: "green lighten-1"
    }
  },
  methods:{
    toggleLoading(state = null){
      this.isLoading = state == null ? !this.isLoading : state
    },
    deleteVenda(id){
      this.toggleLoading(true)
      
      api.deleteVenda(id)
        .then(result=>{
          console.log(result)
          this.getVendas()
        })
        .catch(this.logError)
    },
    getVendas(){
      this.toggleLoading(true)

      api.getVendas()
          .then(vendas => {
            vendas = vendas.map(venda => ({
              ...venda,
              id: parseFloat(venda.id),
              text: `${venda.cliente.nome} ${venda.cliente.cnpj}`
            }))
            
            this.vendas = vendas
            this.toggleLoading(false)
          })
          .catch(this.logError)
    },
    createVenda(data){
      this.toggleLoading(true)
      api.createVenda(data)
        .then(result=>{
          this.getVendas()
          this.toggleLoading(false)
        })
        .catch(this.logError)
    },
    logError(error){
        this.toggleLoading(false)
        console.error(error.mensagem)
    }
  },

  created(){
    this.getVendas()
    // setInterval(this.getVendas, 10000)
  },
  components: {VendasView, BoletosView}
}
</script>
<template>
  <main>
    <v-progress-linear id="progress" v-if="isLoading" indeterminate color="orange lighten-1"></v-progress-linear>
    <v-tabs
        id="main-tabs"
        slot="extension"
        v-model="selectedTab"
        centered
        :color="color"
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
        <!-- vendas -->
        <v-tab-item
          :key="0"
        >
        
                  <vendas-view :vendas="vendas" @deleteVenda="deleteVenda" @createVenda="createVenda"></vendas-view>
        </v-tab-item>
        
        <!-- boletos -->
        <v-tab-item
          :key="1"
        >
        
                  <boletos-view :vendas="vendas" @deleteVenda="deleteVenda"></boletos-view>
        </v-tab-item>
      </v-tabs-items>
      
  </main>
</template>
<style lang="scss" scoped>
#progress{
  position: fixed;
  top: 0;
  margin:0;
  z-index: 999;
}
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
