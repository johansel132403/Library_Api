"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database/database");
const bookmodel_1 = __importDefault(require("./bookmodel"));
const UserProvider = database_1.sequelize.define("providersusers", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.TEXT
    },
    lastname: {
        type: sequelize_1.default.TEXT
    },
    email: {
        type: sequelize_1.default.TEXT
    },
    password: {
        type: sequelize_1.default.TEXT
    }
}, {
    //esto es para que no tenga problema con las fechas 
    timestamps: false
});
UserProvider.hasMany(bookmodel_1.default, { foreignKey: "providerid", sourceKey: "id" });
bookmodel_1.default.belongsTo(UserProvider, { foreignKey: "providerid", sourceKey: "id" });
exports.default = UserProvider;
//# sourceMappingURL=providermodel.js.map