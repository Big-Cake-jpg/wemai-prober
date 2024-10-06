<template>
  <div class="m-auto mdui-prose my-15">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="text-center lg:text-left">
          <a href="https://beian.miit.gov.cn" target="_blank"
            >晋 ICP 备 2024031556 号 - 1</a
          >
          <p>
            Copyright © {{ appConfig.since }} - {{ new Date().getFullYear() }}
            <a :href="appConfig.provider.link">{{ appConfig.provider.name }}</a>
          </p>
          <p>{{ hitokoto }}</p>
        </div>
        <div class="text-center lg:text-right">
          <p>Designed by Big_Cake</p>
          <p>Powered by <a href="https://nuxt.com" target="_blank">Nuxt.js</a> & <a href="https://www.mdui.org" target="_blank">MDUI</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

const hitokoto = ref("用代码表达言语的魅力，用代码书写山河的壮丽。");

onMounted(async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  const data = await res.json();
  hitokoto.value = data.hitokoto;
});
</script>

