'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const formData = require("express-form-data");
const os = require("os");
const responseTime = require('response-time');

var app = express();

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
   };
   
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

app.use(responseTime());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Request-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');
    next();
});

require('dotenv').config();

// login
const login = require("./routes/login");

// clientes
const clientes = require("./routes/catalogos/clientes");

// perfiles
const perfiles = require("./routes/catalogos/perfiles");


// formas pago
const formasPago = require("./routes/catalogos/formas_pago");


// proveedores
const proveedores = require("./routes/catalogos/proveedores");


// empresas
const empresas = require("./routes/catalogos/empresas");

// concepto_de_gastos
const conceptoDeGastos = require("./routes/catalogos/concepto_de_gastos");

// articulos
const articulos = require("./routes/catalogos/articulos");

// almacenes
const almacenes = require("./routes/catalogos/almacenes");

// sucursales
const sucursales = require("./routes/catalogos/sucursales");

// generico
const generico = require("./routes/catalogos/generico");

// plazas
const plazas = require("./routes/catalogos/plazas");

// bancos
const bancos = require("./routes/catalogos/bancos");

// bancos
const cuentas_bancarias = require("./routes/catalogos/cuentas_bancarias");

// chofer
const chofer = require("./routes/catalogos/choferes");

// fleteras
const fleteras = require("./routes/catalogos/fleteras");

// compras
const compras = require("./routes/registros/compras");

// empleados
const empleados = require("./routes/catalogos/empleados");

// ventas
const ventas = require("./routes/registros/ventas");

// movimientos_inveitario
const movimientos_almacen = require("./routes/registros/movimientos_almacen");

// movimientos_inveitario
const inv_tipo_de_movimientos = require("./routes/catalogos/inv_tipo_de_movimientos");

// rutas base

app.use("/api/login", login);
app.use("/api/catalogos/clientes", clientes);
app.use("/api/catalogos/perfiles", perfiles);
app.use("/api/catalogos/formas_pago", formasPago);
app.use("/api/catalogos/proveedores", proveedores);
app.use("/api/catalogos/empresas", empresas);
app.use("/api/catalogos/concepto_de_gastos", conceptoDeGastos);
app.use("/api/catalogos/articulos", articulos);
app.use("/api/catalogos/almacenes", almacenes);
app.use("/api/catalogos/sucursales", sucursales);
app.use("/api/catalogos/generico", generico);
app.use("/api/catalogos/plazas", plazas);
app.use("/api/catalogos/bancos", bancos);
app.use("/api/catalogos/cuentas_bancarias", cuentas_bancarias);
app.use("/api/catalogos/choferes", chofer);
app.use("/api/catalogos/fleteras", fleteras);
app.use("/api/registros/compras", compras);
app.use("/api/catalogos/empleados", empleados);
app.use("/api/registros/ventas", ventas);
app.use("/api/registros/movimientos_almacen", movimientos_almacen);
app.use("/api/catalogos/inv_tipo_de_movimientos", inv_tipo_de_movimientos);
module.exports = app;