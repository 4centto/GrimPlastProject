const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const bodyParser = require("body-parser")
const nodemailer = require('nodemailer')
const { exec } = require('child_process')

const app = express()

//Conexion a nuextra db
const db = mysql.createPool({
    host: "bcszt5zxhmw2paaell6r-mysql.services.clever-cloud.com",
    user: "ucn78cjcfakruihj",
    password: "VxUWRWcAk7GKO4pt5XIS",
    database: "bcszt5zxhmw2paaell6r"
})

//Parser para poder obtener un JSON de salida de la consulta a la db
//
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Opcion get para obtener los datos del administrador
app.get("/get/admin", (req, res) => {
    db.query("SELECT * FROM Administrador", (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para modificar la informacion del administrador
app.post("/update/admin", (req, res) => {
    const password = req.body.password
    const correo = req.body.correo
    const token = req.body.token

    db.query("UPDATE Administrador SET password_admin = ?, token = ?, correo_administrador = ?", [password, token, correo], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion get para obtener los datos de los productos
app.get("/get/productos", (req, res) => {
    db.query("SELECT * FROM productos ORDER BY nombre_producto ASC", (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para obtener los datos de un producto en especifico
app.post("/get/producto", (req, res) => {

    const nombre = req.body.nombreProducto

    db.query("SELECT * FROM productos WHERE nombre_producto = ?", [nombre], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para modificar el producto
app.post("/update/producto", (req, res) => {

    //Recibimos los parametros
    const original = req.body.original
    const nombre = req.body.nombre
    const existencias = req.body.existencias
    const cantBolsa = req.body.cantBolsa
    const precio = req.body.precio

    //Los enviamos
    db.query("UPDATE productos SET nombre_producto = ?, bolsasactuales_producto = ?, cantidadporbolsa_producto = ?, precioindividual_producto = ? WHERE nombre_producto = ?", 
            [nombre, existencias, cantBolsa, precio, original], (err, responseOne) => {

        if(err){
            res.send(err)
        } else {

            db.query("UPDATE producto_mas_comprado SET nombre_producto = ? WHERE nombre_producto = ?", [nombre, original], (err, responseTwo) => {

                if(err){
                    res.send(err)
                } else {
                    res.send(responseTwo)
                }

            })

        }

    })

})

//Opcion para eliminar un producto
app.post("/delete/producto", (req, res) => {
    const nombre = req.body.nombre

    db.query("DELETE FROM productos WHERE nombre_producto = ?", [nombre], (err, responseOne) => {
        if(err){
            res.send(err)
        } else {
            
            db.query("DELETE FROM producto_mas_comprado WHERE nombre_producto = ?", [nombre], (err, responseTwo) => {

                if(err){
                    res.send(err)
                } else {
                    res.send(responseTwo)
                }

            })

        }
    })

})

//Opcion para agregar productos
app.post("/insert/producto", (req, res) => {

    const nombre = req.body.nombre
    const existencias = req.body.existencias
    const cantBolsa = req.body.cantBolsa
    const precio = req.body.precio

    db.query("INSERT INTO productos VALUES(?,?,?,?,?,?,?,?)", [0, 1, nombre, existencias, cantBolsa, precio, "null", "null"], (err, responseOne) => {
        if(err){
            res.send(err)
        } else {

            db.query("INSERT INTO producto_mas_comprado VALUES(?,?,?)", [1, nombre, 0], (err, responseTwo) => {

                if(err){
                    res.send(err)
                } else {
                    res.send(responseTwo)
                }

            })

        }
    })

})

//Opcion para obtener los productos
app.get("/get/productoMasComprado", (req, res) => {
    db.query("SELECT * FROM producto_mas_comprado", (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para obtener los clientes
app.get("/get/clienteMasCompro", (req, res) => {
    db.query("SELECT * FROM cliente_mas_compro", (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para obtener los apartados
app.get("/get/apartados", (req, res) => {
    db.query("SELECT * FROM apartados ORDER BY id_apartado DESC", (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para obtener los datos de un apartado
app.post("/get/apartado", (req, res) => {

    const id = req.body.id

    db.query("SELECT * FROM apartados WHERE id_apartado = ?", [id], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para cancelar un apartado
app.post("/delete/apartado", (req, res) => {

    const id = req.body.id

    db.query("DELETE FROM apartados WHERE id_apartado = ?", [id], (err, response) => {

        if(err){
            res.send(err)
        } else {
            res.send(response)
        }

    })

})

//Opcion para concluir el apartado

/**
 * 1. Actualizar el inventario
 * 2. Actrualizar las stats de los productos
 * 3. Actualizar el los stats del cliente
 */

app.post("/actualizarInventario", (req, res) => {

    const producto = req.body.producto
    const cantidad = req.body.cantidad

    db.query("UPDATE productos SET bolsasactuales_producto = bolsasactuales_producto - ? WHERE nombre_producto = ?", [ cantidad, producto ], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opccion para actualizar los stats de los productos
app.post("/actualizarStats", (req, res) => {

    const producto = req.body.producto
    const cantidad = req.body.cantidad

    db.query("UPDATE producto_mas_comprado SET cantidad_producto = cantidad_producto + ? WHERE nombre_producto = ?", [ cantidad, producto ], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para actualizar los stats del cliente
app.post("/actualizarStatsCliente", (req, res) => {

    const cliente = req.body.cliente
    const total = req.body.total

    db.query("UPDATE cliente_mas_compro SET cantidad_cliente = cantidad_cliente + ? WHERE nombre_cliente = ?", [total, cliente], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para obtener todos los clientes validados
app.get("/get/clientes", (req, res) => {
    db.query("SELECT * FROM clientes WHERE cliente_verificado = 'true' ORDER BY nombre_cliente ASC", (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para obtener los clientes no validados
app.get("/get/clientesnovalidados", (req, res) => {
    db.query("SELECT * FROM clientes WHERE cliente_verificado = 'false' ORDER BY nombre_cliente ASC", (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para validar al cliente
app.post("/validate/client", (req, res) => {
    const nombre = req.body.nombre
    const correo = req.body.correo

    db.query("UPDATE clientes SET cliente_verificado = 'true' WHERE nombre_cliente = ? AND correo_cliente = ?", [nombre, correo], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para eliminar un cliente
app.post("/delete/cliente", (req, res) => {
    const correo = req.body.correo

    db.query("DELETE FROM clientes WHERE correo_cliente = ?", [ correo ], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para eliminar un cliente de los stats
app.post("/delete/clienteStats", (req, res) => {
    const nombre = req.body.nombre

    db.query("DELETE FROM cliente_mas_compro WHERE nombre_cliente = ?", [ nombre ], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para agregar un apartado
app.post("/insert/apartado", (req, res) => {
    const correo = req.body.correo
    const productos = req.body.productos
    const cantidades = req.body.cantidades
    const total = req.body.total
    const fecha = req.body.fecha
    const hora = req.body.hora
    const nombre = req.body.nombre
    const comentarios = req.body.comentarios

    db.query("INSERT INTO apartados VALUES(?,?,?,?,?,?,?,?,?)", [0, correo, productos, cantidades, total, fecha, hora, nombre, comentarios], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para obtener los datos de un cliente
app.post("/get/cliente/registro/nombre", (req, res) => {

    const nombre = req.body.nombre

    db.query("SELECT * FROM clientes WHERE nombre_cliente = ?", [ nombre ], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para obtener los datos de un cliente por el correo
app.post("/get/cliente/registro/correo", (req, res) => {

    const correo = req.body.correo

    db.query("SELECT * FROM clientes WHERE correo_cliente = ?", [ correo ], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para insertar un nuevo cliente
app.post("/insert/cliente", (req, res) => {

    const nombre = req.body.nombre
    const correo = req.body.correo
    const password = req.body.password

    db.query("INSERT INTO clientes VALUES(?,?,?,?,?)", [0, nombre, correo, password, "false"], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para insertar un clinete a los stats
app.post("/insert/clienteMasCompro", (req, res) => {

    const nombre = req.body.nombre

    db.query("INSERT INTO cliente_mas_compro VALUES(?,?)", [ nombre, 0 ], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })

})

//Opcion para insertar el token del administrador
app.post("/insert/token", (req, res) => {
    const token = req.body.token
    db.query("UPDATE Administrador SET token = ?", [token], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para obtener el token del administrador
app.get("/get/token", (req, res) => {
    db.query("SELECT token FROM Administrador", (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

//Opcion para enviar un correo electronico
app.post("/send/mail", (req, res) => {

    const titulo = req.body.titulo
    const mensaje = req.body.mensaje

    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'grimplast2021@gmail.com',
                pass: 'rmcsdhkunojylpcs'
        }
    })

    db.query("SELECT correo_administrador FROM Administrador", (err, response) => {
        if(err){
            res.send(err)
        } else {

            //Creamos las opciones de correo
            var mailOptions = {
                from: 'GrimPlastAPP <grimplast2021@gmail.com>',
                to: response[0].correo_administrador,
                subject: titulo,
                html: " <div style='width: 100%; height: 200px; background-color: rgb(110, 0, 74); border-radius: 20px; display: flex; text-align: center;" +
                        "align-items: center; justify-content: center;'>" +
                        "<div style='width: 100%; height: 180px; margin: 10px; text-align: center; position: relative;'>" +
                            "<p style='font-family: sans-serif; font-weight: bold; font-size: 30px; color:  white;'>" +
                                titulo +
                            "</p>" +
                            "<p style='color: white; font-size: 24px;' >" + 
                                mensaje + 
                            "</p>" +
                        "</div>" +
                    "</div>"
            }

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    res.send(error)
                } else {
                    res.send('Email enviado: ' + info.response);
                }
            })

        }
    })
})

//Opcion para cambiar de contraseña
app.post("/update/password", (req, res) => {
    const nueva = req.body.password
    db.query("UPDATE Administrador SET password_admin = ?", [nueva], (err, response) => {
        if(err){
            res.send(err)
        } else {
            res.send(response)
        }
    })
})

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log("Running on port: " + port)
})