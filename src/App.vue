<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
      <div class="flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 mr-3">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <h1 class="text-2xl font-bold text-blue-700">
          เครื่องคำนวณการเลี้ยงสัตว์
        </h1>
      </div>
      
      <a-form 
        :model="ข้อมูลฟอร์ม" 
        @finish="คำนวณ"
        class="space-y-4"
      >
        <a-form-item 
          label="น้ำหนักเริ่มต้น (กก.)" 
          name="น้ำหนักเริ่มต้น"
          :rules="[{ required: true, message: 'กรุณาใส่น้ำหนักเริ่มต้น' }]"
        >
          <a-input-number 
            v-model:value="ข้อมูลฟอร์ม.น้ำหนักเริ่มต้น" 
            :min="0" 
            class="w-full"
            placeholder="น้ำหนักเริ่มต้น"
          />
        </a-form-item>

        <a-form-item 
          label="น้ำหนักสุดท้าย (กก.)" 
          name="น้ำหนักสุดท้าย"
          :rules="[{ required: true, message: 'กรุณาใส่น้ำหนักสุดท้าย' }]"
        >
          <a-input-number 
            v-model:value="ข้อมูลฟอร์ม.น้ำหนักสุดท้าย" 
            :min="0" 
            class="w-full"
            placeholder="น้ำหนักสุดท้าย"
          />
        </a-form-item>

        <a-form-item 
          label="ปริมาณอาหารทั้งหมด (กก.)" 
          name="ปริมาณอาหาร"
          :rules="[{ required: true, message: 'กรุณาใส่ปริมาณอาหาร' }]"
        >
          <a-input-number 
            v-model:value="ข้อมูลฟอร์ม.ปริมาณอาหาร" 
            :min="0" 
            class="w-full"
            placeholder="ปริมาณอาหารทั้งหมด"
          />
        </a-form-item>

        <a-form-item 
          label="จำนวนวันที่เลี้ยง" 
          name="จำนวนวัน"
          :rules="[{ required: true, message: 'กรุณาใส่จำนวนวัน' }]"
        >
          <a-input-number 
            v-model:value="ข้อมูลฟอร์ม.จำนวนวัน" 
            :min="1" 
            class="w-full"
            placeholder="จำนวนวันที่เลี้ยง"
          />
        </a-form-item>

        <a-button 
          type="primary" 
          html-type="submit" 
          class="w-full bg-blue-500 hover:bg-blue-600 transition-colors rounded-full text-white font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 inline">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          คำนวณ
        </a-button>
      </a-form>

      <div v-if="ผลลัพธ์" class="mt-6 bg-blue-50 p-4 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold text-center text-blue-700 mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
          </svg>
          ผลการคำนวณ
        </h2>
        <div class="space-y-2">
          <p class="flex justify-between text-blue-800">
            <span>FCR (อัตราการแปรอาหาร):</span>
            <span class="font-bold">{{ ผลลัพธ์.fcr.toFixed(2) }}</span>
          </p>
          <p class="flex justify-between text-blue-800">
            <span>ADG (อัตราการเจริญเติบโตต่อวัน):</span>
            <span class="font-bold">{{ ผลลัพธ์.adg.toFixed(2) }} กก./วัน</span>
          </p>
          <p class="flex justify-between text-blue-800">
            <span>FI (ปริมาณอาหารที่กินต่อวัน):</span>
            <span class="font-bold">{{ ผลลัพธ์.fi.toFixed(2) }} กก./วัน</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const ข้อมูลฟอร์ม = ref({
  น้ำหนักเริ่มต้น: null,
  น้ำหนักสุดท้าย: null,
  ปริมาณอาหาร: null,
  จำนวนวัน: null
})

const ผลลัพธ์ = ref(null)

const คำนวณ = () => {
  const { 
    น้ำหนักเริ่มต้น, 
    น้ำหนักสุดท้าย, 
    ปริมาณอาหาร, 
    จำนวนวัน 
  } = ข้อมูลฟอร์ม.value

  if (!น้ำหนักเริ่มต้น || !น้ำหนักสุดท้าย || !ปริมาณอาหาร || !จำนวนวัน) {
    message.error('กรุณากรอกข้อมูลให้ครบทุกช่อง')
    return
  }

  const fcr = ปริมาณอาหาร / (น้ำหนักสุดท้าย - น้ำหนักเริ่มต้น)
  const adg = (น้ำหนักสุดท้าย - น้ำหนักเริ่มต้น) / จำนวนวัน
  const fi = ปริมาณอาหาร / จำนวนวัน

  ผลลัพธ์.value = { fcr, adg, fi }
}
</script>