
const router = require('express').Router();
const Funcionario = require('../models/Funcionario');

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


