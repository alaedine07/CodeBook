import { Command } from "commander";
import { serve } from 'local-api';
import path from "path";

interface ILocalApiError {
    code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
    .command('serve [Filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action(async (filename: string = 'notebook.js', options: {port: string}) => {
        const isLocalApiError = (err: any): err is ILocalApiError => {
            return typeof err.code === "string";
        };
        try {
                const dir = path.join(process.cwd(), path.dirname(filename));
                await serve(parseInt(options.port), filename, dir, !isProduction);
                console.log(
                    `Opened ${filename}. Navigate to http://localhost:${options.port} to edit file.`
                );
        } catch (err) {
            if (isLocalApiError(err)) {
                if (err.code === "EADDRINUSE") {
                    console.error("Port is in use. Try running on a different port.");
                }
            } else if (err instanceof Error) {
                console.log("Heres the problem", err.message);
            }
            process.exit(1);
        }
    });
