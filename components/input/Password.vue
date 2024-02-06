<script lang="ts" setup>
const props = defineProps({
  label: String,
  id: String,
  modelValue: String,
  error: Boolean,
  errorMsg: String,
  placeHolder: String,
  errColor: { type: String, default: "text-red-600" },
  color: { type: Boolean, default: false },
  dis: { type: Boolean, default: false },
  search: { type: Boolean, default: false },
  border: { type: String, default: "border rounded" },
  borderFocus: { type: String, default: "focus:border-[#FACC14]" },
});

const { width } = useWindowSize();

const emit = defineEmits(["update:modelValue", "input-enter"]);
// const textValue = ref("");
// textValue.value = props.modelValue as string;
const updateValue = (e: Event) => {
  // const fisrtIndex = (e.target as HTMLInputElement).value;
  // if (fisrtIndex == "0") {
  //   (e.target as HTMLInputElement).value = fisrtIndex.slice(1);
  // }
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};

const pressEnter = () => {
  emit("input-enter");
};

const typeInput = ref("password");
const toggleType = () => {
  if (typeInput.value == "password") {
    typeInput.value = "text";
  } else {
    typeInput.value = "password";
  }
};

const $input = useCssModule("input");
const focus = ref(false);

if (props.placeHolder == "Optional") focus.value = true;

const inputClasses = computed(() => {
  if (focus.value) {
    return $input.focused;
  } else {
    return;
  }
});

const textColor = computed(() => {
  if (props.color) {
    return "text-lightbrown-ms";
  }
  return;
});

const labelClasses = computed(() => {
  if (focus.value) {
    return;
  } else {
    return "w-[90%]";
  }
});

const inputFocus = () => {
  focus.value = true;
};

const inputBlur = () => {
  if (!props.modelValue && props.placeHolder != "Optional") {
    focus.value = false;
  }
};

if (props.modelValue) {
  focus.value = true;
}
</script>

<template>
  <div class="relative font-sans" :class="[inputClasses]">
    <label :class="[labelClasses]" :for="props.id">{{ props.label }}</label>
    <div class="relative">
      <input
        :id="props.id"
        autocomplete="off"
        :type="typeInput"
        class="rounded px-4 w-full border py-2 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 placeholder:text-sm focus:ring-2 focus:ring-transparent focus:border-dark-green"
        :class="[border, borderFocus]"
        @focus="inputFocus()"
        @blur="inputBlur()"
        :value="props.modelValue"
        @keyup="updateValue"
        @keyup.enter="pressEnter"
        :placeholder="placeHolder ? placeHolder : ''"
        :disabled="dis"
      />
      <span
        @click="toggleType"
        class="absolute right-3 top-1/2 -translate-y-1/2"
        ><Icon
          v-if="typeInput == 'password'"
          name="mdi:eye-off"
          class="self-center text-2xl text-black cursor-pointer"
        />
        <Icon
          v-else
          name="mdi:eye"
          class="self-center text-2xl text-black cursor-pointer"
        />
      </span>
    </div>
    <p v-show="error" class="text-xs font-normal text-right" :class="errColor">
      {{ errorMsg }}
    </p>
  </div>
</template>

<style module="input">
.formGroup {
  position: relative;
}
.focused .formLabel {
  color: #402020;
}
</style>
