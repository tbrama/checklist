<script lang="ts" setup>
const authStore = useAuthStore();

const { resAllCheck, allCheckAPI, resDeleteCheck, deleteCheckAPI } = useApi();
const isLoading = ref(false);

const getAllCheck = async () => {
  await allCheckAPI();
};

const deleteCheck = async (id: number) => {
  isLoading.value = true;
  await deleteCheckAPI(id);
  await allCheckAPI();
  isLoading.value = false;
};

onMounted(() => {
  if (!authStore.$state.token) {
    useRouter().replace("/");
    return;
  }
  isLoading.value = true;
  getAllCheck();
  isLoading.value = false;
});
</script>

<template>
  <div class="h-[100dvh] flex flex-col gap-4 p-4 bg-slate-50">
    <div>
      <button type="button" class="bg-blue-500 p-2 rounded text-slate-50">
        Tambah Check List
      </button>
    </div>
    <div v-if="!isLoading && resAllCheck" class="flex gap-2">
      <div v-for="item in resAllCheck.data" class="p-4 rounded shadow">
        <div class="flex justify-between gap-4">
          <p class="font-bold">
            {{ item.name }}
            <Icon
              :name="item.checklistCompletionStatus ? 'mdi:check' : 'mdi:close'"
            />
          </p>
          <button @click="deleteCheck(item.id)" type="button">
            <Icon name="mdi:trash" class="text-red-600" />
          </button>
        </div>
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
