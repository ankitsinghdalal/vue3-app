<script>
import { ref } from "vue"
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minValue, maxValue, helpers } from '@vuelidate/validators'

export default {
  props: ["show", "onAddItem"],
  emits: ["close"],
  setup(props, { emit }) {
    const newItem = ref({ name: "", billingDate: "", status: "", amount: "", plan: "" });
    const rules = {
      name: { required },
      billingDate: {
        required,
        maxValue: helpers.withMessage(
          "The date must not be in the future.",
          (value) => new Date(value) <= new Date()
        ),
      },
      status: { required },
      amount: { required, numeric, minValue: minValue(1), maxValue: maxValue(100) },
      plan: { required },
    };
    const v$ = useVuelidate(rules, newItem);

    const formatAmount = (amount) => {
      return parseFloat(amount).toFixed(2);
    }

    const formatDate = (inputDate) => {
      const [year, month, day] = inputDate.split("-").map(Number);
      console.log({ month, day, year });
      const date = new Date(year, month - 1, day);

      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    };

    const handleAdd = () => {
      v$.value.$validate(); // Trigger validation
      if (v$.value.$invalid) return;

      newItem.value.billingDate = formatDate(newItem.value.billingDate);
      newItem.value.amount = formatAmount(newItem.value.amount);

      props.onAddItem(newItem.value);
      newItem.value = { name: "", billingDate: "", status: "", amount: "", plan: "" }; // Reset form
      v$.value.$reset();
    };

    const handleClose = () => {
      newItem.value = { name: "", billingDate: "", status: "", amount: "", plan: "" }; // Reset form
      v$.value.$reset();
      emit("close");
    }

    return { newItem, handleAdd, handleClose, formatAmount, formatDate, v$ };
  },
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-1/2">
      <h2 class="text-lg font-bold mb-4">Add New Invoice</h2>
      <div class="max-w mx-auto">
        <!-- Name Field -->
        <div class="mb-6 relative">
          <label for="name" class="block text-sm font-medium text-gray-900">Invoice</label>
          <input type="text" id="name" v-model="newItem.name" :class="{ 'border-red-500': v$.name.$error }"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder="Name" />
          <span v-if="v$.name.$error" class="text-red-500 text-sm absolute">
            {{ v$.name.$errors.map((error) => error.$message).join(' | ') }}
          </span>
        </div>

        <!-- Billing Date Field -->
        <div class="mb-6 relative">
          <label for="billingDate" class="block text-sm font-medium text-gray-900">Billing
            Date</label>
          <input type="date" id="billingDate" v-model="newItem.billingDate"
            :class="{ 'border-red-500': v$.billingDate.$error }"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder="Billing Date" />
          <span v-if="v$.billingDate.$error" class="text-red-500 text-sm absolute">
            {{ v$.billingDate.$errors.map((error) => error.$message).join(' | ') }}
          </span>
        </div>

        <!-- Status Field -->
        <div class="mb-6 relative">
          <label for="status" class="block text-sm font-medium text-gray-900">Status</label>
          <select id="status" v-model="newItem.status" :class="{ 'border-red-500': v$.status.$error }"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5">
            <option value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
          <span v-if="v$.status.$error" class="text-red-500 text-sm absolute">
            {{ v$.status.$errors.map((error) => error.$message).join(' | ') }}
          </span>
        </div>

        <!-- Plan Field -->
        <div class="mb-6 relative">
          <label for="plan" class="block text-sm font-medium text-gray-900">Plan</label>
          <select id="plan" v-model="newItem.plan" :class="{ 'border-red-500': v$.status.$error }"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5">
            <option value="">Select Plan</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Premium">Premium</option>
            <option value="Elite">Elite</option>
          </select>
          <span v-if="v$.plan.$error" class="text-red-500 text-sm absolute">
            {{ v$.plan.$errors.map((error) => error.$message).join(' | ') }}
          </span>
        </div>

        <!-- Amount Field -->
        <div class="mb-6 relative">
          <label for="amount" class="block text-sm font-medium text-gray-900">Amount</label>
          <input type="number" min="0" max="100" step="0.01" id="amount" v-model="newItem.amount"
            :class="{ 'border-red-500': v$.amount.$error }"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder="Amount" />
          <span v-if="v$.amount.$error" class="text-red-500 text-sm absolute">
            {{ v$.amount.$errors.map((error) => error.$message).join(' | ') }}
          </span>
        </div>


      </div>
      <div class="space-x-5">
        <button @click="handleAdd"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-full text-md px-5 py-2.5 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">Add</button>
        <button @click="handleClose"
          class="text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-full text-md px-5 py-2.5 font-semibold disabled:bg-gray-200 disabled:cursor-not-allowed">Cancel</button>
      </div>
    </div>
  </div>
</template>