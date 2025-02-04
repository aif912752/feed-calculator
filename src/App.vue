<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 md:p-8"
    >
      <div class="flex flex-col md:flex-row items-center justify-between mb-6">
        <div class="flex items-center mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-blue-500 mr-3"
          >
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            />
            <path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            />
          </svg>
          <h1 class="text-2xl font-bold text-blue-700">
            เครื่องคำนวณการเลี้ยงสัตว์
          </h1>
        </div>
        <div class="flex space-x-3">
          <a-button
            type="primary"
            @click="showFormulas"
            class="bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            สูตรการคำนวณ
          </a-button>
        <a-button
          type="default"
          @click="resetAll"
          class="bg-red-50 hover:bg-red-100 text-red-600 rounded-full flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-9 9Z" />
            <path d="m8 12 4-4 4 4" />
            <path d="m12 16V8" />
          </svg>
          รีเซ็ตทั้งหมด
        </a-button>
      </div>
    </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <a-form :model="formData" @finish="calculate" class="space-y-4">
            <a-form-item
              label="น้ำหนักเริ่มต้น (กก.)"
              name="initialWeight"
              :rules="[{ required: true, message: 'กรุณาระบุน้ำหนักเริ่มต้น' }]"
            >
              <a-input-number
                v-model:value="formData.initialWeight"
                :min="0"
                class="w-full"
                placeholder="ระบุน้ำหนักเริ่มต้น"
              />
            </a-form-item>

            <a-form-item
              label="น้ำหนักสุดท้าย (กก.)"
              name="finalWeight"
              :rules="[{ required: true, message: 'กรุณาระบุน้ำหนักสุดท้าย' }]"
            >
              <a-input-number
                v-model:value="formData.finalWeight"
                :min="0"
                class="w-full"
                placeholder="ระบุน้ำหนักสุดท้าย"
              />
            </a-form-item>

            <a-form-item
              label="ปริมาณอาหารทั้งหมด (กก.)"
              name="totalFeed"
              :rules="[{ required: true, message: 'กรุณาระบุปริมาณอาหาร' }]"
            >
              <a-input-number
                v-model:value="formData.totalFeed"
                :min="0"
                class="w-full"
                placeholder="ระบุปริมาณอาหารทั้งหมด"
              />
            </a-form-item>

            <a-form-item
              label="จำนวนวันที่เลี้ยง"
              name="days"
              :rules="[{ required: true, message: 'กรุณาระบุจำนวนวัน' }]"
            >
              <a-input-number
                v-model:value="formData.days"
                :min="1"
                class="w-full"
                placeholder="ระบุจำนวนวัน"
              />
            </a-form-item>

            <a-form-item label="หมายเหตุ" name="notes">
              <a-input
                v-model:value="formData.notes"
                placeholder="บันทึกเพิ่มเติม (ไม่บังคับ)"
              />
            </a-form-item>

            <div class="flex space-x-4">
              <a-button
                type="primary"
                html-type="submit"
                class="flex-grow bg-blue-500 hover:bg-blue-600 transition-colors rounded-full text-white font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 inline"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                คำนวณ
              </a-button>
              <a-button
                type="default"
                @click="resetForm"
                class="bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 inline"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-9 9Z" />
                  <path d="m8 12 4-4 4 4" />
                  <path d="m12 16V8" />
                </svg>
                รีเซ็ตฟอร์ม
              </a-button>
            </div>
          </a-form>

          <div v-if="result" class="mt-6 bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2
              class="text-xl font-semibold text-center text-blue-700 mb-4 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <path
                  d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
              ผลการคำนวณล่าสุด
            </h2>
            <div class="space-y-2">
              <p class="flex justify-between text-blue-800">
                <span>อัตราการแปลงอาหาร (FCR):</span>
                <span class="font-bold">{{ result.fcr.toFixed(2) }}</span>
              </p>
              <p class="flex justify-between text-blue-800">
                <span>อัตราการเจริญเติบโตต่อวัน (ADG):</span>
                <span class="font-bold"
                  >{{ result.adg.toFixed(2) }} กก./วัน</span
                >
              </p>
              <p class="flex justify-between text-blue-800">
                <span>ปริมาณอาหารที่กินต่อวัน (FI):</span>
                <span class="font-bold"
                  >{{ result.fi.toFixed(2) }} กก./วัน</span
                >
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-blue-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <path d="M12 20v-6M6 20V10M18 20V4" />
              </svg>
              ประวัติการคำนวณ
              <span class="ml-2 text-sm text-gray-600">({{ calculationHistory.length }} รายการ)</span>
            </h2>
            
            <a-button
              v-if="calculationHistory.length > 0"
              type="text"
              class="text-red-500 hover:text-red-700 flex items-center space-x-2"
              @click="clearAllHistory"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              ล้างประวัติทั้งหมด
            </a-button>
          </div>

          <div
            v-if="calculationHistory.length > 0"
            class="space-y-4 max-h-[500px] overflow-y-auto"
          >
            <div
              v-for="(record, index) in calculationHistory"
              :key="index"
              class="bg-white p-4 rounded-lg shadow-sm "
            >
              <div class="flex justify-between items-start mb-2">
                <span class="text-sm text-gray-500">{{ record.date }}</span>
                <a-button
                  type="text"
                  class="text-red-500 hover:text-red-700"
                  @click="deleteRecord(index)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </a-button>
              </div>
              <div class="space-y-1">
                <p class="text-sm">
                  <span class="font-semibold">น้ำหนัก:</span>
                  {{ record.initialWeight }} → {{ record.finalWeight }} กก.
                </p>
                <p class="text-sm">
                  <span class="font-semibold">ระยะเวลา:</span>
                  {{ record.days }} วัน
                </p>
                <p class="text-sm">
                  <span class="font-semibold">อาหาร:</span>
                  {{ record.totalFeed }} กก.
                </p>
                <div class="mt-2 pt-2 border-t">
                  <p class="text-sm">
                    <span class="font-semibold">FCR:</span>
                    {{ record.result.fcr.toFixed(2) }}
                  </p>
                  <p class="text-sm">
                    <span class="font-semibold">ADG:</span>
                    {{ record.result.adg.toFixed(2) }} กก./วัน
                  </p>
                  <p class="text-sm">
                    <span class="font-semibold">FI:</span>
                    {{ record.result.fi.toFixed(2) }} กก./วัน
                  </p>
                </div>
                <p v-if="record.notes" class="text-sm text-gray-600 mt-2">
                  <span class="font-semibold">หมายเหตุ:</span>
                  {{ record.notes }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500 py-4">
            ยังไม่มีข้อมูลถูกบันทึก
          </div>
        </div>
      </div>
    </div>
  </div>

  <a-modal
        v-model:visible="formulasVisible"
        title="สูตรการคำนวณ"
        @ok="formulasVisible = false"
        width="600px"
        centered
        
      >
        <div class="space-y-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-blue-700 mb-2">
              อัตราการแปลงอาหาร (Feed Conversion Ratio - FCR)
            </h3>
            <p class="text-gray-700 mb-2">
              FCR คือ อัตราส่วนระหว่างปริมาณอาหารที่กินต่อน้ำหนักตัวที่เพิ่มขึ้น
            </p>
            <div class="bg-white p-3 rounded border border-blue-200">
              <code class="text-blue-600">
                FCR = ปริมาณอาหารทั้งหมด ÷ (น้ำหนักสุดท้าย - น้ำหนักเริ่มต้น)
              </code>
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-green-700 mb-2">
              อัตราการเจริญเติบโตต่อวัน (Average Daily Gain - ADG)
            </h3>
            <p class="text-gray-700 mb-2">
              ADG คือ ค่าเฉลี่ยของน้ำหนักที่เพิ่มขึ้นต่อวัน
            </p>
            <div class="bg-white p-3 rounded border border-green-200">
              <code class="text-green-600">
                ADG = (น้ำหนักสุดท้าย - น้ำหนักเริ่มต้น) ÷ จำนวนวันที่เลี้ยง
              </code>
            </div>
          </div>

          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-purple-700 mb-2">
              ปริมาณอาหารที่กินต่อวัน (Feed Intake - FI)
            </h3>
            <p class="text-gray-700 mb-2">
              FI คือ ปริมาณอาหารเฉลี่ยที่สัตว์กินต่อวัน
            </p>
            <div class="bg-white p-3 rounded border border-purple-200">
              <code class="text-purple-600">
                FI = ปริมาณอาหารทั้งหมด ÷ จำนวนวันที่เลี้ยง
              </code>
            </div>
          </div>
        </div>
      </a-modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";

const formulasVisible = ref(false);
const formData = ref({
  initialWeight: null,
  finalWeight: null,
  totalFeed: null,
  days: null,
  notes: "",
});

const result = ref(null);
const calculationHistory = ref([]);

// Load data from localStorage on mount
onMounted(() => {
  const savedHistory = localStorage.getItem("calculationHistory");
  if (savedHistory) {
    calculationHistory.value = JSON.parse(savedHistory);
  }
});

const showFormulas = () => {
  formulasVisible.value = true;
};
// Save data to localStorage
const saveHistory = () => {
  localStorage.setItem(
    "calculationHistory",
    JSON.stringify(calculationHistory.value)
  );
};

const calculate = () => {
  const { initialWeight, finalWeight, totalFeed, days, notes } = formData.value;

  if (!initialWeight || !finalWeight || !totalFeed || !days) {
    message.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  if (finalWeight <= initialWeight) {
    message.error("น้ำหนักสุดท้ายต้องมากกว่าน้ำหนักเริ่มต้น");
    return;
  }

  // Calculations
  const fcr = totalFeed / (finalWeight - initialWeight);
  const adg = (finalWeight - initialWeight) / days;
  const fi = totalFeed / days;

  const newResult = { fcr, adg, fi };
  result.value = newResult;

  // Add to history
  const newRecord = {
    date: new Date().toLocaleString("th-TH"),
    initialWeight,
    finalWeight,
    totalFeed,
    days,
    notes,
    result: newResult,
  };

  calculationHistory.value.unshift(newRecord);
  saveHistory();
  message.success("คำนวณเสร็จสิ้นและบันทึกแล้ว");
};

const deleteRecord = (index) => {
  calculationHistory.value.splice(index, 1);
  saveHistory();
  message.success("ลบรายการเรียบร้อย");
};
const resetForm = () => {
  formData.value = {
    initialWeight: null,
    finalWeight: null,
    totalFeed: null,
    days: null,
    notes: "",
  };
  result.value = null;
  message.success("รีเซ็ตฟอร์มเรียบร้อย");
};

const clearAllHistory = () => {
  calculationHistory.value = [];
  localStorage.removeItem("calculationHistory");
  message.success("ลบประวัติการคำนวณทั้งหมดเรียบร้อย");
};

const resetAll = () => {
  resetForm();
  clearAllHistory();
  message.success("รีเซ็ตทั้งหมดเรียบร้อย");
};
</script>
