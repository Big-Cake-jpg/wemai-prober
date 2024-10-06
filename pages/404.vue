<template>
  <Head>
    <Title>未找到页面</Title>
  </Head>
  <div>
    <div class="flex items-center justify-center h-screen">
      <div class="grid text-center">
        <div class="mdui-prose mb-10">
          <h1>Oops!</h1>
          <p>你想访问的页面可能已经更名或不存在。</p>
        </div>
        <NuxtLink to="/"
          ><mdui-button full-width variant="elevated"
            >返回首页</mdui-button
          ></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
