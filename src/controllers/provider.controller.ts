
import {Request, Response } from 'express';

// import  Sequelize  from 'sequelize';

import  {Functions} from '../helpers/provider.herpers';

//model
import  UserProvider  from '../models/providermodel';


export let Controller = {

 //Metodo para crear un provedor 
  createProvider: async (req: Request, res: Response) => {
      

       try {
           const {name, lastname, email, password } = req.body; 


           if( name && lastname && email  && password ){


            //Aqui vemos de que el emai ya no este registrado...
            Functions.checkEmail( email, res )
                     //Aqui creamos los provedores  
                    const newProvider =  await UserProvider.create({
                        name,
                        lastname,
                        email,
                        password
                    },{
                        fields: ["name", "lastname", "email", "password"]
                
                    });
            
                    if( newProvider ){
                        return res.status(200).json({
                            message:'Provider created successfully',
                            data: newProvider
                        })
                }
    
           }else{
               return res.status(200).json({Error:'There are empty field'})
           }
           
           
       } catch (error) {
           console.log(error)
           return res.status(500).json({Error: 'Server Error', data: {}})
           
       }

  }, 
  
  //Metodo para obtener todos los provedores
  getProviders: async ( req: Request, res: Response ) => {

    try {
        const getProvs: [] = await UserProvider.findAll( { raw:true } )
     
     
        if( getProvs.length >= 1  ){
     
            return res.status(200).json({
                data:getProvs,
                
          });
        }else{
            return res.status(200).json({
                Error: "There is no data"
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Error: "Server Error"
        });
    }
      
  },
   
   //Metodo para obtener un provedor, tenemos que pasarle un (id)
   getProvider: async ( req: Request, res: Response ) => {

    try {
        
        const  id  = parseInt(req.params.id);
     
    
        if(  id >= 1 ){
    
            const OneProvider = await UserProvider.findOne({
                 where: {
                     id
                 }
             })
        
                   
             if( OneProvider ){
                 
                return res.status(200).json({
                    data:OneProvider
                });
             }else{
                 return res.status(200).json({
                     error:'This provider does not exist'
                  
                 });
             }
            
        }else{
            console.log(typeof id )
            return res.status(200).json({error:"There is no provider"})
    
        }
    } catch (error) {

        console.log(error)
        return res.status(500).send({Error: 'Server Error'});
        
    }

    


   },

   //Metodo para eliminar un provedor ...
   deleteProvider: async (req: Request, res: Response) => {


    try {
        const  id  = parseInt(req.params.id);
         
        
        if(  id >= 1 ){
        }
    
       const deleteRowCount =  await UserProvider.destroy({
            where: {
                id
            }
        });

        return res.status(200).json({
            count: deleteRowCount,
            message: 'Provider Deleted successfully'
        })
    
        
    } catch (error) {

        console.log(error)
        return res.status(500).send({Error: 'Server Error'})
        
    }

  },

   //Metodo para actualizar un provedor...
   updateProvider: async ( req: Request, res: Response) => { 

       const { id } = req.params;

      let   error = false;
     
      let err = '';

       const { name, lastname, email, password } = req.body;

       Functions.checkUpdateEmail(email,res,id)

       const updateProvider = await UserProvider.findAll({
           attributes:['id','name','lastname','email','password'],
           where: {
               id
           }
       });

       if(updateProvider.length > 0 ){
            
        updateProvider.forEach( async (provider:any) => {
            await provider.update({
                name,
                lastname,
                email,
                password
            })
        });

       }

       return res.status(200).json({
           message:'Project Updated Successfully',
           data: updateProvider
       })
   }, 

}

