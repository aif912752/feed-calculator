<template>
<a-modal
  :open="visible"
  title="สูตรการคำนวณ"
  @cancel="closeModal"
  width="600px"
  centered
  :footer="null"
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
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:visible']);

const closeModal = () => {
  emit('update:visible', false);
};
</script>