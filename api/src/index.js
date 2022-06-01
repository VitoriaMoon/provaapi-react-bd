import 'dotenv/config'

import usuariocontroller from './controller/usuariocontroller.js';
import filmecontroller from './controller/filmecontroller.js'
import  listarTodosFilmes from './controller/filmerepository.js';
import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

server.use('/storage/capasfilmes', express.static('storage/capasfilmes'))

server.use(usuariocontroller);
server.use(filmecontroller);
server.use(filmerepository);



server.listen(process.env.PORT, () => console.log(`API tá on, chama no ${process.env.PORT} bb`));