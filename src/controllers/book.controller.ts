
import { Request, Response } from "express";

// model
import Book from "../models/bookmodel";

// esto nos ayuda a trabajar con los archivos
var fs = require('fs');
var path = require('path');

export const Controller = {

    //Este metodo es para crear un libro,en este metodo le pasamos el (id) del provedor (providerid)
    createBook: async (req: Request, res: Response) => {

        try {
            const { booksname,edition,years,language,providerid,image,publisher } = req.body;

            if( booksname && edition && years && language && providerid && image && publisher ){

                //VALIDAMOS DE QUE EL PROVIDERID NO ESTE VACIO
                const resultBook = await Book.findAll({
                    where: {providerid}
                })
    
                if( resultBook != ''){
                    const createBook =  await Book.create({
                     booksname,
                     edition,
                     years,
                     language,
                     providerid,
                     image,
                     publisher
             
                    },{
                        fields:['booksname','edition','years','language','providerid','image','publisher']
                    });
             
                    res.json({
                        message: 'New book created',
                        data:createBook
                     
                     });
    
                }else{
                    return res.status(500).json({Error:'Provider does not exist'});
                }
            }else{
                return res.status(500).json({Error:'All input are required'});
            }

            
        } catch (error) {

            console.log(error);
            return res.status(500).json({Error:'Server Error'});
            
        }

    },

    //Este metodo nos devuelve un libro,hay que pasarle un id
    getBook: async (req: Request, res: Response) => {

        try {

            const id = parseInt(req.params.id)

            if( id > 0 ){

                const getOneBook = await Book.findOne({
                    where: {
                        id
                    },
                    attributes: ['booksname','edition','years','language','providerid','image','publisher']
                });

                return res.status(200).json({
                    data: getOneBook
                })
            }else{
                return res.status(200).json({
                    Error:'URL error'
                })
            }

            
        } catch (error) {


            console.log(error)
            return res.status(500).json({Error:'Server Error'});
            
        }

    },

    //Este metodo nos devuelve todos los libros que estan registrado
    getBooks: async (req: Request, res: Response) => {
           
        try {

            const book: [] =  await Book.findAll({
                row:true,
                attributes:['id','booksname','edition','years','language','providerid','image','publisher'],
                order:[
                    ['id','DESC']
                ]
            })
             // Validamos de que hayan libros
            if( book.length > 0){
                return res.status(200).json({
                    data: book
                })

            }else{
                return res.status(200).json({message:'There are no books'})
            }

            
        } catch (error) {
            console.log(error);
            return res.status(500).json({Error: 'Server Error'})
        }

    },
    //Este metodo nos ayuda actualizar un libro en especifico
    updateBook: async (req: Request, res: Response) => {

        try {

            const  id  = parseInt(req.params.id)
              
            if(id > 0){

                const { booksname, edition, years, language, providerid, image, publisher } = req.body;
            
              const updBook =  await Book.update({
                    booksname,
                    edition,
                    years,
                    language,
                    providerid,
                    image,
                    publisher
                },{
                    where: {id}
                });

                return res.status(200).json({
                    message:'Book updated',
                    updBook
                })

            }else{
                return res.status(200).json({
                    message:'URL error'
                })
            }



            
        } catch (error) {
            console.log(error)
            return res.status(500).json({Error:'Server Error'})
        }

    },
    //Eliminar un libro en especifico
    deleteBook: async (req: Request, res: Response) => {

        try {

            const  id  = parseInt(req.params.id);

            if(id > 0){

                const deleteBook = await Book.destroy({
                    where:{
                        id
                    }
                });

                return res.status(200).json({
                    deletecount: deleteBook,
                    message:'Book deleted successfully'
                });
            }else{
                return res.status(200).json({message:'URL error'})
            }

            
        } catch (error) {

            console.log(error)
            return res.status(500).json({Error:'URL error'})
            
        }
    },
    //Con este metodo podemos tener todos los libros de un provedor, solo con el (id) del provedor 
    getAllBookByProvider: async (req: Request, res: Response) => {

        try {
            const providerid = parseInt(req.params.providerid);

            if( providerid > 0 ){

                const books = await Book.findAll({
                    attributes: ['booksname','edition','years','language','providerid','image','publisher'],
                    where: {providerid}
                })

                return res.status(200).json({
                    data:books
                })
            }else{
                return res.status(200).json({Error:'URL error'})
            }
            
        } catch (error) {
           console.log(error)
           return res.status(500).send({
               Error:'Server Error'
           }) 
        }

    },
    //Metodo para subir una imagen
    uploadImagen: async (req: any, res: Response) =>{

    const { image } = req.body;

    var id = req.params.image;
    

    if(req.files.image){

        


        var file_path = req.files.image.path;
        // Aqui obtenemos el nombre de la imagen
        var file = file_path.split('\\');
        var file_name = file[file.length -1];
       
        // Aqui obteemos el formato de la imagen 
        var file_formato = file_name.split('\.');
        var formato = file_formato[file_formato.length -1];

         
         //Aqui validamos el formato de las fotos
        if(formato == 'png' || formato == 'PNG' || formato == 'GIF' || formato == 'gif' || formato == 'JPG' || formato == 'jpg' || formato == 'JPGE' || formato == 'jpge'){


            const img =  await Book.update({
                
                image:file_name
               
            },{
                where: { id },
               
            });
                //Validamos de que la foto se haya subido...
               if(img == 1){
                   return res.status(200).json({messange:'Image uploaded successfully'})
               }else{
                return res.status(200).json({messange:'The image could not be uploaded'})

               }
        }else{

            return Controller.BorrarArchivo(res,file_path, 'Error con el formato');
        }

    }else{
        return res.status(404).send({Mensaje:'Server Error'});
    }

   
    },

    //Este metodo nos permite no subir archivos no deseados ...
    BorrarArchivo: async (res:any, file_path:any, mensaje:any) => {
        fs.unlink(file_path,(err:any)=>{
            return res.status(200).send({Mensaje:mensaje});
        })
    },
     // Con este metodo podemos ver la imagen subida 
    viewImagen: function(req:Request,res:Response){

        var file_imagen = req.params.fileImagen;
        var file_path = './src/uploads/'+file_imagen;

        fs.exists(file_path,(exist:any)=>{
             
            if(exist){
               
                return res.sendFile(path.resolve(file_path));
            }else{
                return res.status(404).send({Mensaje:'The image does not exist'});
            }
        });
    }



}

