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
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    const fullPath = path_1.default.join(dir, filename);
    router.use(express_1.default.json());
    router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const isLocalApiError = (err) => {
            return typeof err.code === "string";
        };
        try {
            // read the file
            const result = yield promises_1.default.readFile(fullPath, { encoding: 'utf-8' });
            res.send(JSON.parse(result));
        }
        catch (err) {
            if (isLocalApiError(err)) {
                // error no entity
                if (err.code === 'ENOENT') {
                    // Add code to create a file and add default cells
                    yield promises_1.default.writeFile(fullPath, '[]', 'utf-8');
                    res.send([]);
                }
                else {
                    throw err;
                }
            }
        }
    }));
    router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const cells = req.body.cells;
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({ status: 'OK' });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
