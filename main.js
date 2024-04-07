const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("public"));

const productos = [
    { id: 1, nombre: "Zapatillas Adidas", precio: 189.90 },
    { id: 2, nombre: "Zapatillas Convers", precio: 245.90 },
    { id: 3, nombre: "Zapatillas Adidas Puma", precio: 130.50 }
];

const clientes = [
    { id: 1, nombre: "Juan", apellido: "Perez" },
    { id: 2, nombre: "María", apellido: "González" },
    { id: 3, nombre: "Pedro", apellido: "López" }
];

app.get("/", (req, res) => {
    res.render("index.html");
});

function buscarClientePorId(id) {
    return clientes.find(cliente => cliente.id === parseInt(id));
}

app.get("/clientes", (req, res) => {
    res.json(clientes);
});

app.get("/clientes/:id", (req, res) => {
    const cliente = buscarClientePorId(req.params.id);
    if (!cliente) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json(cliente);
});

app.post("/clientes", (req, res) => {
    const nuevoCliente = req.body;
    const ultimoId = clientes.length > 0 ? clientes[clientes.length - 1].id : 0;
    nuevoCliente.id = ultimoId + 1;
    clientes.push(nuevoCliente);
    res.json(nuevoCliente);
});

app.put("/clientes/:id", (req, res) => {
    const cliente = buscarClientePorId(req.params.id);
    if (!cliente) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    res.json(cliente);
});

app.delete("/clientes/:id", (req, res) => {
    const index = clientes.findIndex(cliente => cliente.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    clientes.splice(index, 1);
    res.json({ mensaje: "Cliente eliminado exitosamente" });
});


function buscarProductoPorId(id) {
    return productos.find(producto => producto.id === parseInt(id));
}

app.get("/productos", (req, res) => {
    res.json(productos);
});

app.get("/productos/:id", (req, res) => {
    const producto = buscarProductoPorId(req.params.id);
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json(producto);
});

app.put("/productos/:id", (req, res) => {
    const producto = buscarProductoPorId(req.params.id);
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    res.json(producto);
});

app.delete("/productos/:id", (req, res) => {
    const index = productos.findIndex(producto => producto.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    productos.splice(index, 1);
    res.json({ mensaje: "Producto eliminado exitosamente" });
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log("Servidor Express corriendo en el puerto", port);
});
