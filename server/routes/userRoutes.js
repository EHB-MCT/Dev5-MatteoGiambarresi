const express = require("express");
const router = express.Router();

const createUserRoutes = (userController) => {
	router.post("/registerName", userController.registerUser.bind(userController));
	router.get("/users", userController.getAllUsers.bind(userController));
	router.put("/updateTeam", userController.updateTeam.bind(userController));

	return router;
};

module.exports = createUserRoutes;