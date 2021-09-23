"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database/database");
const Book = database_1.sequelize.define("books", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    booksname: {
        type: sequelize_1.default.TEXT
    },
    edition: {
        type: sequelize_1.default.INTEGER
    },
    years: {
        type: sequelize_1.default.INTEGER
    },
    language: {
        type: sequelize_1.default.TEXT
    },
    providerid: {
        type: sequelize_1.default.INTEGER
    },
    image: {
        type: sequelize_1.default.TEXT
    },
    publisher: {
        type: sequelize_1.default.TEXT
    }
}, { timestamps: false });
exports.default = Book;
//# sourceMappingURL=bookmodel.js.map