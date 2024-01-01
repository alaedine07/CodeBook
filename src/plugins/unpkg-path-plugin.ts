import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {

            // on resolve will be called once esbuild is trying to
            // figure out a path to a particular module

            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                // handle root entry file of 'index.js'
                return { path: 'index.js', namespace: 'a'};
            });

            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                // handle relative paths in a module
                return {
                    namespace: 'a',
                    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                };
            });

            build.onResolve({ filter: /.*/ }, async (args: any) => {
                // handle main file of a module
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                };
            });
        },
    };
};
