module.exports = app => {
    const parkingSpace = require("../controllers/parkingSpace.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", parkingSpace.findAll);

    router.put("/", parkingSpace.update);
  
    app.use('/api/parkingSpaces', router);
  };