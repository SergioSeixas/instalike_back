import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import mongoose from "mongoose";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Define uma rota GET para a URL "/posts".
    // Quando uma requisição GET for feita para essa rota, a função assíncrona será executada.
    const posts = await getTodosPosts();
    // Chama a função assíncrona `getTodosPosts()` para obter todos os posts.
    // A palavra-chave `await` pausa a execução da função até que a promessa retornada por `getTodosPosts()` seja resolvida.
    res.status(200).json(posts);
    // Envia uma resposta HTTP com status 200 (sucesso) e o corpo da resposta em formato JSON,
    // contendo os posts obtidos do banco de dados.
}



export async function uploadImagem(req, res) {
    const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""};

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    }  catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }  
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(id, novoPost);
        res.status(200).json(postCriado);
    }  catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }  
}
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;   
    const urlImagem = `http://localhost:3000/${id}.png`
      
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    }  catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }  
}