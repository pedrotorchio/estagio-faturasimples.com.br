<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
FaturaSimples::configure("https://pedrotorchio.faturasimples.com.br", "jLWia2EPPNWOLW8eUIcTJgWCoik");

function checkError($json){
    $data = json_decode($json, true);
    return isset($data['mensagem']) && isset($data['tipo']);
}

function checkOrigin($req, $res, $next) {
    $expOrigin =  "https://app-estagio-faturasimples.herokuapp.com/";
    $reqOrigin = $req->getHeaderLine('origin');

    if($reqOrigin != $expOrigin)
        return $res
        ->withHeader('Access-Control-Allow-Origin', $expOrigin)
        ->withJson([
            "tipo" => "Cliente Inválido",
            "mensagem" => "Cliente web não permitido " . $reqOrigin
        ], 401);

        $response = $next($req, $res);
    
    return $response
            ->withHeader('Access-Control-Allow-Origin', $expOrigin)
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
};
$app->add(checkOrigin);

$app->delete('/venda/{id}', function (Request $request, Response $response, array $args) {
    // Sample log message
    $resultado = FaturaSimples_Venda::deletar($args['id']);

    if(checkError($resultado))
        $response = $response->withStatus(400);

   return $response
            ->withHeader('Content-type', 'application/json')
            ->write($resultado);

});
$app->get('/venda', function (Request $request, Response $response, array $args) {
    // Sample log message
    $resultado = FaturaSimples_Venda::listar();

    if(checkError($resultado))
        $response = $response->withStatus(400);

    return $response
                ->withHeader('Content-type', 'application/json')
                ->write($resultado);
});
$app->post('/venda', function (Request $request, Response $response, array $args) {
    // Sample log message
    $data = $request->getParsedBody();
    
    $data = array(
        "data" => date("Y-m-d"),
        "cliente" => $data['clienteNome'],
        "servico" => $data['servico'],
        "valor_venda" => $data['valorVenda'],
        "emissao_nfse" => FaturaSimples_Venda::EMISSAO_NFSE_NAO_EMITIR_NFSE,
        "meio_pagamento" => 'Boleto',
        "nfse_municipio_emissao" => 2611606,
        "nfse_item_servico" => 103,
        "nfse_codigo_tributacao_municipio" => 6311900,
        "nfse_inscricao_municipal" => 123456,
        "nfse_optante_simples_nacional" => FaturaSimples_Venda::SIM,
        "nfse_incentivador_cultural" => FaturaSimples_Venda::NAO
    );
    $resultado = FaturaSimples_Venda::criar( $data );

    if(checkError($resultado))
        $response = $response->withStatus(400);

    return $response
            ->withHeader('Content-type', 'application/json')
            ->write($resultado);
});
