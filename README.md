<h1 align="center">
  <img src="https://www.monprospecteur.com/wp-content/uploads/2017/09/MonProspecteur_Logo-01-1.png" alt="logo" >

</h1>

<p align="center">
  <img src="https://travis-ci.com/rogerinn/mon_prospecteur.svg?branch=main">
  <img src="https://coveralls.io/repos/github/rogerinn/mon_prospecteur/badge.svg">
  <img src="https://img.shields.io/badge/Author-rogerinn-black">
  <img src="https://img.shields.io/github/languages/code-size/rogerinn/mon_prospecteur?color=black">
  <img src="https://img.shields.io/github/languages/count/rogerinn/mon_prospecteur?color=black">
  <img src="https://img.shields.io/github/issues-pr-closed/rogerinn/mon_prospecteur?color=black">
  <img src="https://img.shields.io/github/last-commit/rogerinn/mon_prospecteur?color=black">
</p>

<br>

## :rocket: Tecnologias

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Node.JS](https://nodejs.org/en/)
- [MongoDb](https://docs.mongodb.com/)

<br>

## 🏭 Arquitetura

<img src="public/arch.png">

<br>

## 💾 Fluxo das branchs

<img src="/public/branch.png">

<br>


## 🔧 Instalação e uso

Para rodar a aplicação, você precisa ter o [Node](https://nodejs.org/en/), [Docker](https://docs.docker.com/get-docker/), [Docker-compose](https://docs.docker.com/compose/install/) e [Yarn](https://classic.yarnpkg.com/en/docs/install/) instalados em sua máquina e seguir os passos abaixo:

1) Abra um terminal e copie este repositório com o comando
    ```bash
    git clone https://github.com/rogerinn/mon_prospecteur.git
    ```
    ou use a opção de download.

2) Entre na pasta com
    ```bash
    cd mon_prospecteur
    ```

3) Rode a aplicação, docker irá instalar dependencias e configurações externas.
    ```bash
    docker-compose up --build -d
    ```
    Ou 
    ```bash
    docker-compose up --build
    ```
    para manter interatividade no terminal.
    
4) Acesse ```http://localhost:3000``` no seu cliente http de preferência (Postman, Insomnia, etc).

<br>

## ☣️ Testes

Para rodar os testes, você precisa ter executar o passo anterior e depois seguir os passos abaixo.

1) Testes unitários 
    ```bash
    yarn test:unit
    ```
2) Testes e integração
    ```bash
    yarn test:integration
    ```

3) Cobertura de testes
    ```bash
    yarn test:ci
    ```

<br>

# 📑 API
Documentação de uso.

## Controle de versão de API
A primeira parte do caminho URI especifica a versão da API que você deseja acessar no formato `v{version_number}`. 

Por exemplo, a versão 1 da API (mais atual) pode ser acessada por meio de:

```no-highlight
https://localhost/v1/
```

## Solicitações HTTP
Todas as solicitações de API são feitas enviando uma solicitação HTTPS segura usando um dos seguintes métodos, dependendo da ação que está sendo realizada:

* `POST` Crie um recurso
* `PUT` Atualizar um recurso
* `GET` Obtenha um recurso ou lista de recursos
* `DELETE` Excluir um recurso

Para solicitações PUT e POST, o corpo de sua solicitação pode incluir uma carga útil JSON, e o URI solicitado pode incluir uma string de consulta especificando filtros ou comandos adicionais, todos descritos nas seções a seguir.

## Códigos de resposta HTTP
Cada resposta será retornada com um dos seguintes códigos de status HTTP:

* `200` `OK` O pedido foi bem sucedido
* `400` `Bad Request` Houve um problema com a solicitação (segurança, malformado, validação de dados, etc.)
* `401` `Unauthorized` As credenciais de API fornecidas são inválidas
* `403` `Forbidden` As credenciais fornecidas não têm permissão para acessar o recurso solicitado
* `404` `Not found` Foi feita uma tentativa de acessar um recurso que não existe na API
* `500` `Server Error` Ocorreu um erro no servidor

## Endpoints
<details><summary>SignUp</summary>
<p>
  <ul>
    <li>
  <details><summary>Method: <code>POST</code> Path: <code>/v1/sign-up</code></summary>
    <p>
     <details><summary>Request</summary>
       
```JSON
Content-Type:application/json,
Accept:application/json,
body: 
{
  "email": "any@email.com",
  "password": "12345",
  "confirmationPassword": "12345"
}
```

<p>- <code>email:</code> <code>Obrigatório</code> <code>String</code> <code>Min: 10</code> <code>Max: 50</code> </p>
<p>- <code>password:</code> <code>Obrigatório</code> <code>String</code> <code>Min: 10</code> <code>Max: 50</code> </p>
<p>- <code>confirmationPassword:</code> <code>Obrigatório</code> <code>String</code> <code>Min: 10</code> <code>Max: 50</code> </p>
</details>
<details><summary>Response</summary>
<ul>
<li>
<details><summary>200</summary>
    
```JSON
statusCode: 200
{
  "id": 1,
  "email": "any@email.com",
  "token": "any_token"
}
```
<p>- <code>id:</code> <code>Number</code> </p>
<p>- <code>email:</code> <code>String</code> </p>
<p>- <code>token:</code> <code>String</code> </p>
</details>
</li>
<li>
<details><summary>400</summary>
        
```JSON
statusCode: 400
{
 "name": "Missing param",
 "message": "Missing param: {field}"
}
```
   <p>- <code>name:</code> <code>String</code> </p>
   <p>- <code>message:</code> <code>String</code> </p>
   <p>- <code>field:</code> <code>email, password ou confirmationPassword</code> </p>
    </details>
    </li>
    </ul>
    </details>
    </p>
  </details>
    </li>
  </ul>
</p>
</details>

<details><summary>SignIn</summary>
<p>
  <ul>
    <li>
  <details><summary>Method: <code>POST</code> Path: <code>/v1/sign-in</code></summary>
    <p>
    <details><summary>Request</summary>
      
```JSON
Content-Type:application/json,
Accept:application/json,
body: 
{
  "email": "any@email.com",
  "password": "12345"
}
```
<p>- <code>email:</code> <code>Obrigatório</code> <code>String</code> <code>Min: 10</code> <code>Max: 50</code> </p>
    <p>- <code>password:</code> <code>Obrigatório</code> <code>String</code> <code>Min: 10</code> <code>Max: 50</code> </p>
    </details>
    <details><summary>Response</summary>
      
```JSON
{
  "token": "any_token"
}
```      
   <p>- <code>token:</code> <code>String</code></p>
    </details>
    </p>
  </details>
    </li>
  </ul>
</p>
</details>

<details><summary>Search</summary>
<p>
  <ul>
    <li>
  <details><summary>Method: <code>GET</code> Path: <code>/v1/search</code></summary>
    <p>
    <details><summary>Request</summary>
      
```JSON
Content-Type:application/json,
Accept:application/json,
params: 
{
  "address": "any_address"
}
```      
   <p>- <code>address:</code> <code>Obrigatório</code> <code>String</code> <code>Min: 10</code> <code>Max: 50</code> </p>
    </details>
    <details><summary>Response</summary>
  
```JSON
{
  "data": [ { "address": "any_address" } ]
}
```   
   <p>- <code>data:</code> <code>Array</code>  </p>
    </details>
    </p>
  </details>
    </li>
  </ul>
</p>
</details>

<br>

## 🏗️ Roadmap

Melhorias e features:

- **CD/CI:** Teraform, Ansible and Azure cloud (Pipeline).
- **Front:** Angular.
- **Banco de dados:** Modelagem.
- **Documentação**: Adicionar lista com tipos de erros. Ex: "Missing param".

<br>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para mais detalhes.
