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

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para mais detalhes.
