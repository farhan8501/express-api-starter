
import validator from 'validator';
import User from '../models/user';

export const GetUsers = (req, res) => {
	const params = req.params || {};
	const query = req.query || {};

	const page = parseInt(query.page, 10) || 0;
	const perPage = parseInt(query.per_page, 10) || 10;
	return res.status(200).json([{
		name: "Frahan Khan",
		age: 26
	}, {
		name: "Naved Khan",
		age: 30
	}])
	// User.find(req.query)
	// 	.then(users => {
	// 		res.json(users);
	// 	})
	// 	.catch(err => {
	// 		console.error(err);
	// 		res.status(422).send(err.errors);
	// 	});
};

export const GetUser = (req, res) => {
	User.findById(req.params.userId)
		.then(user => {
			user.password = undefined;
			user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			console.error(err);
			res.status(422).send(err.errors);
		});
};

export const UpdateUser = (req, res) => {
	const data = req.body || {};

	if (data.email && !validator.isEmail(data.email)) {
		return res.status(422).send('Invalid email address.');
	}

	if (data.username && !validator.isAlphanumeric(data.username)) {
		return res.status(422).send('Usernames must be alphanumeric.');
	}

	User.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			user.password = undefined;
			user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			console.error(err);
			res.status(422).send(err.errors);
		});
};

export const CreateUser = (req, res) => {
	const data = Object.assign({}, req.body, { user: req.user.sub }) || {};

	User.create(data)
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			console.error(err);
			res.status(500).send(err);
		});
};

export const DeleteUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.params.user },
		{ active: false },
		{
			new: true
		}
	)
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			res.sendStatus(204);
		})
		.catch(err => {
			console.error(err);
			res.status(422).send(err.errors);
		});
};
