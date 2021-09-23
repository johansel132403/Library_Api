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
// model
const bookmodel_1 = __importDefault(require("../models/bookmodel"));
// esto nos ayuda a trabajar con los archivos
var fs = require('fs');
var path = require('path');
exports.Controller = {
    //Este metodo es para crear un libro,en este metodo le pasamos el (id) del provedor (providerid)
    createBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { booksname, edition, years, language, providerid, image, publisher } = req.body;
            if (booksname && edition && years && language && providerid && image && publisher) {
                //VALIDAMOS DE QUE EL PROVIDERID NO ESTE VACIO
                const resultBook = yield bookmodel_1.default.findAll({
                    where: { providerid }
                });
                if (resultBook != '') {
                    const createBook = yield bookmodel_1.default.create({
                        booksname,
                        edition,
                        years,
                        language,
                        providerid,
                        image,
                        publisher
                    }, {
                        fields: ['booksname', 'edition', 'years', 'language', 'providerid', 'image', 'publisher']
                    });
                    res.json({
                        message: 'New book created',
                        data: createBook
                    });
                }
                else {
                    return res.status(500).json({ Error: 'Provider does not exist' });
                }
            }
            else {
                return res.status(500).json({ Error: 'All input are required' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ Error: 'Server Error' });
        }
    }),
    //Este metodo nos devuelve un libro,hay que pasarle un id
    getBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (id > 0) {
                const getOneBook = yield bookmodel_1.default.findOne({
                    where: {
                        id
                    },
                    attributes: ['booksname', 'edition', 'years', 'language', 'providerid', 'image', 'publisher']
                });
                return res.status(200).json({
                    data: getOneBook
                });
            }
            else {
                return res.status(200).json({
                    Error: 'URL error'
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ Error: 'Server Error' });
        }
    }),
    //Este metodo nos devuelve todos los libros que estan registrado
    getBooks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield bookmodel_1.default.findAll({
                row: true,
                attributes: ['id', 'booksname', 'edition', 'years', 'language', 'providerid', 'image', 'publisher'],
                order: [
                    ['id', 'DESC']
                ]
            });
            // Validamos de que hayan libros
            if (book.length > 0) {
                return res.status(200).json({
                    data: book
                });
            }
            else {
                return res.status(200).json({ message: 'There are no books' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ Error: 'Server Error' });
        }
    }),
    //Este metodo nos ayuda actualizar un libro en especifico
    updateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (id > 0) {
                const { booksname, edition, years, language, providerid, image, publisher } = req.body;
                const updBook = yield bookmodel_1.default.update({
                    booksname,
                    edition,
                    years,
                    language,
                    providerid,
                    image,
                    publisher
                }, {
                    where: { id }
                });
                return res.status(200).json({
                    message: 'Book updated',
                    updBook
                });
            }
            else {
                return res.status(200).json({
                    message: 'URL error'
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ Error: 'Server Error' });
        }
    }),
    //Eliminar un libro en especifico
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (id > 0) {
                const deleteBook = yield bookmodel_1.default.destroy({
                    where: {
                        id
                    }
                });
                return res.status(200).json({
                    deletecount: deleteBook,
                    message: 'Book deleted successfully'
                });
            }
            else {
                return res.status(200).json({ message: 'URL error' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ Error: 'URL error' });
        }
    }),
    //Con este metodo podemos tener todos los libros de un provedor, solo con el (id) del provedor 
    getAllBookByProvider: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const providerid = parseInt(req.params.providerid);
            if (providerid > 0) {
                const books = yield bookmodel_1.default.findAll({
                    attributes: ['booksname', 'edition', 'years', 'language', 'providerid', 'image', 'publisher'],
                    where: { providerid }
                });
                return res.status(200).json({
                    data: books
                });
            }
            else {
                return res.status(200).json({ Error: 'URL error' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                Error: 'Server Error'
            });
        }
    }),
    //Metodo para subir una imagen
    uploadImagen: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { image } = req.body;
        var id = req.params.image;
        if (req.files.image) {
            var file_path = req.files.image.path;
            // Aqui obtenemos el nombre de la imagen
            var file = file_path.split('\\');
            var file_name = file[file.length - 1];
            // Aqui obteemos el formato de la imagen 
            var file_formato = file_name.split('\.');
            var formato = file_formato[file_formato.length - 1];
            //Aqui validamos el formato de las fotos
            if (formato == 'png' || formato == 'PNG' || formato == 'GIF' || formato == 'gif' || formato == 'JPG' || formato == 'jpg' || formato == 'JPGE' || formato == 'jpge') {
                const img = yield bookmodel_1.default.update({
                    image: file_name
                }, {
                    where: { id },
                });
                //Validamos de que la foto se haya subido...
                if (img == 1) {
                    return res.status(200).json({ messange: 'Image uploaded successfully' });
                }
                else {
                    return res.status(200).json({ messange: 'The image could not be uploaded' });
                }
            }
            else {
                return exports.Controller.BorrarArchivo(res, file_path, 'Error con el formato');
            }
        }
        else {
            return res.status(404).send({ Mensaje: 'Server Error' });
        }
    }),
    //Este metodo nos permite no subir archivos no deseados ...
    BorrarArchivo: (res, file_path, mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        fs.unlink(file_path, (err) => {
            return res.status(200).send({ Mensaje: mensaje });
        });
    }),
    // Con este metodo podemos ver la imagen subida 
    viewImagen: function (req, res) {
        var file_imagen = req.params.fileImagen;
        var file_path = './src/uploads/' + file_imagen;
        fs.exists(file_path, (exist) => {
            if (exist) {
                return res.sendFile(path.resolve(file_path));
            }
            else {
                return res.status(404).send({ Mensaje: 'The image does not exist' });
            }
        });
    }
};
//# sourceMappingURL=book.controller.js.map