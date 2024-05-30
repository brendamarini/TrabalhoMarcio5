/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: API para operações relacionadas a funcionários.
 */
const router = require('express').Router();
const Funcionario = require('../models/Funcionario');


/**
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria um novo funcionário
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *               salario:
 *                 type: number
 *               desligado:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *       422:
 *         description: Campos obrigatórios não foram informados
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', async (req, res) => {
    const { nome, cargo, salario, desligado } = req.body;
    if (!nome || !cargo || !salario || desligado === undefined) {
        return res.status(422).json({ error: 'Informar o nome, cargo, salario e desligado é obrigatório!' });
    }
    
    const funcionario = {
        nome,
        cargo,
        salario,
        desligado,
    };

    try {
        await Funcionario.create(funcionario);
        res.status(201).json({ message: 'Funcionário cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /funcionarios/{id}:
 *   get:
 *     summary: Obtém informações de um funcionário pelo ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Funcionário encontrado
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id?', async (req, res) => {
    const { id } = req.params;
    
    try {
        if (id) {
            const funcionario = await Funcionario.findById(id);
            if (!funcionario) {
                return res.status(404).json({ error: 'Funcionário não encontrado!' });
            }
            return res.status(200).json(funcionario);
        } else {
            const funcionarios = await Funcionario.find();
            res.status(200).json(funcionarios);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /funcionarios/{id}:
 *   put:
 *     summary: Atualiza informações de um funcionário pelo ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *               salario:
 *                 type: number
 *               desligado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       422:
 *         description: Informar ao menos um campo para atualização
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, salario, desligado } = req.body;

    
    if (!nome && !cargo && !salario && desligado === undefined) {
        return res.status(422).json({ error: 'Informar ao menos um campo para atualização!' });
    }

    try {
        const updatedFuncionario = await Funcionario.findByIdAndUpdate(id, { nome, cargo, salario, desligado }, { new: true, runValidators: true });
        if (!updatedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado!' });
        }
        res.status(200).json({ message: 'Funcionário atualizado com sucesso', funcionario: updatedFuncionario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /funcionarios/{id}:
 *   delete:
 *     summary: Deleta um funcionário pelo ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Funcionário deletado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFuncionario = await Funcionario.findByIdAndDelete(id);
        if (!deletedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado!' });
        }
        res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;


