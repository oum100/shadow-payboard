<template>
    <q-date
      v-model="internalDate"
      @update:model-value="onDateChange"
      :model-value="selectedDate"
      mask="YYYY-MM"
      format="MMMM YYYY"
      :options="dateOptions"
      calendar="month"
      locale="en-us"
    />
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  // Props
  const props = defineProps({
    selectedDate: {
      type: String,
      default: ''
    }
  });
  
  // Emit
  const emit = defineEmits(['update:selectedDate']);
  
  // Internal state for the date picker
  const internalDate = ref(props.selectedDate);
  
  // Watch for changes in the internal date and emit updates to the parent
  watch(
    () => props.selectedDate,
    (newValue) => {
      internalDate.value = newValue;
    }
  );
  
  const onDateChange = (newDate) => {
    emit('update:selectedDate', newDate);
  };
  
  // Configure available date options to only allow selection of months
  const dateOptions = (date) => {
    // Any logic to enable/disable specific months
    // For now, allow all months
    return true;
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  