import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface ICell {
    id: string,
    content: string,
    type: 'text' | 'code'
}

interface ILocalApiError {
    code: string;
  }

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();
    const fullPath = path.join(dir, filename);
    router.use(express.json());

    router.get('/cells', async (req, res) => {
        const isLocalApiError = (err: any): err is ILocalApiError => {
            return typeof err.code === "string";
        };
        try {
            // read the file
            const result = await fs.readFile(fullPath, { encoding: 'utf-8'});
            res.send(JSON.parse(result));
        } catch (err) {
            if (isLocalApiError(err)) {
                // error no entity
                if (err.code === 'ENOENT') {
                    // Add code to create a file and add default cells
                    await fs.writeFile(fullPath, '[]', 'utf-8');
                    res.send([]);
                } else {
                    throw err;
                }
            }
        }
    });

    router.post('/cells', async (req, res) => {
        const cells: Array<ICell> = req.body.cells;
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({status: 'OK'});
    });

    return router;
}
