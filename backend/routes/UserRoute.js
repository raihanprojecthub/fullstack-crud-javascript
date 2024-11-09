import express from "express";
import {getUsers, getUserById} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);

export default router;