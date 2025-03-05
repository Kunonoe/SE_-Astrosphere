import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { MongoClient } from 'mongodb';

// 🔹 ตั้งค่าการเชื่อมต่อ MongoDB
const uri: string = 'mongodb://localhost:27017';
const dbName: string = 'cardDB'; // ✅ ใช้ database เดิม
const collections = {
    zodiac: 'zodiac_cards', // ✅ เปลี่ยนจาก feature1 → zodiac
    tarot: 'tarot_cards'     // ✅ เปลี่ยนจาก feature2 → tarot
};

// สร้าง MongoDB Client
const client = new MongoClient(uri);

// Interface สำหรับข้อมูลการ์ด
interface Card {
    cardID: Number;
    cardNAME: String;
    cardMEANING: String;
    cardPHOTO: String;
}

// ฟังก์ชันนำเข้า CSV เข้า MongoDB
async function importCSV(fileName: string, collectionName: string) {
    try {
        await client.connect();
        console.log(`✅ Connected to MongoDB: ${collectionName}`);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 🛑 ล้างข้อมูลเก่าออกก่อน
        await collection.deleteMany({});
        console.log(`🗑️ Cleared old data in ${collectionName}`);

        const filePath = path.join(__dirname, fileName);
        const cards: Card[] = [];

        // อ่าน CSV และแปลงเป็น JSON (บังคับใช้ Header ที่ถูกต้อง)
        fs.createReadStream(filePath, { encoding: 'utf-8' })
            .pipe(csvParser({ headers: ['cardID', 'cardNAME', 'cardMEANING', 'cardPHOTO'], skipLines: 1 })) // ✅ บังคับใช้ Header
            .on('data', (row: Record<string, string>) => {
                // ✅ ตัดช่องว่าง
                Object.keys(row).forEach((key) => {
                    if (row[key]) row[key] = row[key].trim();
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
                    .replace(/""/g, '"');  // แก้ปัญหาการใช้ "" ซ้อนกันใน CSV

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
                } else {
                    console.log(`⚠️ No valid data found in ${fileName}`);
                }
                if (collectionName === collections.tarot) client.close();
            });

    } catch (err) {
        console.error(`❌ Error importing ${fileName}:`, err);
        client.close();
    }
}

// **เริ่มนำเข้าข้อมูล**
importCSV('zodiac.csv', collections.zodiac);
importCSV('tarot.csv', collections.tarot);
