import SecureLS from "secure-ls";

const config = useRuntimeConfig();

const ls = new SecureLS({
  encodingType: "aes",
  isCompression: false,
  encryptionSecret: (config.keyLs as string) ?? "",
});

let tokenLs: string;

try {
  tokenLs = ls.get("tknCHK");
} catch (error) {
  localStorage.clear();
  location.reload();
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string>(tokenLs ? tokenLs : "");

  const setToken = (tkn: string) => {
    token.value = tkn;
    ls.set("tknCHK", token.value);
  };
  const resetToken = () => {
    token.value = "";
    ls.set("tknCHK", token.value);
  };

  return {
    token,
    setToken,
    resetToken,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
