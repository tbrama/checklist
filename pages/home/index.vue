<script lang="ts" setup>
const authStore = useAuthStore();

const { resAllCheck, allCheckAPI, resDeleteCheck, deleteCheckAPI } = useApi();
const isLoading = ref(false);

const getAllCheck = async () => {
  isLoading.value = true;
  await allCheckAPI();
  isLoading.value = false;
};

const deleteCheck = async (id: number) => {
  isLoading.value = true;
  await deleteCheckAPI(id);
  await allCheckAPI();
  isLoading.value = false;
};

const showFormCheck = () => {
  const modEl: HTMLDialogElement | null = document.querySelector("#checkFrom");
  if (modEl) modEl.showModal();
};

const checkId = ref(0);
const showFormCheckItem = (id: number) => {
  checkId.value = id;
  const modEl: HTMLDialogElement | null =
    document.querySelector("#checkItemFrom");
  if (modEl) modEl.showModal();
};

onMounted(() => {
  if (!authStore.$state.token) {
    useRouter().replace("/");
    return;
  }
  getAllCheck();
});
</script>

<template>
  <div class="h-[100dvh] flex flex-col gap-4 p-4 bg-slate-50">
    <div>
      <button
        @click="showFormCheck"
        type="button"
        class="bg-blue-500 p-2 rounded text-slate-50"
      >
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
        <p v-if="item.items">Item:</p>
        <div v-if="item.items" v-for="det in item.items" class="border-b">
          <p>{{ det.name }}</p>
          <p>
            status item:
            {{ det.itemCompletionStatus ? "Selesai" : "Belum Selesai" }}
          </p>
        </div>
        <div>
          <button
            @click="showFormCheckItem(item.id)"
            type="button"
            class="bg-green-700 p-1 rounded text-slate-50 text-xs mt-2"
          >
            Tambah item
          </button>
        </div>
      </div>
    </div>
    <ModalTambahCheck @show-load="isLoading = !isLoading" @done="getAllCheck" />
    <ModalTambahCheckItem
      :id-check="checkId"
      @show-load="isLoading = !isLoading"
      @done="getAllCheck"
    />
    <Loading :is-loading="isLoading" />
  </div>
</template>

<style scoped></style>
