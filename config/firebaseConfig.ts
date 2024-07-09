import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

const serviceAccount = require("/Users/jiaan/Downloads/Github/ebuddy-be/ebuddy.json");
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { admin, db };
