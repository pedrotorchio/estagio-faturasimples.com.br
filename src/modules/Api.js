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
            nome: "Cliente Tal",
            cnpj: "6546254-653/535"
          },
          valor_venda: 435.43
        },
        {
          cliente:{
            nome: "Cliente Tal",
            cnpj: "6546254-653/535"
          },
          valor_venda: 435.43
        }
      ])
    )
  }
}