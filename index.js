const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const server = express();

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Documentação da API',
        version: '2.0.0',
        description: 'Documentação da API para operações relacionadas a funcionários.',
      },
      servers: [
        {
          url: 'https://trabalhomarcio5.onrender.com', 
        },
      ],
    },
    apis: ['./Routes/FuncionariosRoutes.js'], 
};
  
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const funcionarioRoutes = require('./Routes/FuncionarioRoutes')

//Middleware
server.use(
    express. urlencoded({
    extended: true,
    }),
);

server.use(express.json());

server.use('/funcionario', funcionarioRoutes);

const DB_USER ='brendalauramarini';
const DB_PASSWORD = encodeURIComponent('mZHs26dVOAySWMhp')
//Cpnexao com mongoDB atlas
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xrbeuvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(()=>{
        console.log('Conectado ao MongoDB!');
    })
    .catch((err)=>{
        console. log(err);
    })

server.listen(3000);

/*const express = require('express');
const server = express();
server.use(express.json());

const cursos = ['Node JS', 'Javascript', 'PHP', 'React show'];

server.use((req, res, next) =>{
    console.log(`URL CHAMADA: ${req.url}`);
    return next();
});

function checkCurso(req, res, next){
    if(!req.body.novo_curso){
        return res.status(400).json({error:
        "Nome do curso é obrigatório nesse formato {'novo_nome': 'Lua'}"});
    }

    return next();
}

server.get('/curso',(req, res)=>{
    return res.json(cursos);
});

function checkIDCurso(req, res, next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({ error: "O curso não existe no ID solicitado"});
    }

    return next();
}

server.get('/curso/:index', checkIDCurso, (req, res) => {
    const {index} = req.params;
    return res.json(cursos[index]);
});

function checkRequestBodyPost(req, res, next) {
    if (req.method === 'POST' && !req.body.novo_curso) {
        return res.status(400).json({ error: 
            "O corpo da requisição POST não pode estar vazio. Use o formato {'novo_curso': 'Nome do Curso'}" });
    }
    next();
}

server.post('/curso',  logCursos, checkRequestBodyPost, (req, res)=>{
    const {novo_curso} = req.body;
    cursos.push(novo_curso);

    return res.json(cursos);
});

function checkRequestBody(req, res, next) {
    if (req.method === 'PUT' && Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "O corpo da requisição PUT não pode estar vazio" });
    }
    next();
}

server.put('/curso/:index', checkIDCurso, checkRequestBody, (req, res)=>{
    const { index } = req.params;
    const { curso } = req.body;

    cursos[index] = curso;

    return res.json(cursos);
});

function handleDeleteError(req, res, next) {
    const { index } = req.params;

    if (index < 0 || index >= cursos.length) {
        return res.status(404).json({ error: "Índice inválido, curso não encontrado." });
    }

    next();
}

function deleteCurso(req, res) {
    const { index } = req.params;

    const deletedCurso = cursos.splice(index, 1);

    if (deletedCurso.length === 0) {
        return res.status(500).json({ error: "Erro ao excluir o curso." });
    }

    return res.json({ message: "Curso deletado com sucesso" });
}

function logCursoDeletado(req, res, next) {
    const { index } = req.params;

    const cursosAntes = [...cursos];
    next();

    if (res.statusCode === 200) {
        console.log(`Curso deletado: ${cursosAntes[index]}`);
        console.log("Lista Anterior: ",cursosAntes);
        console.log("Lista de cursos atualizada:");
        console.log(cursos);
    }
}

server.delete('/curso/:index', handleDeleteError, logCursoDeletado, deleteCurso);

function logCursos(req, res, next) {
    const cursosAntes = [...cursos];
    next();
    console.log("Lista de cursos atualizada:");
    console.log(cursosAntes);
    console.log(cursos);
}

server.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ error: 'Erro interno do servidor' });
});

server.listen(3000);
*/
