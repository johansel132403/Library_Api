"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provider_controller_1 = require("../controllers/provider.controller");
const router = (0, express_1.Router)();
// /api/provider
router.post('/', provider_controller_1.Controller.createProvider);
router.get('/', provider_controller_1.Controller.getProviders);
// /api/provider/id
router.get('/:id', provider_controller_1.Controller.getProvider);
router.delete('/:id', provider_controller_1.Controller.deleteProvider);
router.put('/:id', provider_controller_1.Controller.updateProvider);
exports.default = router;
//# sourceMappingURL=provider.js.map