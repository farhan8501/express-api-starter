import mongoose from 'mongoose';
import config from '../../config';

mongoose.Promise = global.Promise;

const connection = mongoose.connect(config.database.uri, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

connection
	.then(db => {
		console.log(
			`Successfully connected to ${config.database.uri} MongoDB in ${
				config.env
			} mode.`,
		);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			console.log('Attempting to re-establish database connection.');
			mongoose.connect(config.database.uri);
		} else {
			console.error('Error while attempting to connect to database:');
			console.error(err);
		}
	});

export default connection;
