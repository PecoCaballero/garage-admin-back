const db = require("../models");
const Car = db.car;

exports.create = (req, res) => {
    if (
        !req.body.licensePlate ||
        !req.body.model ||
        !req.body.brand ||
        !req.body.ownerID ||
        !req.body.year ||
        !req.body.parkingSpaceNumber
    ) {
        console.log(req.body);
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        return;
    }

    Car.findOne({ licensePlate: req.body.licensePlate })
        .then((data) => {
            if (!data) {
                const car = new Car({
                    licensePlate: req.body.licensePlate,
                    model: req.body.model,
                    brand: req.body.brand,
                    ownerID: req.body.ownerID,
                    year: parseInt(req.body.year),
                    parkingSpaceNumber: parseInt(req.body.parkingSpaceNumber),
                });

                car.save(car)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            msg: err.message,
                        });
                    });
            } else {
                res.status(409).send({ msg: "Placa já registrada" });
            }
        })
        .catch((err) => {
            res.status(500).send({
                msg: "Erro ao obter dado com placa =" + req.body.licensePlate,
            });
        });
};

exports.findAll = (req, res) => {
    var condition = {};

    Car.find(condition)
        .then((data) => {
            console.log("Carr: ", data);
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao obter lista de carros" });
        });
};

exports.findOne = (req, res) => {
    const licensePlate = req.params.licensePlate;

    Car.findOne({ licensePlate })
        .then((data) => {
            if (!data) {
                res.status(404).send({ msg: "Carro não encontrado" });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao obter dado com id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }

    const id = req.params.id;

    console.log(`Update car ${id}: `, req.body);

    Car.findByIdAndUpdate(id, req.body)
        .then((data) => {
            if (!data) {
                res.status(400).send({
                    status: "error",
                    msg: "Não foi possível atualizar o Carro",
                });
            } else {
                res.send({
                    status: "success",
                    msg: "Carro atualizado com sucesso",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao atualizar o Carro" });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    console.log('delete: ', id)
    Car.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(400).send({
                    msg: "Não foi possível remover o Carro",
                });
            } else {
                res.send({ msg: "Carro deletado com sucesso" });
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao deletar o Carro" });
        });
};

exports.deleteByOwner = (req, res) => {
    var condition = { ownerID: req.params.ownerID };

    Car.deleteMany(condition)
        .then((data) => {
            if (data.deletedCount == 0) {
                res.send({ msg: "Nenhum carro foi deletado" });
            } else {
                res.send({
                    msg: "Foram deletados " + data.deletedCount + " carros",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao atualizar o carro" });
        });
};
