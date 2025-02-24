import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsControllers.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200}


// Configuração do armazenamento de arquivos usando multer.diskStorage.
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos enviados.
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo a ser armazenado.
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// Configuração do multer com o armazenamento definido.
const upload = multer({ dest: "./uploads" , storage})
//linux ou mac
//const upload = multer({ dest: "./uploads" })
// Define a função que configura as rotas da aplicação.
const routes = (app) => {
    // Habilita o uso de JSON no corpo das requisições.
    app.use(express.json()); 
    app.use(cors(corsOptions));
   // rota para listar os posts
    app.get("/posts", listarPosts); // chama a função controladora para listar os posts

    // Rota para criação de um novo post.
    app.post("/posts", postarNovoPost) // Chama a função controladora para a criação de posts.

    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem").
    app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladorapara processamento da imagem
   // Rota para atualização de um post específico.
    app.put("/upload/:id", atualizarNovoPost)
}

// Exporta a função `routes` para que possa ser utilizada em outros módulos.
export default routes;