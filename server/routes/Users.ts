import express from "express";

import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/Users.js";

import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();


// READ
router.get("/:id", verifyToken, getUser)

router.get("/:friends", verifyToken, getUserFriends)

// UPDATE

router.patch("/:id/:friendId", verifyToken, addRemoveFriend)

export default router