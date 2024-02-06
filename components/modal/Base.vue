<script lang="ts" setup>
const props = defineProps({
  id: { type: String, required: true },
  title: String,
});

const close = () => {
  const modEl: HTMLDialogElement | null = document.querySelector(
    "#" + props.id
  );
  if (modEl) modEl.close();
};
</script>

<template>
  <dialog :id="id" class="bg-transparent w-[45%]">
    <div class="flex flex-col h-full">
      <div
        class="p-2 font-bold bg-blue-500 flex justify-between items-center rounded-t"
      >
        <p class="text-slate-50">{{ title }}</p>
        <button @click="close">
          <Icon name="mdi:close-circle" class="text-slate-50 text-xl" />
        </button>
      </div>
      <div
        class="flex-grow bg-slate-50 p-3 flex flex-col gap-3 overflow-y-auto rounded-b"
      >
        <slot />
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
