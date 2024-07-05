import express from "express";
import UsersController from "../controller/usersController";

const router = express.Router();


router.get("/user", UsersController.getAllUsers);
router.get("/user/:id", UsersController.getUser);
router.post("/user", UsersController.createUser);
router.post("/user/:id", UsersController.updateUser);
router.delete("/user/:id", UsersController.deleteUser);


export default router;


