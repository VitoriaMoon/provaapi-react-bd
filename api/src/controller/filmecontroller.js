import {alterarImagem, inserirfilme} from '../repository/filmerepository.js';
import multer from 'multer'
import {Router} from 'express'
const server = Router();
const upload = multer ({dest: 'storage/capasfilmes'})

server.post('/filme', async (req, resp) => {
    try {
        const novofilme = req.body;

        if (!novofilme.nome) {
            throw new Error ('Nome do filme é obrigatório!!')
        }
        if (!novofilme.sinopse) {
            throw new Error ('Sinopse do filme é obrigatório!!')
        }
        if (!novofilme.avaliacao== undefined|| novofilme.avaliacao > 0) {
            throw new Error ('Avaliação do filme é obrigatório!!')
        }
        if (!novofilme.lancamento) {
            throw new Error ('Lançamento do filme é obrigatório!!')
        }
        if (!novofilme.disponivel) {
            throw new Error ('Campo Dísponivel é obrigatório!!')
        }
        if (!novofilme.usuario) {
            throw new Error ('Usuário não logado!!')
        }

        const filmeInserir = await inserirfilme(novofilme);

        resp.send(filmeInserir)

    } catch (error) {
        resp.status(401).send({
            erro:error.message
        })
    }
})

server.put('/filme/:id/capa',upload.single('capa'), async (req, resp) =>{
    try {
        const { id } = req.params;
        const imagem = req.file.path;   
        const resposta = await alterarImagem(imagem, id)

        if (resposta != 1 ) {
            throw new Error ('Não possível inserir a imagem')
        }
        resp.status(204).send();
    } catch (err) {
        resp.status(401).send({
            erro:err.message
        })
    }
} )

server.get('/filmes', async (req, resp) => {
    try {
        const resposta = await listarTodosFilmes();
        resp.send(resposta);

    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;