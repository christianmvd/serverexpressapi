const fs = require('fs');



class Contenedor {
    constructor(nombreArchivo)
    {
        this.rutaArchivo = nombreArchivo;
       
    }
    

   async save(articulo)
    {
        let numeroid; //aqui almaceno el numero de id 
        //primero me fijo si existe el archivo productos.txt , si no lo encuentra va dar error entonces ejecuto en el catch el ingreso del primer articulo
        //de lo contrario traigo lo que ya esta ingresado y agrego el articulo a almacenar
            try{
                
                const archivo =  await fs.promises.readFile(this.rutaArchivo,'utf-8')
                    
           
                const datos = JSON.parse(archivo);
                 numeroid = datos.length + 1;
               
                 articulo.id = numeroid //agrego atributo id al objeto a agregar que paso por parametro
                 datos.push(articulo);
                 console.log(datos)
                 
                 await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(datos));
                 
                 
            }
            catch{
                const primerArt = [{
                        title: articulo.title,
                        price: articulo.price,
                        thumbnail: articulo.thumbnail,
                        id: 1
                         }]
                const crearArchivo = await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(primerArt))
                        
                
             }
             
             if (numeroid == undefined)
                numeroid = 1;
             return numeroid;
           
           
    }
    async getById(id)
    {
        let objetodev;
        try {
            const archivo = await fs.promises.readFile(this.rutaArchivo,'utf-8');
             
                 const objeto = JSON.parse(archivo);
                 for(let cont of objeto)
                 {
                     if (id == cont.id)
                     {
                       objetodev = cont;
                         
                     }

                 }
                
                 return objetodev;
             }
        catch {
            
            return "error";
        }
        
       
       


    }
    async getAll()
    {
        let datos = [];
        try {
            const archivo = await fs.promises.readFile('./productos.txt','utf-8');
            datos = JSON.parse(archivo);
            
        }
        catch{
            console.log("Error");
        }
        return datos;
    }
    async deleteById(id)
    {
        
        try {
            const archivo = await fs.promises.readFile(this.rutaArchivo,'utf-8');
                 let posicion;
                 const objeto = JSON.parse(archivo);
                 let a = objeto.map( function (articulo, index, array){
                        if(articulo.id == id)
                        {
                            posicion = index;
                        }
                       
                 })
                 
                 if (posicion != undefined) {
                    objeto.splice(posicion,1) //elimino el objeto literal del id correspondiente
                    await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(objeto));
                    }
                else
                {
                    console.log('id no encontrado');
                }
            }      
             
        catch {
            console.log("Error al quitar un objeto literal por id");
            
        }
    }

    async updateById(id,objetoupdate)
    {
        
        try {
            const archivo = await fs.promises.readFile(this.rutaArchivo,'utf-8');
                 let posicion;
                 const objeto = JSON.parse(archivo);
                 let a = objeto.map( function (articulo, index, array){
                        if(articulo.id == id)
                        {
                            posicion = index;
                        }
                       
                 })
                 
                 if (posicion != undefined) {
                   
                    objeto[posicion] = objetoupdate
                    await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(objeto));
                    }
                else
                {
                    console.log('id no encontrado');
                }
            }      
             
        catch {
            console.log("Error al quitar un objeto literal por id");
            
        }
    }

   async deleteAll()
    {
        try {
            const archivo = await fs.promises.readFile(this.rutaArchivo,'utf-8');
            let objeto = JSON.parse(archivo);
            objeto = []; //borro todo el contenido del array
           
            await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(objeto));


        }
        catch{
            console.log("Error al borrar todo");
        }
    }
}
module.exports = Contenedor;  //para exportar la clase y adquirirla del servidorexpress






    



