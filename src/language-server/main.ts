import { startLanguageServer } from 'langium';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';
import { createMyfirstlanguageServices } from './myfirstlanguage-module';

console.log('bar')

// Create a connection to the client
const connection = createConnection(ProposedFeatures.all);

// Inject the language services
const services = createMyfirstlanguageServices({ connection });

// Start the language server with the language-specific services
startLanguageServer(services);
