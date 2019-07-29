import * as compress from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';

import * as feathers from '@feathersjs/feathers';
import * as configuration from '@feathersjs/configuration';
import * as express from '@feathersjs/express';
import * as socketio from '@feathersjs/socketio';
import logger from './logger';

const app = express(feathers());

app.configure(configuration());

app.use(helmet());
app.use(cors());
app.use(compress());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.use('/', express.static(__dirname + '/public'));

export default app;
