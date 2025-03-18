<template>
  <div v-if="result" class="mt-6 bg-blue-50 p-4 rounded-lg shadow-sm">
    <h2 class="text-xl font-semibold text-center text-blue-700 mb-4 flex items-center justify-center">
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
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
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
        <span class="font-bold">{{ formatNumber(result.fcr) }}</span>
      </p>
      <p class="flex justify-between text-blue-800">
        <span>อัตราการเจริญเติบโตต่อวัน (ADG):</span>
        <span class="font-bold">{{ formatNumber(result.adg) }} {{ result.unit === 'kg' ? 'กก.' : 'ก.' }}/วัน</span>
      </p>
      <p class="flex justify-between text-blue-800">
        <span>ปริมาณอาหารที่กินต่อวัน (FI):</span>
        <span class="font-bold">{{ formatNumber(result.fi) }} {{ result.unit === 'kg' ? 'กก.' : 'ก.' }}/วัน</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
});

const formatNumber = (value) => {
  // แน่ใจว่าค่าเป็นตัวเลขก่อนจัดรูปแบบ
  const numValue = Number(value);
  if (isNaN(numValue)) return value;

  return numValue.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
</script>