<template>
    <div class="fixed bottom-0 right-0 m-8">
        <mdui-fab @click="backToTop" alt="返回顶部">
            <mdui-icon-arrow-upward slot="icon"></mdui-icon-arrow-upward>
        </mdui-fab>
    </div>
</template>

<script setup lang="ts">
import { isClient } from "@vueuse/core";

function backToTop() {
  if (!isClient) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>