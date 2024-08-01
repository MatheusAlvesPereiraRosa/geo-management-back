
# geo-managment-back

Seja bem vindo ao meu projeto, sou Matheus Alves e esse projeto foi feito seguindo alguns especificações técnicas de um desafio que recebe, entretanto, acabei adicionando alguns conteúdos a mais nele seguindo alguns estudos meus na época.

## Objetivo principal

A função espcial do Back-end do geo-managment é o de:

✅ Cadastro de usuário: nome, email, telefone e coordenadas geográficas (X, Y) dos usuários.

✅ Cálculo da rota (melhor rota/mais otimizada): A rota é calculada começando e terminando da firma para os usuários de acordo com suas coordenadas geográficas. O algoritmo calcula a melhor rota quando há de 0 a 10 usuários cadastrados, checando todas as rotas possíveis (por meio de permutações entre os possiveis pontos) e vendo qual delas possuí uma distância geral menor, caso a quantidade de usuários seja maior do 10, ele vai utilizar uma versão modificada do algoritmo TSP (caixeiro viajante), para calcular quais pontos dentre os possiveis possuem uma distância menor até chegar na rota mais otimizida.

## Especificações

O Back-end foi dividido de acordo com boas práticas na hora de organizar a aplicação, sendo as pastas principais:

- Algorithms: Possui os códigos/algoritmos necessários para calcular a melhor rota entre a fábrica, passando por todos os clientes voltando para a fábrica

- Config: Onde ficam as configurações do ORM Sequelize para configuração.

- Controllers: Será onde ficarão os arquivos responsáveis por controlar o fluxo de dados referente a sua responsabilidade. Ex.: userController será responsável por fazer as alterações nos dados dos usuários

- Models: Serão os modelos (objetos) para o sequelize criar tabelas no banco de dados da aplicação e para servir de base para operações que o ORM precisar fazer, como pode ser visto no controller de usuários.

- Routes: Pasta responsável pelos arquivos referentes ao roteamento das páginas (layouts e componentes)

## Instalação

Primeiramente, certifique-se que já possui o postgres baixado em seu computador para servir de banco de dados, e após isso, logue com sua senha pelo pgAdmin ou via shell (caso tenha sido definida), e crie uma base de dados chamada geo-managment.

Clone o repositório com o comando git clone no github e abra o arquivo com o terminal de sua escolha.

Depois rode o comando:

```bash
  npm install
```

E crie um arquivo .env com as seguintes informações como no exemplo abaixo:

```bash
  DB_USER="postgres"
  DB_PASS="admin"
  DB_NAME="geo-managment"
  DB_HOST="localhost"
```

Obs.: Substitua DB_PASS com a senha que você colocou ao baixar o postgres.

Após isso rode o projeto com o comando npm run dev

```bash
  node index.js
```

E pronto, se você receber a mensagem no terminal:

```bash
Server is running at http://localhost:3000
Connection to the database has been established successfully.
Database synchronized successfully.
```

Tudo está funcionando como deveria.

