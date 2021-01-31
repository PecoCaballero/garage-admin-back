// Conjunto de importações necessárias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const carRoute = require('./src/routes/car.route')
const userRoute = require("./src/routes/user.route")
const parkingSpaceRoute = require('./src/routes/parkingSpace.route')
require('dotenv').config()

const app = express();

// Seta as configurações do CORS. No caso, especifica que apenas conexões de tal endereço serão aceitas. Ver: // https://expressjs.com/en/resources/middleware/cors.html
var corsOptions = {
  origin: "https://pecocaballero.github.io/"
};

// Ativa a configuração CORS
app.use(cors(corsOptions));

// Parseia requisições do tipo JSON - application/json
app.use(bodyParser.json());

// Parseia também requisições do tipo HTML - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./src/models");
db.mongoose
  .connect(process.env.MONGODB_URL || db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch(err => {
    console.log("Não foi possível conectar ao banco de dados\n", err);
    process.exit();
  });

carRoute(app)
userRoute(app)
parkingSpaceRoute(app)


// "Executa" o servidor, escutando em uma porta específica.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}.`);
});