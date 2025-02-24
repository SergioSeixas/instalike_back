import 'dotenv/config'; // Importa a função config() do pacote dotenv.
import conectarAoBanco from "../config/dbconfig.js"
// Importa a função para conectar ao banco de dados, definida em dbconfig.js.
import { ObjectId } from "mongodb"; // Corrigindo a importação
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// Conecta ao banco de dados utilizando a string de conexão obtida da variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável conexao.

// Função assíncrona para buscar todos os posts do banco de dados 'instabyte'.
export async function getTodosPosts() {
    // Obtém o banco de dados 'instabyte' a partir da conexão estabelecida.
    const db = conexao.db("instabyte");
    // Seleciona a coleção 'posts' dentro do banco de dados 'instabyte',
     const colecao = db.collection("posts");
    // Executa uma consulta para encontrar todos os documentos (posts) na coleção.
    return colecao.find().toArray();
  }

  export async function criarPost(novoPost) {
    //Declara uma função assíncrona chamada criarPost, que recebe um parâmetro novoPost.
    const db = conexao.db("instabyte");
    //Declara a constante db, que armazena a conexão com o banco de dados instabyte.
    const colecao = db.collection("posts");
    //Declara a constante colecao, que representa a coleção posts dentro do banco instabyte.
    return colecao.insertOne(novoPost)
    //Insere o objeto novoPost na coleção posts e retorna o resultado da operação.
  }

  export async function atualizarPost(id, novoPost) {
    const db = conexao.db("instabyte");
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost})
  }