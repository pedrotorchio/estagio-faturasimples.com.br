<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
FaturaSimples::configure("https://pedrotorchio.faturasimples.com.br", "jLWia2EPPNWOLW8eUIcTJgWCoik");

$app->get('/venda', function (Request $request, Response $response, array $args) {
    // Sample log message
    $venda = FaturaSimples_Venda::listar();

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
