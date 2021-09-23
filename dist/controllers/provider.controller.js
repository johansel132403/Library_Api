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
exports.Controller = void 0;
// import  Sequelize  from 'sequelize';
const provider_herpers_1 = require("../helpers/provider.herpers");
//model
const providermodel_1 = __importDefault(require("../models/providermodel"));
exports.Controller = {
    //Metodo para crear un provedor 
    createProvider: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, lastname, email, password } = req.body;
            if (name && lastname && email && password) {
                //Aqui vemos de que el emai ya no este registrado...
                provider_herpers_1.Functions.checkEmail(email, res);
                //Aqui creamos los provedores  
                const newProvider = yield providermodel_1.default.create({
                    name,
                    lastname,
                    email,
                    password
                }, {
                    fields: ["name", "lastname", "email", "password"]
                });
                if (newProvider) {
                    return res.status(200).json({
                        message: 'Provider created successfully',
                        data: newProvider
                    });
                }
            }
            else {
                return res.status(200).json({ Error: 'There are empty field' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ Error: 'Server Error', data: {} });
        }
    }),
    //Metodo para obtener todos los provedores
    getProviders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getProvs = yield providermodel_1.default.findAll({ raw: true });
            if (getProvs.length >= 1) {
                return res.status(200).json({
                    data: getProvs,
                });
            }
            else {
                return res.status(200).json({
                    Error: "There is no data"
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                Error: "Server Error"
            });
        }
    }),
    //Metodo para obtener un provedor, tenemos que pasarle un (id)
    getProvider: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (id >= 1) {
                const OneProvider = yield providermodel_1.default.findOne({
                    where: {
                        id
                    }
                });
                if (OneProvider) {
                    return res.status(200).json({
                        data: OneProvider
                    });
                }
                else {
                    return res.status(200).json({
                        error: 'This provider does not exist'
                    });
                }
            }
            else {
                console.log(typeof id);
                return res.status(200).json({ error: "There is no provider" });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ Error: 'Server Error' });
        }
    }),
    //Metodo para eliminar un provedor ...
    deleteProvider: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (id >= 1) {
            }
            const deleteRowCount = yield providermodel_1.default.destroy({
                where: {
                    id
                }
            });
            return res.status(200).json({
                count: deleteRowCount,
                message: 'Provider Deleted successfully'
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ Error: 'Server Error' });
        }
    }),
    //Metodo para actualizar un provedor...
    updateProvider: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let error = false;
        let err = '';
        const { name, lastname, email, password } = req.body;
        provider_herpers_1.Functions.checkUpdateEmail(email, res, id);
        const updateProvider = yield providermodel_1.default.findAll({
            attributes: ['id', 'name', 'lastname', 'email', 'password'],
            where: {
                id
            }
        });
        if (updateProvider.length > 0) {
            updateProvider.forEach((provider) => __awaiter(void 0, void 0, void 0, function* () {
                yield provider.update({
                    name,
                    lastname,
                    email,
                    password
                });
            }));
        }
        return res.status(200).json({
            message: 'Project Updated Successfully',
            data: updateProvider
        });
    }),
};
//# sourceMappingURL=provider.controller.js.map