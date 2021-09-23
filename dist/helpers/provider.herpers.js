"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Functions = void 0;
const providermodel_1 = __importDefault(require("../models/providermodel"));
//Metodo para validar el email 
exports.Functions = {
    //Metodo para ver si el Email esta registrado ....
    checkEmail: (email, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (email) {
            //Aqui vemos todos los emial de la base de datos 
            const findEmail = yield providermodel_1.default.findAll({
                attributes: ["email"],
                raw: true,
            });
            let error = '';
            findEmail.forEach((element) => {
                if (element.email.toLowerCase() == email.toLowerCase()) {
                    error = 'Error: This Email is already registered';
                }
            });
            if (error != '') {
                return res.status(200).json({ error });
            }
        }
    }),
    //A la hora de actualizar un provedor nos aseguramos de que el email no este registrado ya ....
    checkUpdateEmail: (email, res, id) => __awaiter(void 0, void 0, void 0, function* () {
        let error = false;
        let err = '';
        const response = yield providermodel_1.default.findAll({
            raw: true,
            attributes: ['id', 'email']
        });
        response.forEach((element) => {
            if (element && element.id != id) {
                if (element.email.toLowerCase() == email.toLowerCase()) {
                    console.log(element, '/', id);
                    error = true;
                    err = 'This email already exists';
                }
            }
        });
        if (error) {
            return res.status(200).json({ err });
        }
    })
};
//# sourceMappingURL=provider.herpers.js.map