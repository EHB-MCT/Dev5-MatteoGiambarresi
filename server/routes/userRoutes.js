const express = require("express");
const router = express.Router();

/**
 * Creates user routes with the provided controller
 * @param {UserController} userController - Controller instance for handling user operations
 * @returns {Router} Express router with user routes configured
 * @example
 * const userRouter = createUserRoutes(userController);
 * app.use('/', userRouter);
 */
const createUserRoutes = (userController) => {
	/**
	 * POST /registerName
	 * Registers a new user with the provided name
	 */
	router.post("/registerName", userController.registerUser.bind(userController));

	/**
	 * GET /users
	 * Retrieves all users from the database
	 */
	router.get("/users", userController.getAllUsers.bind(userController));

	/**
	 * GET /team
	 * Retrieves all users' teams with their details
	 */

	router.get("/team", userController.getAllTeams.bind(userController));
	/**
	 * PUT /updateTeam
	 * Updates a user's Pokemon team and calculates personality
	 */
	router.put("/updateTeam", userController.updateTeam.bind(userController));

	return router;
};

module.exports = createUserRoutes;
