"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../Controllers/login");
exports.default = (router) => {
    router.get('/showuser', login_1.showUsers); //ดึงข้อมูลมา
    router.post('/login', login_1.login);
    router.post('/register', login_1.register);
    //router.put() อัปเดตข้อมูล
};
//# sourceMappingURL=login.js.map