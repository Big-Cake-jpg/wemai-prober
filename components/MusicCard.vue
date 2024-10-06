<template>
  <div>
    <div class="mdui-prose">
      <h2>玩家数据</h2>
      <p>昵称: {{ playerData.nickname }}</p>
      <div class="flex items-center">
        <div
          :style="{
            backgroundImage: `url(/assets/maimai/dx-rating/${ratingPlate})`,
          }"
          class="w-42 text-6 p-2.5 text-white bg-cover bg-center"
        >
          <p class="ml-48%">{{ playerData.rating }}</p>
        </div>
        <div class="mb-0 ml-2 mt-2">
          <NuxtImg
            :src="`/assets/maimai/rank-certification/${rankPlate}`"
            width="84"
            height="84"
          ></NuxtImg>
        </div>
      </div>
    </div>
    <h3 class="mdui-prose">乐曲数据</h3>
    <div v-for="(chartType, type) in sortedCharts" :key="type" class="mb-4">
      <h4 class="mdui-prose">{{ type.toUpperCase() }}</h4>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div
          v-for="chart in chartType"
          :key="chart.song_id"
          class="text-white p-2.5 shadow-lg rounded-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          :style="{ backgroundColor: chartBackground(chart.level_label) }"
        >
          <div class="flex items-center">
            <NuxtImg
              :src="getSongCoverUrl(chart.song_id)"
              width="64"
              height="64"
              class="rounded-lg"
              placeholder="/assets/maimai/placeholder.png"
            ></NuxtImg>
            <span class="ml-2">{{ chart.title }}</span>
          </div>
          <p class="text-xl">
            <b>{{ chart.achievements }}%</b>
            <span class="mx-2">|</span>
            <span class="text-sm">{{ chart.ds }} / {{ chart.ra }}</span>
          </p>
          <p class="text-2xl">
            <b>{{ customRate(chart.rate) }}</b>
            <span class="mx-2">|</span>
            <span class="text-sm align-middle">
              <span v-if="chart.fc && chart.fs">
                {{ customFC(chart.fc) }} / {{ customFS(chart.fs) }}
              </span>
              <span v-else-if="chart.fc">
                {{ customFC(chart.fc) }}
              </span>
              <span v-else-if="chart.fs">
                {{ customFS(chart.fs) }}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  playerData: {
    type: Object,
    required: true,
  },
});

const sortedCharts = computed(() => {
  const charts = props.playerData.charts;
  return {
    旧乐谱: charts.sd || [],
    "DX 2024": charts.dx || [],
  };
});

const customRate = (rate: string) => {
  const rateMap = {
    sssp: "SSS+",
    sss: "SSS",
    ssp: "SS+",
    ss: "SS",
    sp: "S+",
    s: "S",
    aaa: "AAA",
    aa: "AA",
    a: "A",
  };
  return rateMap[rate as keyof typeof rateMap] || rate;
};

const customFC = (fc: string) => {
  const fcMap = {
    fc: "FC",
    fcp: "FC+",
  };
  return fcMap[fc as keyof typeof fcMap] || fc;
};

const customFS = (fs: string) => {
  const fsMap = {
    sync: "SYNC",
    fs: "FS",
    fsp: "FS+",
    fdx: "FDX",
    fdxp: "FDX+",
  };
  return fsMap[fs as keyof typeof fsMap] || fs;
};

const ratingPlate = computed(() => {
  const rating = props.playerData.rating;
  if (rating <= 999) return "white.png";
  if (rating <= 1999) return "blue.png";
  if (rating <= 3999) return "green.png";
  if (rating <= 6999) return "yellow.png";
  if (rating <= 9999) return "red.png";
  if (rating <= 11999) return "purple.png";
  if (rating <= 12999) return "bronze.png";
  if (rating <= 13999) return "silver.png";
  if (rating <= 14999) return "gold.png";
  return "rainbow.png";
});

const rankPlate = computed(() => {
  const rank = props.playerData.additional_rating;
  if (rank == 0) return "new-comer.png";
  if (rank == 1) return "1.png";
  if (rank == 2) return "2.png";
  if (rank == 3) return "3.png";
  if (rank == 4) return "4.png";
  if (rank == 5) return "5.png";
  if (rank == 6) return "6.png";
  if (rank == 7) return "7.png";
  if (rank == 8) return "8.png";
  if (rank == 9) return "9.png";
  if (rank == 10) return "10.png";
  if (rank == 11) return "11.png";
  if (rank == 12) return "12.png";
  if (rank == 13) return "13.png";
  if (rank == 14) return "14.png";
  if (rank == 15) return "15.png";
  if (rank == 16) return "16.png";
  if (rank == 17) return "17.png";
  if (rank == 18) return "18.png";
  if (rank == 19) return "19.png";
  if (rank == 20) return "20.png";
});

const chartBackground = (levelLabel: string) => {
  const backgroundMap = {
    Basic: "#5ab55e",
    Advanced: "#ffc03d",
    Expert: "#f7566d",
    Master: "#9e45e2",
    "Re:MASTER": "#e3c2fc",
  };
  return backgroundMap[levelLabel as keyof typeof backgroundMap];
};

const getSongCoverUrl = (songId: number) => {
  if (songId == 10411) {
    return "https://www.diving-fish.com/covers/00411.png";
  }
  const paddedSongId = songId.toString().padStart(5, "0");
  return `https://www.diving-fish.com/covers/${paddedSongId}.png`;
};
</script>
