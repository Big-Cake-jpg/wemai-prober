<template>
  <div>
    <NuxtLoadingIndicator
      color="rgb(var(--mdui-color-inverse-primary))"
      errorColor="rgb(var(--mdui-color-error))"
    />
    <AppBar />
    <NuxtLayout class="mt-2">
      <NuxtPage />
    </NuxtLayout>
    <BackToTop />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import "mdui/components/top-app-bar.js";
import "mdui/components/top-app-bar-title.js";
import "mdui/components/button-icon.js";
import "mdui/components/dropdown.js";
import "mdui/components/menu.js";
import "mdui/components/menu-item.js";
import "mdui/components/tooltip.js";
import "mdui/components/navigation-drawer.js";
import "mdui/components/list.js";
import "mdui/components/list-item.js";
import "mdui/components/list-subheader.js";
import "@mdui/icons/brightness-4.js";
import "@mdui/icons/menu.js";
import "@mdui/icons/color-lens--outlined.js";
import "mdui/components/button.js";
import 'mdui/components/select.js';
import '@mdui/icons/data-object.js';
import '@mdui/icons/icecream.js';
import '@mdui/icons/water-drop.js';
import '@mdui/icons/search.js';
import 'mdui/components/text-field.js';
import '@mdui/icons/account-circle.js';
import 'mdui/components/card.js';
import '@mdui/icons/refresh.js';
import 'mdui/components/circular-progress.js';
import 'mdui/components/fab.js'
import '@mdui/icons/arrow-upward.js';

import { setColorScheme } from "mdui/functions/setColorScheme.js";
import { useThemeColorStore } from "./store/themeColor.ts";

const appConfig = useAppConfig();
const { path } = useRoute();
const themeColorStore = useThemeColorStore();
const themeColor = computed(() => themeColorStore.themeColor);

setColorScheme(themeColorStore.themeColor);

watch(themeColor, (newColor) => {
  setColorScheme(newColor);
});

onMounted(() => {
  umTrackView();
});

useHead({
  title: appConfig.title,
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appConfig.title}` : appConfig.title;
  },
  htmlAttrs: {
    lang: "zh-CN",
  },
  meta: [
    {
      name: "description",
      content: appConfig.description,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${appConfig.hostname}${path}`,
    },
    {
      rel: "icon",
      type: "image/png",
      href: appConfig.favicon,
    },
  ],
});

useSeoMeta({
  title: appConfig.title,
  ogTitle: appConfig.title,
  description: appConfig.description,
  ogDescription: appConfig.description,
  ogImage: appConfig.favicon,
});
</script>

<style>
:not(:defined) {
  visibility: hidden;
}

body {
  font-family: "Noto Sans SC";
  font-display: optional;
}
</style>
