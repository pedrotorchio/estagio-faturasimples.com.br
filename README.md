# estagio-faturasimples.com.br

> Ferramenta criada em VueJs + SlimPHP

Estrutura de Arquivos
src/
  modules/Api.js - Abstração da api
  components/ - Components Vue para a GUI
    views/ - Conteúdo das tabs
    dialogs/ - Dialogo de criação de Vendas
  api/ - backend para abstrair autenticação e possibilitar acesso livre (justificativa abaixo)


Dificuldades
  1 - A grande dificuldade que tive foi buscando solucionar algo que no fim das contas não é diretamente relacionado com o problema proposto. Devido ao protocolo CORS [https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS], o navegador Google Chrome se recusa a enviar requisições dentro de alguns critérios. No caso, antes de enviar uma requisição buscando recursos, ele envia uma requisição OPTIONS para verificar se o cliente terá a devida permissão. A API do faturasimples.com.br recusava o OPTIONS com 401 (unauthorized), impossibilitando a requisição seguinte. Acredito que isso se dá pelo servidor recusar qualquer consulta não autenticada, inclusive a OPTIONS. Como era sábado, acabei não tendo tempo para evoluir nada no projeto nesse dia. Esse problema se apresenta apenas em acesso via ajax de navegadores aderentes a norma e não em linguagens de backend, terminal ou sessões de cookies.
  2 - Levei pouco mais de uma hora para entender o funcionamento de Boletos, Vendas, Clientes devido à falta de conhecimento de termos e mecanismos do domínio, em especial referentes ao nfs-e.

Resultados
  Cogitei criar um site estático em php, mas ao final resolvi utilizar a api em php para criar minha propria api restful reduzida que não exigiria nenhuma autenticação do navegador. Isso para poder utilizar tecnologias mais diversas e aproveitar o cliente web que já havia desenvolvido, mas claro que é uma tremenda quebra de segurança.

  Gostaria de deixar claro, porém, que o sistema está apenas aceitando requisições vindas do cliente desenvolvido por mim, via cabeçalho Access-Control-Allow-Origin para barrar no cliente web e 

  O cliente está desenvolvido em VueJs e a api em SlimPHP