"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const my_astrosphere_project_firebase_adminsdk_fbsvc_95e7a3b88f_json_1 = __importDefault(require("../database/my-astrosphere-project-firebase-adminsdk-fbsvc-95e7a3b88f.json")); // 
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(my_astrosphere_project_firebase_adminsdk_fbsvc_95e7a3b88f_json_1.default),
    });
}
exports.default = firebase_admin_1.default; // ✅ ต้องมี export default
//# sourceMappingURL=firebaseAdmin.js.map