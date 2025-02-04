<template>
    <div class="mb-4">
      <a-radio-group v-model:value="unit" class="mb-4">
        <a-radio-button value="g">กรัม (ก.)</a-radio-button>
        <a-radio-button value="kg">กิโลกรัม (กก.)</a-radio-button>
      </a-radio-group>
    </div>
    <a-form :model="formData" @finish="onSubmit" class="space-y-4">
      <a-form-item
        :label="'น้ำหนักเริ่มต้น (' + (unit === 'kg' ? 'กก.' : 'ก.') + ')'"
        name="initialWeight"
        :rules="[{ required: true, message: 'กรุณาระบุน้ำหนักเริ่มต้น' }]"
      >
        <a-input-number
          v-model:value="formData.initialWeight"
          :min="0"
          class="w-full"
          :placeholder="'ระบุน้ำหนักเริ่มต้น (' + (unit === 'kg' ? 'กก.' : 'ก.') + ')'"
        />
      </a-form-item>
   
      <a-form-item
        :label="'น้ำหนักสุดท้าย (' + (unit === 'kg' ? 'กก.' : 'ก.') + ')'"
        name="finalWeight"
        :rules="[{ required: true, message: 'กรุณาระบุน้ำหนักสุดท้าย' }]"
      >
        <a-input-number
          v-model:value="formData.finalWeight"
          :min="0"
          class="w-full"
          :placeholder="'ระบุน้ำหนักสุดท้าย (' + (unit === 'kg' ? 'กก.' : 'ก.') + ')'"
        />
      </a-form-item>


      <a-form-item
        :label="'ปริมาณอาหารทั้งหมด (' + (unit === 'kg' ? 'กก.' : 'ก.') + ')'"
        name="totalFeed"
        :rules="[{ required: true, message: 'กรุณาระบุปริมาณอาหาร' }]"
      >
        <a-input-number
          v-model:value="formData.totalFeed"
          :min="0"
          class="w-full"
          :placeholder="'ระบุปริมาณอาหารทั้งหมด (' + (unit === 'kg' ? 'กก.' : 'ก.') + ')'"
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
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";

const emit = defineEmits(["calculate", "reset"]);

const unit = ref('g');


const formData = ref({
  initialWeight: null,
  finalWeight: null,
  totalFeed: null,
  days: null,
  notes: '',
});

const onSubmit = () => {
  const { initialWeight, finalWeight, totalFeed, days, notes } = formData.value;

  if (!initialWeight || !finalWeight || !totalFeed || !days) {
    message.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    return;
  }

  if (finalWeight <= initialWeight) {
    message.error('น้ำหนักสุดท้ายต้องมากกว่าน้ำหนักเริ่มต้น');
    return;
  }

  emit('calculate', { ...formData.value, unit: unit.value });
};


const resetForm = () => {
  formData.value = {
    initialWeight: null,
    finalWeight: null,
    totalFeed: null,
    days: null,
    notes: '',
  };
  unit.value = 'g';
  emit('reset');
};

</script>

<style scoped>
:deep(.unit-selector) {
  .ant-radio-button-wrapper {
    border-radius: 6px;
    margin-right: 8px;
    border: 1px solid #d9d9d9;
  }

  .ant-radio-button-wrapper:not(:first-child)::before {
    display: none;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #1890ff;
    border-color: #1890ff;
    color: white;
    box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
  }

  .ant-radio-button-wrapper:hover {
    color: #1890ff;
  }

  .ant-radio-button-wrapper-checked:hover {
    color: white;
    background: #40a9ff;
    border-color: #40a9ff;
  }
}
</style>