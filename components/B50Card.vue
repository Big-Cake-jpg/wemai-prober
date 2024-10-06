<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl m-auto mb-25">
      <div class="order-first col-span-1">
        <mdui-select
          placeholder="数据源 / 查分器"
          :value="provider"
          @change="handleProviderChanged"
          required="true"
        >
          <mdui-icon-data-object slot="icon"></mdui-icon-data-object>
          <mdui-menu-item value="diving-fish">
            <mdui-icon-water-drop slot="icon"></mdui-icon-water-drop
            >水鱼</mdui-menu-item
          >
          <mdui-menu-item value="lxns" disabled>
            <mdui-icon-icecream slot="icon"></mdui-icon-icecream
            >落雪</mdui-menu-item
          >
        </mdui-select>
      </div>
      <div>
        <mdui-text-field
          label="用户名"
          placeholder="maimai"
          :value="userName"
          @input="handleUserNameChanged"
          required="true"
          ><mdui-icon-account-circle slot="icon"></mdui-icon-account-circle
        ></mdui-text-field>
      </div>
      <div class="col-span-2">
        <mdui-button
          full-width
          @click="queryPlayerData()"
          :disabled="isButtonDisabled || inProgress"
          :loading="inProgress"
          ><mdui-icon-search slot="icon"></mdui-icon-search
          >查询成绩</mdui-button
        >
      </div>
    </div>
    <div class="max-w-7xl w-full text-center m-auto mdui-prose" v-if="idle">
      <NuxtImg src="/assets/maimai/aime.png" width="128" height="128"></NuxtImg>
      <b><p>还未开始查询数据</p></b>
      <p>尝试通过用户名查询数据吧</p>
    </div>
    <div
      class="max-w-7xl w-full text-center m-auto mdui-prose"
      v-if="networkError"
    >
      <NuxtImg
        src="/assets/maimai/network-indicator/disconnected.png"
        width="128"
        height="128"
      ></NuxtImg>
      <b><p>网络连接错误</p></b>
      <p>请检查你的网络连接</p>
      <mdui-button @click="queryPlayerData()" variant="elevated"
        ><mdui-icon-refresh slot="icon"></mdui-icon-refresh>重试</mdui-button
      >
    </div>
    <div class="max-w-7xl w-full text-center m-auto mdui-prose" v-if="noData">
      <NuxtImg
        src="/assets/maimai/bear-dead.png"
        width="128"
        height="128"
      ></NuxtImg>
      <b><p>没有数据</p></b>
      <p>没有获取到该玩家的成绩</p>
    </div>
    <div
      class="max-w-7xl w-full text-center m-auto mdui-prose"
      v-if="inexistentPlayer"
    >
      <NuxtImg
        src="/assets/maimai/network-indicator/issue.png"
        width="128"
        height="128"
      ></NuxtImg>
      <b><p>玩家不存在</p></b>
      <p>找不到该玩家</p>
    </div>
    <div
      class="max-w-7xl w-full text-center m-auto mdui-prose"
      v-if="inProgress"
    >
      <mdui-circular-progress class="mb-10"></mdui-circular-progress>
      <b><p>正在获取数据</p></b>
      <p>别着急，坐和放宽</p>
    </div>
    <div
      class="max-w-7xl w-full m-auto"
      v-if="!idle && !networkError && !noData && !inexistentPlayer && !inProgress"
    >
      <MusicCard :playerData="playerData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

import { snackbar } from "mdui/functions/snackbar.js";

const provider = ref("diving-fish");
const userName = ref("");
const networkError = ref(false);
const noData = ref(false);
const inProgress = ref(false);
const inexistentPlayer = ref(false);
const idle = ref(true);
const playerData = ref({});

const divingfish = axios.create({
  baseURL: "https://www.diving-fish.com/api/maimaidxprober/",
  timeout: 5000,
});

const isButtonDisabled = computed(() => {
  return provider.value === "" || userName.value === "";
});

function handleProviderChanged(event: { target: { value: string } }) {
  provider.value = event.target.value;
}

function handleUserNameChanged(event: { target: { value: string } }) {
  userName.value = event.target.value;
}

/* async function getDivingFishMusicData() {
  const response = await divingfish.get("/music_data");
  const data = response.data;
  snackbar({
    message: `已获取到水鱼乐曲数据`,
    placement: "bottom",
    closeable: true,
  });
} */

async function getDivingFishPlayerData() {
  const response = await divingfish.post("/query/player", {
    username: userName.value,
    b50: true,
  });
  playerData.value = response.data;
  snackbar({
    message: "已获取到水鱼玩家数据",
    placement: "bottom",
    closeable: true,
  });
  inProgress.value = false;
}

async function queryPlayerData() {
  inProgress.value = true;
  networkError.value = false;
  inexistentPlayer.value = false;
  idle.value = false;
  umTrackEvent('queryPlayerData', { provider: provider.value, username: userName.value });
  getDivingFishPlayerData().catch((error) => {
    inProgress.value = false;
    if (error.response.status === 400) {
      inexistentPlayer.value = true;
    } else {
      networkError.value = true;
    }
  });
}

onMounted(() => {
  /* getDivingFishMusicData().catch(() => {
    networkError.value = true;
  }); */
});
</script>
