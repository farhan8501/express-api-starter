require('dotenv').config({ path: './.env' });

export default {
	env: process.env.NODE_ENV || 'development',
	database: {
		uri: process.env.DATABASE_URI
	},
	server: {
		port: process.env.PORT
	},
	jwt: {
		secret: 'Testing'
	}
};
