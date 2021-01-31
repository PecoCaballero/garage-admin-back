module.exports = app => {
    const car = require("../controllers/car.controller.js");
  
    var router = require("express").Router();
  
    // Insere novo carro
    router.post("/", car.create);
  
    // Retorna todos carros
    router.get("/", car.findAll);
  
    // Remove todos os carros do dono X
    router.delete("/byOwner/:ownerID", car.deleteByOwner);
  
    // Retorna o carro dado seu ID
    router.get("/:licensePlate", car.findOne);
  
    // Atualiza o carro dado seu ID
    router.put("/:id", car.update);
  
    // Remove um carro dado seu id
    router.delete("/:id", car.delete);
  
    app.use('/api/cars', router);
  };