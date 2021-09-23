import express from "express";
import swaggerUi from 'swagger-ui-express';
const swagger = require('../swagger.json');
import Auth from '../middleware';
const router = express.Router();

import {GetUsers, GetUser, UpdateUser, CreateUser, DeleteUser} from '../controllers/user';
const options = {
	swaggerOptions: {
		authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
	}
}

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swagger));

router.get('/api/users', GetUsers);
router.get('/api/users/:userId', GetUser);
router.put('/api/users/:userId', UpdateUser)
router.post('/api/users', CreateUser);
router.delete('/api/users/:userId', DeleteUser)


export default router;
