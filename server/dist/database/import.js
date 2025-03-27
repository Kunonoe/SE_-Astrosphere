"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
// ✅ โหลดไฟล์ .env
dotenv_1.default.config();
console.log("🔹 MONGO_URL:", process.env.MONGO_URL); // ✅ เช็คว่า MONGO_URL ถูกโหลดไหม
const uri = process.env.MONGO_URL;
if (!uri) {
    throw new Error("❌ MONGO_URL is not defined. Please check your .env file.");
}
const dbName = 'cardDB';
const collections = {
    zodiac: 'zodiac_cards',
    tarot: 'tarot_cards'
};
// สร้าง MongoDB Client
const client = new mongodb_1.MongoClient(uri);
// ฟังก์ชันนำเข้า CSV เข้า MongoDB
async function importCSV(fileName, collectionName) {
    try {
        await client.connect();
        console.log(`✅ Connected to MongoDB: ${collectionName}`);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // 🛑 ล้างข้อมูลเก่าออกก่อน
        await collection.deleteMany({});
        console.log(`🗑️ Cleared old data in ${collectionName}`);
        const filePath = path_1.default.join(__dirname, fileName);
        const cards = [];
        // อ่าน CSV และแปลงเป็น JSON (บังคับใช้ Header ที่ถูกต้อง)
        fs_1.default.createReadStream(filePath, { encoding: 'utf-8' })
            .pipe((0, csv_parser_1.default)({ headers: ['cardID', 'cardNAME', 'cardMEANING', 'cardPHOTO'], skipLines: 1 })) // ✅ บังคับใช้ Header
            .on('data', (row) => {
            // ✅ ตัดช่องว่าง
            Object.keys(row).forEach((key) => {
                if (row[key])
                    row[key] = row[key].trim();
            });
            // ✅ ตรวจสอบว่า field ไม่ว่าง
            if (!row.cardID || !row.cardNAME || !row.cardMEANING || !row.cardPHOTO) {
                console.log(`⚠️ Skipping row (Missing required fields):`, row);
                return;
            }
            // ✅ แปลง `cardID` เป็นตัวเลข
            const parsedCardID = parseInt(row.cardID, 10);
            if (isNaN(parsedCardID)) {
                console.log(`❌ Invalid cardID (NaN):`, row.cardID);
                return;
            }
            // ✅ เก็บ `\n` ไว้ใน `cardMEANING` และแก้ไข `""` ซ้อนกัน
            const cleanedMeaning = row.cardMEANING
                .replace(/\\n/g, '\n') // ทำให้ขึ้นบรรทัดใหม่ได้
                .replace(/""/g, '"'); // แก้ปัญหาการใช้ "" ซ้อนกันใน CSV
            // ✅ เพิ่มข้อมูลลงใน MongoDB
            cards.push({
                cardID: parsedCardID,
                cardNAME: row.cardNAME,
                cardMEANING: cleanedMeaning, // ✅ เก็บขึ้นบรรทัดใหม่
                cardPHOTO: row.cardPHOTO
            });
        })
            .on('end', async () => {
            if (cards.length > 0) {
                await collection.insertMany(cards);
                console.log(`✅ Imported ${cards.length} records into ${collectionName}`);
            }
            else {
                console.log(`⚠️ No valid data found in ${fileName}`);
            }
            if (collectionName === collections.tarot)
                client.close();
        });
    }
    catch (err) {
        console.error(`❌ Error importing ${fileName}:`, err);
        client.close();
    }
}
// **เริ่มนำเข้าข้อมูล**
importCSV('zodiac.csv', collections.zodiac);
importCSV('tarot.csv', collections.tarot);
//# sourceMappingURL=import.js.map