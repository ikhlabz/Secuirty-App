// Desc: This file contains the cron jobs that are scheduled to run at specific intervals.
import { Patrolling } from "../models/patrollingSchema.js";

export default async function updatePatrollingStatus() {
  try {
    console.log("Updating patrolling status...");
    const patrolling = await Patrolling.find({});

    for (const patrol of patrolling) {
      const checkpoints = patrol.patrollingCheckpoints;

      for (const checkpoint of checkpoints) {
        if (checkpoint.completed === true) {
          checkpoint.completed = false;
        }
      }

      await patrol.save();
    }

    console.log(
      "Patrolling status updated successfully after every four hours."
    );
  } catch (error) {
    console.error("Error occurred while updating patrolling status:", error);
  }
}
