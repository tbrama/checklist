<script lang="ts" setup>
const authStore = useAuthStore();

if (!authStore.$state.token) {
  useRouter().replace("/");
}

const { resAllCheck, allCheckAPI } = useApi();
const isLoading = ref(false);

const getAllCheck = async () => {
  await allCheckAPI();
  console.log(resAllCheck.value);
};

onMounted(() => {
  isLoading.value = true;
  getAllCheck();
  isLoading.value = false;
});
</script>

<template>
  <div class="h-[100dvh] flex flex-col p-4 bg-slate-50">
    <div v-if="!isLoading && resAllCheck" class="flex gap-2">
      <div v-for="item in resAllCheck.data" class="p-4 rounded shadow">
        <p class="font-bold">
          {{ item.name }}
          <Icon
            :name="item.checklistCompletionStatus ? 'mdi:check' : 'mdi:close'"
          />
        </p>
        <p>Item:</p>
        <div v-if="item.items" v-for="det in item.items" class="border-b">
          <p>{{ det.name }}</p>
          <p>
            status item:
            {{ det.itemCompletionStatus ? "Selesai" : "Belum Selesai" }}
          </p>
        </div>
      </div>
    </div>
    <Loading :is-loading="isLoading" />
  </div>
</template>

<style scoped></style>
