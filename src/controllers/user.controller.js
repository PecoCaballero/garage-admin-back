const db = require("../models");
const User = db.user;

exports.create = (req, res) => {
    if (
        !req.body.name ||
        !req.body.phone
    ) {
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        return;
    }
    
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
    });

    console.log('cadastro: ', user)

    user.save(user)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                msg: err.message,
            });
        });
};

exports.findAll = (req, res) => {

    var condition = {};

    User.find(condition)
        .then((data) => {
            console.log('Users: ', data)
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao obter lista de usuários" });
        });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    User.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ msg: "Usuário não encontrado" });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao obter dado com id = " + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body)
        .then((data) => {
            if (!data) {
                res.status(400).send({
                    msg: "Não foi possível atualizar o Usuário",
                });
            } else {
                res.send({ msg: "Usuário atualizado com sucesso" });
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao atualizar o Usuário" });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(400).send({
                    msg: "Não foi possível remover o Usuario",
                });
            } else {
                res.send({ msg: "Usuario deletado com sucesso" });
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao deletar o Usuario" });
        });
};
