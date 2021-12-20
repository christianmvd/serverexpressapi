const express = require('express')
const { Router } = express

const app = express()
const router = Router()

const puerto = 8080;

const  Contenedor = require('./Contenedor.js'); //clase contenedor con los metodos para agregar / almacenar / eliminar articulos
let contenedor = new Contenedor('./productos.txt');

const server = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})

server.on("error", error => console.log(`Ha ocurrido un error con el servidor con la siguiente descripcion: ${error}`))

app.use('/api/productos', router)
app.use(express.static('public'))
router.use(express.json())
router.use(express.urlencoded({extended:true}))


router.get('/listarTodo', (req,res) => {
    const productos = contenedor.getAll()
    .then((productos) => res.send(productos))
    .catch(() => console.log("Error al buscar los articulos"))
})

router.get('/listarArticulo/:id', (req,res) => {
    const productos = contenedor.getById(req.params.id)
    .then((productos) => {
        res.send(productos)})
    .catch(() => console.log(`Error al buscar el articulo con el id: ${req.params.id} `))
})


router.post('/guardar', (req,res) => {
    contenedor.save(req.body) //recibo por post el registro a agregar, uso el metodo SAVE de mi clase contenedor que vengo usando de antes para almacenar
   .then((id) => contenedor.getById(id))
   .then((objetoliteral) => res.send(objetoliteral))
   .catch(() => console.log('Ha ocurrido un error al almacenar un nuevo articulo'))
   
})

router.put('/actualizar/:id', (req,res) => {
    contenedor.getById(req.params.id)  //recibo el ID del articulo a actualizar, le coloco los datos de los parametros de postman y luego almaceno los cambios con el metodo updatebyid el cual agregue en contenedor.js
    .then((objeto) => {
        objeto.title = req.body.title
        objeto.price = req.body.price
        objeto.thumbnail = req.body.thumbnail
        contenedor.updateById(req.params.id,objeto) //para actualizar en el archivo productos.txt paso como parametro el ID y el objeto literal con los cambios ya colocados segun los parametros de postman
        res.send(objeto)
    })
    .catch(() => console.log('Error al traer el articulo por el ID'))
})

router.delete('/borrar/:id', (req,res) => {
    contenedor.deleteById(req.params.id)
    .then(() => {
        console.log('Articulo eliminado con exito!')
        const objeto = contenedor.getAll()
        .then((objeto) => res.send(objeto)) //despliego todos los articulos para verificar que se haya eliminado el articulo elegido
        
    })
    .catch(() => {
        console.log('Ha ocurrido un error al eliminar el articulo')
    })
    

})




