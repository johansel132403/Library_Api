
import UserProvider from "../models/providermodel";


  //Metodo para validar el email 
export const Functions = {

    //Metodo para ver si el Email esta registrado ....
     checkEmail: async (email:any,res:any) => {
    
        if( email  ){
    
            //Aqui vemos todos los emial de la base de datos 
           const findEmail = await UserProvider.findAll({
               attributes: ["email"],
               raw:true,
            });
    
                 let error = '';
            
                findEmail.forEach((element:any) => {
                    
                        if(element.email.toLowerCase() == email.toLowerCase()){
                            error = 'Error: This Email is already registered';
                        }
                    });
    
                        if(error != ''){
                            return res.status(200).json({error})
                        }

    }
    
    
    },

     //A la hora de actualizar un provedor nos aseguramos de que el email no este registrado ya ....
    checkUpdateEmail: async (email:any, res:any, id:any) => {

        
      let   error = false;
     
      let err = '';

       const response = await UserProvider.findAll({
        raw:true,
        attributes:['id','email']
        
    });

    response.forEach((element:any) => {

        
        if(element && element.id != id){
            
            if(element.email.toLowerCase() ==  email.toLowerCase()){
                console.log(element,'/',id)
                error = true;
              err = 'This email already exists';
            }
        }
        
    });

        if(error){
            
            return res.status(200).json({err});
        }

    }




}


  