import  Sequelize  from "sequelize";


import { sequelize } from '../database/database'

const Book = sequelize.define("books",{

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true 
    },
    booksname: {
        type: Sequelize.TEXT
    },
    edition: {
       type: Sequelize.INTEGER
    }, 
    years:{
        type: Sequelize.INTEGER
    },
    language:{
        type: Sequelize.TEXT
    },
    providerid: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.TEXT
    },
    publisher: {
        type: Sequelize.TEXT
    } 

},{ timestamps: false });

export default Book;