import { defineStore } from "pinia";

export const useThemeColorStore = defineStore(
  "themeColor",
  () => {
    const themeColor = ref("#ffb46e");
    return { themeColor };
  },
  {
    persist: true,
  }
);
