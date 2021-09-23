"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// import  bodyparse  from 'body-parser';
//Importin routes
const book_1 = __importDefault(require("./routes/book"));
const provider_1 = __importDefault(require("./routes/provider"));
// initialization
const app = (0, express_1.default)();
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, express_1.json)());
app.use(express_1.default.urlencoded({ extended: true }));
//  app.use(bodyparse.urlencoded({extended:false}));
//  app.use(bodyparse.json());
//routes
app.use('/api/book', book_1.default);
app.use('/api/provider', provider_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map