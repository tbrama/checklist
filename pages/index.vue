<script lang="ts" setup>
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const loginForm = reactive({ password: "", username: "" });
const isLoading = ref(false);
const msg = ref("");
const { resLogin, loginAPI } = useApi();
const authStore = useAuthStore();

if (authStore.$state.token) {
  useRouter().replace("/home");
}

const rulesLog = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Username wajib di isi", required),
    },
    password: {
      required: helpers.withMessage("Password wajib di isi", required),
    },
  };
});

const vLog$ = useVuelidate(rulesLog, loginForm);

const getLogin = async () => {
  vLog$.value.$validate();
  console.log(vLog$.value.$error, loginForm);
  // if (!vLog$.value.$error) {
  isLoading.value = true;
  await loginAPI(loginForm);
  // console.log(resLogin.value);
  if (resLogin.value && resLogin.value.statusCode == 2110) {
    authStore.setToken(resLogin.value.data.token);
    useRouter().replace("/home");
  } else {
    const modEl: HTMLDialogElement | null = document.querySelector("#alert");
    if (modEl) {
      modEl.showModal();
      msg.value = "Username atau password salah";
    }
  }
  isLoading.value = false;
  // }
};

const showRegForm = () => {
  const modEl: HTMLDialogElement | null = document.querySelector("#regform");
  if (modEl) modEl.showModal();
};

const showMsg = (val: string) => {
  if (val) {
    const modEl: HTMLDialogElement | null = document.querySelector("#alert");
    if (modEl) {
      modEl.showModal();
      msg.value = val;
    }
  }
};
</script>

<template>
  <div class="h-[100dvh] flex flex-col items-center justify-center bg-slate-50">
    <div class="bg-slate-400 p-4 rounded flex flex-col gap-4">
      <InputText
        id="username"
        label="Username"
        class="w-[250px]"
        v-model="loginForm.username"
        :error="vLog$.username.$error"
        :error-msg="vLog$.username.$errors.length ? vLog$.username.$errors[0].$message as string:''"
        @update:model-value="vLog$.username.$touch()"
      />
      <InputPassword
        id="passLog"
        label="Password"
        class="w-[250px]"
        v-model="loginForm.password"
        :error="vLog$.password.$error"
        :error-msg="vLog$.password.$errors.length ? vLog$.password.$errors[0].$message as string:''"
        @update:model-value="vLog$.username.$touch()"
      />
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="showRegForm"
          type="button"
          class="bg-yellow-700 p-2 rounded text-slate-50"
        >
          Register
        </button>
        <button
          @click="getLogin"
          type="button"
          class="bg-blue-500 p-2 rounded text-slate-50"
        >
          Login
        </button>
      </div>
    </div>
    <ModalBase id="alert" title="Peringatan">
      <p>{{ msg }}</p>
    </ModalBase>
    <ModalRegister
      @show-message="showMsg"
      @show-load="isLoading = !isLoading"
    />
  </div>
</template>

<style scoped></style>
