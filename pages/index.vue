<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <Head>
    <Title>首页</Title>
  </Head>
  <div>
    <div class="mdui-prose text-center m-auto max-w-3xl">
        <NuxtImg src="/favicon.png" width="192" height="192"></NuxtImg>
        <h1>Wemai 网页查分器</h1>
        <p>一个简单的 舞萌 DX & <del>中二节奏</del>（开发中）国服查分器，供玩家查询自己的成绩。</p>
        <p>支持水鱼、<del>落雪</del>（后期支持）作为数据源。</p>
    </div>
  </div>
</template>
