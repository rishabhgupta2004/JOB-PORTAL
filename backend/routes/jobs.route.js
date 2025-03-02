import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobs.controller.js";

const router = express.Router();

// Routes
router.route('/post').post(isAuthenticated, postJob);
router.route('/get').get(isAuthenticated, getAllJobs);
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs);
router.route('/get/:id').get(isAuthenticated, getJobById);

export default router;