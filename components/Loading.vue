<template>
  <div v-show="isLoading">
    <Teleport to="body">
      <div
        v-if="isLoading"
        class="fixed top-0 bottom-0 left-0 right-0 bg-load flex flex-col gap-2 items-center justify-center z-[99999]"
      >
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div v-if="showket" class="text-slate-50">
          <p>Mohon untuk menunggu sedang mengambil data</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isLoading: { type: Boolean, default: false },
  backColor: { type: String, default: "bg-white" },
  opacity: { type: String, default: "0.8" },
});

const showket = ref(false);
const tm = ref();
watch(
  () => props.isLoading,
  (newLoad) => {
    if (newLoad) {
      tm.value = setTimeout(() => {
        showket.value = true;
      }, 8000);
    } else {
      if (tm.value) {
        clearTimeout(tm.value);
      }
      showket.value = false;
    }
  }
);
</script>

<style scoped>
.bg-load {
  background: radial-gradient(
    rgba(20, 20, 20, v-bind(opacity)),
    rgba(0, 0, 0, v-bind(opacity))
  );

  background: -webkit-radial-gradient(
    rgba(20, 20, 20, v-bind(opacity)),
    rgba(0, 0, 0, v-bind(opacity))
  );
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #285430;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #285430 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
