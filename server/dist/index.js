"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const sendmessages_1 = require("./SubServer/sendmessages");
require("./SubServer/croncounttime");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(process.env.MONGO_URL);
mongoose_1.default.connection.on('error', (error) => console.log(error));
app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Sever running on port: ${process.env.SERVER_PORT || 5000}`);
});
app.use('/api', (0, router_1.default)());
(0, sendmessages_1.sendScheduledMessages)();
//# sourceMappingURL=index.js.map