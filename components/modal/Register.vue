<script lang="ts" setup>
import { required, helpers, email, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const { resRegister, regsiterAPI } = useApi();

const emit = defineEmits(["show-load", "show-message"]);

const close = () => {
  const modEl: HTMLDialogElement | null = document.querySelector("#regform");
  if (modEl) modEl.close();
};

const dataReg = reactive({
  password: "",
  passwordMatch: "",
  username: "",
  email: "",
});

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Username wajib di isi", required),
    },
    password: {
      required: helpers.withMessage("Password wajib di isi", required),
    },
    passwordMatch: {
      required: helpers.withMessage("Password wajib di isi", required),
      sameas: helpers.withMessage(
        "Password tidak sama",
        sameAs(dataReg.password)
      ),
    },
    email: {
      required: helpers.withMessage("Email wajib di isi", required),
      email: helpers.withMessage("Format email tidak sesuai", email),
    },
  };
});

const v$ = useVuelidate(rules, dataReg);

const postReg = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    emit("show-load");
    await regsiterAPI(dataReg);
    // console.log(resRegister.value);
    if (resRegister.value && resRegister.value.statusCode == 2000) {
      close();
      emit("show-message", resRegister.value.message);
    }
    emit("show-load");
  }
};
</script>

<template>
  <dialog id="regform" class="bg-transparent">
    <div class="flex flex-col h-full">
      <div
        class="p-2 font-bold bg-blue-500 flex justify-between items-center rounded-t"
      >
        <p class="text-slate-50">Register</p>
        <button @click="close">
          <Icon name="mdi:close-circle" class="text-slate-50 text-xl" />
        </button>
      </div>
      <div
        class="flex-grow bg-slate-50 p-3 flex flex-col items-center gap-3 overflow-y-auto rounded-b"
      >
        <InputText
          id="email"
          label="Email"
          class="w-[250px]"
          v-model="dataReg.email"
          :error="v$.email.$error"
          :error-msg="v$.email.$errors.length ? v$.email.$errors[0].$message as string:''"
          @update:model-value="v$.email.$touch()"
        />
        <InputText
          id="username"
          label="Username"
          class="w-[250px]"
          v-model="dataReg.username"
          :error="v$.username.$error"
          :error-msg="v$.username.$errors.length ? v$.username.$errors[0].$message as string:''"
          @update:model-value="v$.username.$touch()"
        />
        <InputPassword
          id="pass"
          label="Password"
          class="w-[250px]"
          v-model="dataReg.password"
          :error="v$.password.$error"
          :error-msg="v$.password.$errors.length ? v$.password.$errors[0].$message as string:''"
          @update:model-value="v$.password.$touch()"
        />
        <InputPassword
          id="passMatch"
          label="Confirm Password"
          class="w-[250px]"
          v-model="dataReg.passwordMatch"
          :error="v$.passwordMatch.$error"
          :error-msg="v$.passwordMatch.$errors.length ? v$.passwordMatch.$errors[0].$message as string:''"
          @update:model-value="v$.passwordMatch.$touch()"
        />
        <button
          @click="postReg"
          type="button"
          class="bg-yellow-700 p-2 rounded text-slate-50 w-[250px]"
        >
          Register
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
