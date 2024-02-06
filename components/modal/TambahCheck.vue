<script lang="ts" setup>
import { required, helpers, email, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const { resAddCheck, addCheckAPI } = useApi();

const emit = defineEmits(["show-load", "done"]);

const close = () => {
  const modEl: HTMLDialogElement | null = document.querySelector("#checkFrom");
  if (modEl) modEl.close();
};

const dataCheck = reactive({
  name: "",
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("Nama wajib di isi", required),
    },
  };
});

const v$ = useVuelidate(rules, dataCheck);

const postCheck = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    emit("show-load");
    await addCheckAPI(dataCheck);
    // console.log(resRegister.value);
    emit("show-load");
    emit("done");
  }
};
</script>

<template>
  <dialog id="checkFrom" class="bg-transparent">
    <div class="flex flex-col h-full">
      <div
        class="p-2 font-bold bg-blue-500 flex justify-between items-center rounded-t"
      >
        <p class="text-slate-50">Tambah Check</p>
        <button @click="close">
          <Icon name="mdi:close-circle" class="text-slate-50 text-xl" />
        </button>
      </div>
      <div
        class="flex-grow bg-slate-50 p-3 flex flex-col items-center gap-3 overflow-y-auto rounded-b"
      >
        <InputText
          id="name"
          label="Nama"
          class="w-[250px]"
          v-model="dataCheck.name"
          :error="v$.name.$error"
          :error-msg="v$.name.$errors.length ? v$.name.$errors[0].$message as string:''"
          @update:model-value="v$.name.$touch()"
        />
        <button
          @click="postCheck"
          type="button"
          class="bg-green-700 p-2 rounded text-slate-50 w-[250px] mt-4"
        >
          Tambah
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
::backdrop {
  background: black;
  opacity: 0.75;
}
dialog[open] {
  -webkit-animation: show 1s ease normal;
  animation: show 1s ease normal;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
