<script lang="ts" setup>
const props = defineProps({
  id: String,
  label: String,
  placeholder: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  error: Boolean,
  errorMsg: String,
  disable: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue", "get-enter", "hide-search"]);
const { width } = useWindowSize();
const valInput = ref(props.modelValue);
// onClickOutside(srchI, () => emit("hide-search"));

// watchDebounced(
//   valInput,
//   () => {
//     // console.log("changed!", valInput.value);
//     emit("update:modelValue", valInput.value);
//   },
//   { debounce: 500, maxWait: 3000 }
// );

watch(
  () => props.modelValue,
  (newModel) => {
    valInput.value = newModel;
  }
);

const enterKey = (e: any) => {
  emit("get-enter", valInput.value);
  emit("hide-search");
};

const updateValue = (e: Event) => {
  emit("update:modelValue", valInput.value);
};
</script>

<template>
  <div class="relative">
    <label class="font-sans" :for="id">{{ label }}</label>
    <div class="relative mt-1">
      <input
        type="text"
        :placeholder="placeholder"
        class="rounded px-4 w-full border py-2 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 placeholder:text-sm focus:ring-2 focus:ring-transparent focus:border-dark-green"
        autocomplete="off"
        v-model="valInput"
        @keyup="updateValue"
        @keyup.enter="enterKey"
        :disabled="disable"
      />
    </div>
    <p
      v-if="error"
      class="text-xs font-normal text-right absolute right-0 text-red-600"
    >
      {{ errorMsg }}
    </p>
  </div>
</template>

<style scoped></style>
