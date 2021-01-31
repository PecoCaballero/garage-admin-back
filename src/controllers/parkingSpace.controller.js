const db = require("../models");
const ParkingSpace = db.parkingSpace;

exports.findAll = (req, res) => {
    var condition = { available: true };

    ParkingSpace.find(condition)
        .then((data) => {
            console.log("Vagas: ", data);
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao obter lista de vagas" });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }

    ParkingSpace.findOne({number: req.body.number})
    .then((data) => {
        console.log("Vaga: ", data);
        ParkingSpace.findByIdAndUpdate(data._id, req.body)
        .then((data) => {
            if (!data) {
                res.status(400).send({
                    msg: "Não foi possível atualizar a vaga",
                });
            } else {
                res.send({ msg: "Vaga atualizada com sucesso" });
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Erro ao atualizar a Vaga" });
        });
    })
    .catch((err) => {
        res.status(500).send({ msg: "Erro ao tentar encontrar vaga" });
    });
 
};
