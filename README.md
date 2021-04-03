<h1 align="center">
  <img src="https://www.monprospecteur.com/wp-content/uploads/2017/09/MonProspecteur_Logo-01-1.png" alt="logo" >

</h1>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/rogerinn/mon_prospecteur?style=social">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rogerinn/mon_prospecteur?style=social">
  <img alt="Repository size" src="https://img.shields.io/github/issues-pr/rogerinn/mon_prospecteur?style=social">
</p>

<br>

## :rocket: Tecnologias

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Node.JS](https://nodejs.org/en/)
- [MongoDb](https://docs.mongodb.com/)

<br>

## 🏭: Arquitetura

<img src="public/arch.png">

<br>

## 💾: Fluxo das branchs

<img src="https://lh3.googleusercontent.com/proxy/YtrSpiLLsW1zIzHah6uowCBfqAaYVfJ96cC3y6BDxwSaDg3IUbNIHg0mgOQ-cVNe7o3dmBEqmeyk8-O1QeTIxsW5jogS1V40tq1_lIxfqJhMQ21FgdRFvoqB9xbhz3Sr3g">

<br>


## :wrench: Instalação e uso

Para rodar a aplicação, você precisa ter o [Node](https://nodejs.org/en/), [Docker](https://docs.docker.com/get-docker/) e [Docker-compose](https://docs.docker.com/compose/install/) instalados em sua máquina e seguir os passos abaixo:

1) Abra um terminal e copie este repositório com o comando
    ```
    git clone https://github.com/rogerinn/mon_prospecteur.git
    ```
    ou use a opção de download.

2) Entre na pasta com
    ```
    cd mon_prospecteur
    ```

3) Rode a aplicação, docker irá instalar dependencias e configurações externas.
    ```
    docker-compose up --build -d
    ```
    Ou 
    ```
    docker-compose up --build
    ```
    para manter interatividade no terminal.
    
4) Acesse ```http://localhost:3000``` no seu cliente http de preferência (Postman, Insomnia, etc).

<br>

## 🔧: Testes

Para rodar os testes, você precisa ter executar o passo anterior e depois seguir os passos abaixo.

1) Testes unitários 
    ```
    yarn test:unit
    ```
2) Testes e integração
    ```
    yarn test:integration
    ```

3) Cobertura de testes
    ```
    yarn test:ci
    ```

<br>

# 📑: API
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
- **[<code>POST</code> Accounts list](/accounts/GET_list.md)**
</p>
</details>

<details><summary>SignIn</summary>
<p>
- **[<code>POST</code> Create Service](/services/POST_create.md)**
</p>
</details>

[Accounts]: /accounts/
[Services]: /services/
[Channel Types]: /channel-types
[Service Channels]: /service_channels
[Contacts]: /contacts
[Contact Channels]: /contact_channels
[Messages]: /messages
[Contact Custom Fields]: /contact_custom_fields
[Labels]: /labels
[Templates]: /templates
[Automations]: /automations
[Error Codes]: /error_codes.md

<br>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para mais detalhes.
