import { Router } from 'express';

import { Controller } from '../controllers/book.controller';


let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir:'./src/uploads'});


const router = Router();

// /api/book/
router.post('/',Controller.createBook);
router.get('/',Controller.getBooks);

// /api/book/:id
router.get('/:id',Controller.getBook);
router.put('/:id',Controller.updateBook);
router.delete('/:id',Controller.deleteBook);

// /api/book/provider/:id

router.get('/provider/:providerid',Controller.getAllBookByProvider);

// /api/img/:image
router.post('/img/:image',md_upload,Controller.uploadImagen);
router.get('/img/:fileImagen',Controller.viewImagen);








export default router;