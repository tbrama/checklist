<script lang="ts" setup>
const authStore = useAuthStore();

if (!authStore.$state.token) {
  useRouter().replace("/");
}

const isLoading = ref(false);

const getAllCheck = async () => {
  isLoading.value = true;
};
</script>

<template>
  <div>Page: foo</div>
</template>

<style scoped></style>
