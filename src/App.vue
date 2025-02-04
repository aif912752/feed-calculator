<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 md:p-8">
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
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <h1 class="text-2xl font-bold text-blue-700">เครื่องคำนวณการเลี้ยงสัตว์</h1>
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
          <CalculatorForm 
            @calculate="handleCalculate" 
            @reset="handleFormReset" 
          />
          <CalculationResult 
            v-if="result" 
            :result="result"
          />
        </div>
        
        <CalculationHistory
          :history="calculationHistory"
          @deleteRecord="deleteRecord"
          @clearHistory="clearAllHistory"
          class="h-full"
        />
      </div>
    </div>

    <FormulasModal
    :visible="formulasVisible"
    @update:visible="formulasVisible = $event"
  />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import CalculatorForm from './components/CalculatorForm.vue';
import CalculationResult from './components/CalculationResult.vue';
import CalculationHistory from './components/CalculationHistory.vue';
import FormulasModal from './components/FormulasModal.vue';
import { calculateResults } from './utils/calculatorUtils';

const formulasVisible = ref(false);
const result = ref(null);
const calculationHistory = ref([]);

onMounted(() => {
  const savedHistory = localStorage.getItem('calculationHistory');
  if (savedHistory) {
    calculationHistory.value = JSON.parse(savedHistory);
  }
});

const saveHistory = () => {
  localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory.value));
};

const handleCalculate = (formData) => {
  const { initialWeight, finalWeight, totalFeed, days, notes, unit } = formData;
  
  const newResult = calculateResults(initialWeight, finalWeight, totalFeed, days, unit);
  result.value = newResult;

  const newRecord = {
    date: new Date().toLocaleString('th-TH'),
    initialWeight,
    finalWeight,
    totalFeed,
    days,
    notes,
    unit,
    result: newResult,
  };

  calculationHistory.value.unshift(newRecord);
  saveHistory();
  message.success('คำนวณเสร็จสิ้นและบันทึกแล้ว');
};

const handleFormReset = () => {
  result.value = null;
  message.success('รีเซ็ตฟอร์มเรียบร้อย');
};

const deleteRecord = (index) => {
  calculationHistory.value.splice(index, 1);
  saveHistory();
  message.success('ลบรายการเรียบร้อย');
};

const clearAllHistory = () => {
  calculationHistory.value = [];
  localStorage.removeItem('calculationHistory');
  message.success('ลบประวัติการคำนวณทั้งหมดเรียบร้อย');
};

const resetAll = () => {
  handleFormReset();
  clearAllHistory();
  message.success('รีเซ็ตทั้งหมดเรียบร้อย');
};

const showFormulas = () => {
  formulasVisible.value = true;
};
</script>