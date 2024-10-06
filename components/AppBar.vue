<template>
  <mdui-top-app-bar scroll-behavior="elevate">
    <mdui-tooltip content="菜单">
      <mdui-button-icon alt="菜单" @click="toggleDrawer()">
        <mdui-icon-menu></mdui-icon-menu>
      </mdui-button-icon>
    </mdui-tooltip>
    <NuxtLink to="/" class="no-underline"
      ><mdui-top-app-bar-title>{{
        appConfig.title
      }}</mdui-top-app-bar-title></NuxtLink
    >
    <div style="flex-grow: 1"></div>

    <mdui-dropdown trigger="hover" placement="bottom-end">
      <mdui-button-icon slot="trigger" title="选择主色调">
        <mdui-icon-color-lens--outlined></mdui-icon-color-lens--outlined>
      </mdui-button-icon>
      <mdui-menu
        selects="single"
        :value="themeColor"
        @change="updateThemeColor($event.target.value)"
      >
        <mdui-menu-item value="#fb3922">DX</mdui-menu-item>
        <mdui-menu-item value="#ffff12">Splash</mdui-menu-item>
        <mdui-menu-item value="#54bdff">UNiVERSE</mdui-menu-item>
        <mdui-menu-item value="#d49aff">FESTiVAL</mdui-menu-item>
        <mdui-menu-item value="#ffb46e">BUDDiES</mdui-menu-item>
        <mdui-menu-item value="#9afdf8">PRiSM</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>

    <mdui-dropdown trigger="hover" placement="bottom-end">
      <mdui-button-icon slot="trigger" title="选择主题">
        <mdui-icon-brightness-4></mdui-icon-brightness-4>
      </mdui-button-icon>
      <mdui-menu
        selects="single"
        :value="$colorMode.preference"
        @change="$colorMode.preference = $event.target.value"
      >
        <mdui-menu-item value="system">跟随系统</mdui-menu-item>
        <mdui-menu-item value="light">始终浅色</mdui-menu-item>
        <mdui-menu-item value="dark">始终深色</mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
  </mdui-top-app-bar>

  <mdui-navigation-drawer
    modal
    close-on-esc
    close-on-overlay-click
    :open="isDrawerOpened"
    @close="handleDrawerClose"
  >
    <mdui-list class="mdui-prose">
      <mdui-list-subheader>页面</mdui-list-subheader>
      <NuxtLink to="/"><mdui-list-item>首页</mdui-list-item></NuxtLink>
      <mdui-list-subheader>舞萌 DX</mdui-list-subheader>
      <NuxtLink to="/maimai/b50"><mdui-list-item>查询 B50</mdui-list-item></NuxtLink>
      <mdui-list-subheader>中二节奏</mdui-list-subheader>
      <mdui-list-item disabled>查询 B30</mdui-list-item>
    </mdui-list>
  </mdui-navigation-drawer>
</template>

<script setup lang="ts">
import { useThemeColorStore } from '@/store/themeColor.ts'

const isDrawerOpened = ref(false);
const themeColorStore = useThemeColorStore();
const themeColor = computed(() => themeColorStore.themeColor);

const appConfig = useAppConfig();
const colorMode = useColorMode();

function toggleDrawer() {
  isDrawerOpened.value = !isDrawerOpened.value;
}

function handleDrawerClose() {
  isDrawerOpened.value = false;
}

function updateThemeColor(color) {
  themeColorStore.themeColor = color;
}
</script>
