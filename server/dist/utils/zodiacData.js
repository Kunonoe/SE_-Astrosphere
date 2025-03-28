"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodiacMapping = exports.timeSlots = exports.zodiacTable = void 0;
// ตารางลัคนาราศีที่รองรับเวลาเกิด (แบ่งช่วง 2 ชั่วโมง)
exports.zodiacTable = {
    "15 ม.ค. - 12 ก.พ.": ["มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู"],
    "13 ก.พ. - 13 มี.ค.": ["กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร"],
    "14 มี.ค. - 12 เม.ย.": ["มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์"],
    "13 เม.ย. - 13 พ.ค.": ["เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน"],
    "14 พ.ค. - 14 มิ.ย.": ["พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ"],
    "15 มิ.ย. - 16 ก.ค.": ["เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ"],
    "17 ก.ค. - 16 ส.ค.": ["กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน"],
    "17 ส.ค. - 16 ก.ย.": ["สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ"],
    "17 ก.ย. - 16 ต.ค.": ["กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์"],
    "17 ต.ค. - 15 พ.ย.": ["ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์"],
    "16 พ.ย. - 15 ธ.ค.": ["พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์"],
    "16 ธ.ค. - 14 ม.ค.": ["ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก"]
};
exports.timeSlots = [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 1, 3];
// ✅ แปลงชื่อราศีจากไทย -> อังกฤษ
exports.zodiacMapping = {
    "มังกร": "Capricorn", "กุมภ์": "Aquarius", "มีน": "Pisces",
    "เมษ": "Aries", "พฤษภ": "Taurus", "เมถุน": "Gemini",
    "กรกฎ": "Cancer", "สิงห์": "Leo", "กันย์": "Virgo",
    "ตุลย์": "Libra", "พิจิก": "Scorpio", "ธนู": "Sagittarius"
};
//# sourceMappingURL=zodiacData.js.map