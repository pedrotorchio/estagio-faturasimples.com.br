import axios from 'axios'

const CHAV = "jLWia2EPPNWOLW8eUIcTJgWCoik";
const AUTH = btoa(`${CHAV}:`);

axios.defaults.withCredentials = true
axios.defaults.baseURL = "https://pedrotorchio.faturasimples.com.br/api"
axios.defaults.headers.common["Authorization"] = `Basic ${AUTH}`

const x = axios.create({
  // withCredentials: true,
  baseURL: "https://pedrotorchio.faturasimples.com.br/api",
  headers:{
    Authorization: `Basic ${AUTH}`
  }
})

export default {
  getVendas(){
    // return x.get('venda')
    return new Promise (resolve=> resolve([
        {
          cliente:{
            nome: "Cliente Primeiro",
            cnpj: "5432654-653/5543"
          },
          valor_venda: 435.43,
          boletos:[
            "https:\/\/fsimp.net\/pedrotorchio\/boleto-tEPJT0XHUEPlDSm6i5Mw",
            "https:\/\/fsimp.net\/pedrotorchio\/boleto-tEPJT0XHUEPlDSm6i5Mw",
            "https:\/\/fsimp.net\/pedrotorchio\/boleto-tEPJT0XHUEPlDSm6i5Mw"
          ]
        },
        {
          cliente:{
            nome: "Segundo Cliente",
            cnpj: "6546254-653/535"
          },
          valor_venda: 4099.43,
          boletos:[
            "https:\/\/fsimp.net\/pedrotorchio\/boleto-tEPJT0XHUEPlDSm6i5Mw",
            "https:\/\/fsimp.net\/pedrotorchio\/boleto-tEPJT0XHUEPlDSm6i5Mw"
          ]
        },
        {
          cliente:{
            nome: "Cliente Terceiro",
            cnpj: "6546254-623/5343"
          },
          valor_venda: 1000.43,
          boletos:[]
        }
      ])
    )
  }
}