import express, { Express, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';

import jwt from 'express-jwt';
import config from './config';
import appRoutes from "./routes";
import './utils/db';


class App {
	isDev = config.env  !== 'production';
	
	constructor() {
		this.express = express();
		this.express.use(cors());
		this.express.use(compression());
		this.express.use(bodyParser.json());
		

		this.express.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
			next();
		});

		this.express.use(express.json({ limit: "2mb" }));
		this.express.use(
			express.urlencoded({
			  extended: false,
			  limit: "2mb",
			})
		);
		this.express.use('/api',
			jwt({ secret: config.jwt.secret, algorithms: ['RS256'] }).unless({
				path: [
					'/',
					'/api/auth/signup',
					'/api/auth/login',
					'/api/auth/forgot-password',
					'/api/auth/reset-password',
					'/api/users',
					'/api-docs'
				]
			})
		);

		this.express.use((err, req, res, next) => {
			if (err.name === 'UnauthorizedError') {
				res.status(401).send('Missing authentication credentials.');
			}
		});

		this.mountRoutes();
	}

	mountRoutes() {
		this.express.use(
			appRoutes
		  );
	}
}

export default new App().express;