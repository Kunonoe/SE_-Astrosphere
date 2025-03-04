import admin from "firebase-admin";
import serviceAccount from "../database/my-astrosphere-project-firebase-adminsdk-fbsvc-95e7a3b88f.json"; // 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export default admin; // ✅ ต้องมี export default
