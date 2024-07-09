// functions/index.ts
import * as functions from "firebase-functions/v2/https";
import { api } from "../../core/app";

// Expose Express app as an HTTP function
exports.app = functions.onRequest(api); // Changed export name to 'app'
