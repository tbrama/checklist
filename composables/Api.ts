import type { Login } from "~/utils/interface/Login";
import type { Register } from "~/utils/interface/Register";

export const useApi = () => {
  const baseURL = "http://94.74.86.174:8080/api";

  const authStore = useAuthStore();

  const resRegister = ref<Register>();
  const regsiterAPI = async (data: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      resRegister.value = await $fetch(baseURL + "/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });
    } catch (error) {
      const textError = String(error);
      const txt = textError.replaceAll("(", "");
      const splitError = txt.split(" ");
      throw createError({
        statusCode: parseInt(splitError[2]),
        message: "Register",
        fatal: true,
      });
    }
  };

  const resLogin = ref<Login>();
  const loginAPI = async (data: { username: string; password: string }) => {
    try {
      resLogin.value = await $fetch(baseURL + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });
    } catch (error) {
      const textError = String(error);
      if (textError.includes("401")) {
        console.log(error);
        return;
      }
      const txt = textError.replaceAll("(", "");
      const splitError = txt.split(" ");
      throw createError({
        statusCode: parseInt(splitError[2]),
        message: "Login",
        fatal: true,
      });
    }
  };

  const resAllCheck = ref<Login>();
  const allCheckAPI = async () => {
    try {
      resAllCheck.value = await $fetch(baseURL + "/checklist", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authStore.$state.token}`,
        },
      });
    } catch (error) {
      const textError = String(error);
      if (textError.includes("401")) {
        authStore.resetToken();
        useRouter().replace("/");
        return;
      }
      const txt = textError.replaceAll("(", "");
      const splitError = txt.split(" ");
      throw createError({
        statusCode: parseInt(splitError[2]),
        message: "Login",
        fatal: true,
      });
    }
  };

  return {
    resRegister,
    regsiterAPI,
    resLogin,
    loginAPI,
    resAllCheck,
    allCheckAPI,
  };
};
