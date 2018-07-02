import axios from 'axios'

// DESNESCESSÁRIO JÁ QUE ESTÁ SENDO USADO API AUXILIAR EM PHP
const CHAV = "jLWia2EPPNWOLW8eUIcTJgWCoik";
const AUTH = btoa(`${CHAV}:`);
const BASE = "http://localhost:9090";

axios.defaults.withCredentials = true
axios.defaults.baseURL = "https://pedrotorchio.faturasimples.com.br/api"
axios.defaults.headers.common["Authorization"] = `Basic ${AUTH}`

const x = axios.create({
  // withCredentials: true,
  baseURL: BASE,
  headers:{
    Authorization: `Basic ${AUTH}`
  }
})

// axios adiciona um wrapper data à resposta
function extractData(wrap){
  return wrap.data.data
}
export default {
  getVendas(){
    return new Promise((resolve, reject)=>{
      x.get('venda')
      .then(response=>resolve(extractData(response)))
      .catch(reject)
    })
  },
  createVenda({clienteNome, valorVenda}){
    // cliente (codigo) = 3 | 4 
    // servico (nome) = "Serviço Qualquer" 
    // valor_venda 
    // meio_pagamento (nome) = "Boleto"
    return new Promise((resolve, reject)=>{
      x.post('venda', {
        clienteNome,
        valorVenda,
        servico: "Serviço Qualquer",
      })
        .then(response=>resolve(extractData(response)))
        .catch(reject)
    })
  },
  deleteVenda(id){
    // DELETE https://suaempresa.faturasimples.com.br/api/venda/{ID}
    return new Promise((resolve,reject) => { 
      x.delete(`venda/${id}`)
        .then(response=>resolve(extractData(response)))
        .catch(reject)
    })
  }
}