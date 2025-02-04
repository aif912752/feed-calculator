<template>
  <div class="bg-gray-100 p-4 rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-blue-700 flex items-center">
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
          <path d="M12 20v-6M6 20V10M18 20V4" />
        </svg>
        ประวัติการคำนวณ
        <span class="ml-2 text-sm text-gray-600">({{ history.length }} รายการ)</span>
      </h2>

      <a-button
        v-if="history.length > 0"
        type="text"
        class="text-red-500 hover:text-red-700 flex items-center space-x-2"
        @click="clearHistory"
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

    <div v-if="history.length > 0" class="space-y-4 max-h-[500px] overflow-y-auto">
      <div
        v-for="(record, index) in history"
        :key="index"
        class="bg-white p-4 rounded-lg shadow-sm"
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
            {{ formatNumber(record.initialWeight) }} → {{ formatNumber(record.finalWeight) }} {{ record.unit === 'kg' ? 'กก.' : 'ก.' }}
          </p>
          <p class="text-sm">
            <span class="font-semibold">ระยะเวลา:</span>
            {{ record.days }} วัน
          </p>
          <p class="text-sm">
            <span class="font-semibold">อาหาร:</span>
            {{ formatNumber(record.totalFeed) }} {{ record.unit === 'kg' ? 'กก.' : 'ก.' }}
          </p>
          <div class="mt-2 pt-2 border-t">
            <p class="text-sm">
              <span class="font-semibold">FCR:</span>
              {{ formatNumber(record.result.fcr) }}
            </p>
            <p class="text-sm">
              <span class="font-semibold">ADG:</span>
              {{ formatNumber(record.result.adg) }} {{ record.unit === 'kg' ? 'กก.' : 'ก.' }}/วัน
            </p>
            <p class="text-sm">
              <span class="font-semibold">FI:</span>
              {{ formatNumber(record.result.fi) }} {{ record.unit === 'kg' ? 'กก.' : 'ก.' }}/วัน
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
</template>

<script setup>
defineProps({
  history: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['deleteRecord', 'clearHistory']);

const formatNumber = (value) => {
  // แน่ใจว่าค่าเป็นตัวเลขก่อนจัดรูปแบบ
  const numValue = Number(value);
  if (isNaN(numValue)) return value;

  return numValue.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const deleteRecord = (index) => {
  emit('deleteRecord', index);
};

const clearHistory = () => {
  emit('clearHistory');
};
</script>