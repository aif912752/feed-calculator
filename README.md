# เครื่องคำนวณการเลี้ยงสัตว์ 🐷🐔🐄

โปรเจ็คนี้เป็นแอปพลิเคชันเครื่องคำนวณการเลี้ยงสัตว์ที่สร้างด้วย Vue 3 และ Vite ช่วยให้ผู้ใช้คำนวณอัตราการเปลี่ยนอาหาร (FCR), การเพิ่มน้ำหนักเฉลี่ยต่อวัน (ADG), และการบริโภคอาหาร (FI) สำหรับปศุสัตว์

## ✨ คุณสมบัติ

- คำนวณอัตราการเปลี่ยนอาหาร (FCR)
- คำนวณการเพิ่มน้ำหนักเฉลี่ยต่อวัน (ADG)
- คำนวณการบริโภคอาหาร (FI)
- ดูประวัติการคำนวณ
- รีเซ็ตฟอร์มและประวัติ
- แสดงสูตรการคำนวณ

## 📸 ตัวอย่างการใช้งาน
![Feed Calculator UI](https://github.com/aif912752/feed-calculator/blob/main/screenshot-2025-03-18.screenshot-2025-03-18.png?raw=true) 

## การติดตั้งและการใช้งาน

1. Clone โปรเจ็คนี้:
    ```bash
    git clone https://github.com/yourusername/feed-calculator.git
    cd feed-calculator
    ```

2. ติดตั้ง dependencies:
    ```bash
    npm install
    ```

3. รันแอปพลิเคชัน:
    ```bash
    npm run dev
    ```

4. เปิดเบราว์เซอร์และไปที่ `http://localhost:3000` เพื่อใช้งานแอปพลิเคชัน

## โครงสร้างโปรเจ็ค

```
d:\Github\feed-calculator
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── CalculationForm.vue
│   │   ├── CalculationHistory.vue
│   │   ├── CalculationResult.vue
│   │   └── FormulasModal.vue
│   ├── utils
│   │   └── calculatorUtils.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## การทดสอบ

1. รันการทดสอบทั้งหมด:
    ```bash
    npm test
    ```

2. รันการทดสอบเฉพาะไฟล์:
    ```bash
    npm test -- <path-to-test-file>
    ```

3. ตรวจสอบการครอบคลุมการทดสอบ:
    ```bash
    npm run test:coverage
    ```

## วิธีการใช้งาน

1. เปิดแอปพลิเคชันในเบราว์เซอร์
2. กรอกข้อมูลในฟอร์มการคำนวณ เช่น น้ำหนักเริ่มต้น น้ำหนักสุดท้าย ปริมาณอาหาร และจำนวนวัน
3. คลิกปุ่ม "คำนวณ" เพื่อดูผลลัพธ์
4. ผลลัพธ์จะแสดงอัตราการแปลงอาหาร (FCR), อัตราการเจริญเติบโตต่อวัน (ADG), และปริมาณอาหารที่กินต่อวัน (FI)
5. สามารถดูประวัติการคำนวณที่ผ่านมาได้ในส่วน "ประวัติการคำนวณ"
6. คลิกปุ่ม "รีเซ็ตทั้งหมด" เพื่อรีเซ็ตฟอร์มและล้างประวัติการคำนวณ
7. คลิกปุ่ม "สูตรการคำนวณ" เพื่อดูสูตรการคำนวณที่ใช้ในแอปพลิเคชัน
