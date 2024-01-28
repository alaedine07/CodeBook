# Introduction 👋
CodeBook is a ReactJS-based SPA designed to facilitate the creation of documentation or tutorials. Users can add content in the form of text cells with markup language and code cells with JavaScript. The application supports live previews for both code and text cells, providing a seamless experience for users to visualize the output of their work in real-time.

# Technical 👨‍💻
CodeBook is currently a organized as monorepo managed by lerna which enable us to structure the project as a collection of packages. This facilitates
code Sharing, versioning and streamlined development across multiple modules.

## Packages 📦:

#### local-client
The local-client package is the primary React application in our project. It leverages Redux for efficient state management throughout the app. Users can write and edit code in the integrated Monaco Editor, while the react-md-editor package provides a dedicated text editor for writing in Markdown. The code written by users is bundled using esbuild, and all package imports are handled seamlessly through the unpkg CDN.

##### Dependencies
| Tool/Library                                                                       | Version  |
| ---------------------------------------------------------------------------------- | -------  |
| [react](https://reactjs.org/)                                                      | ^18.2.0  |
| [redux](https://redux.js.org/)                                                     |  5.0.1   |
| [redux-thunk](https://github.com/reduxjs/redux-thunk)                              |  3.1.0   |
| [prettier](https://prettier.io/)                                                   | ^2.8.8   |
| [monaco-editor](https://github.com/react-monaco-editor/react-monaco-editor)        |  0.45.0  |
| [immer](https://immerjs.github.io/immer/)                                          | ^10.0.3  |
| [axios](https://axios-http.com/)                                                   | ^1.6.2   |

#### local-api
when a user make uses of codeBook. he is not going to be using the create-react-app (to access the local-client). local-api will fetch the index.js and the other assets fro local-client and will serve it to the user. think of local-api as a proxy between the user and the app.

##### Dependencies
| Tool/Library                                                                       | Version  |
| ---------------------------------------------------------------------------------- | -------  |
| [express](https://expressjs.com/)                                                  | ^4.18.2  |
| [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)       | ^2.0.6   |
| [cors](https://www.npmjs.com/package/cors)                                         | ^2.8.5   |

#### cli
A command line interface responsible for starting up codebook on user machine. it's job is to startup a node express server (local-api).

| Tool/Library                                                                       | Version  |
| ---------------------------------------------------------------------------------- | -------  |
| [commander](https://www.npmjs.com/package/commander)                               | ^11.1.0  |
| [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)       | ^2.0.6   |
| [cors](https://www.npmjs.com/package/cors)                                         | ^2.8.5   |

## Authors ✒️:
this app is part of a [ReactJS / Redux course](https://shorturl.at/bzQU3) by the awesome teacher [Stephen Grider](https://twitter.com/ste_grider)
[Boufaden Alaedine](https://www.linkedin.com/in/b-alaedine/)

## TODO 🛠️:
* add support for python execution.
* add database support.
* add the ability for a user to add upload directly a file and get it transformed to a codeBook page.
* codeBook pages sharing with other users.
* cloud deployment and online editing.
* multi user editing at the same time.
