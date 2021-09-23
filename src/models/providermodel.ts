import  Sequelize  from "sequelize";

import{ sequelize } from "../database/database"

import Book from "./bookmodel";


const UserProvider = sequelize.define("providersusers",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    name: {
        type: Sequelize.TEXT
    },
    lastname: {
        type: Sequelize.TEXT

    },
    email: {
         type: Sequelize.TEXT
    }, 
    password: {
        type: Sequelize.TEXT
    }

},{
    //esto es para que no tenga problema con las fechas 
    timestamps: false
});

UserProvider.hasMany(Book, { foreignKey: "providerid", sourceKey: "id"});
Book.belongsTo(UserProvider,{ foreignKey: "providerid", sourceKey: "id"})


export default UserProvider;