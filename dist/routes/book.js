"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
let multipart = require('connect-multiparty');
let md_upload = multipart({ uploadDir: './src/uploads' });
const router = (0, express_1.Router)();
// /api/book/
router.post('/', book_controller_1.Controller.createBook);
router.get('/', book_controller_1.Controller.getBooks);
// /api/book/:id
router.get('/:id', book_controller_1.Controller.getBook);
router.put('/:id', book_controller_1.Controller.updateBook);
router.delete('/:id', book_controller_1.Controller.deleteBook);
// /api/book/provider/:id
router.get('/provider/:providerid', book_controller_1.Controller.getAllBookByProvider);
// /api/img/:image
router.post('/img/:image', md_upload, book_controller_1.Controller.uploadImagen);
router.get('/img/:fileImagen', book_controller_1.Controller.viewImagen);
exports.default = router;
//# sourceMappingURL=book.js.map