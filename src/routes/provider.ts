import { Router } from 'express';

import { Controller } from '../controllers/provider.controller';

const router = Router();

// /api/provider

router.post('/',Controller.createProvider);
router.get('/',Controller.getProviders);

// /api/provider/id
router.get('/:id',Controller.getProvider);
router.delete('/:id',Controller.deleteProvider);
router.put('/:id',Controller.updateProvider)


export default router;