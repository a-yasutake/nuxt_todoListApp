import { Configuration } from "@nuxt/types";

const nuxtConfig: Configuration = {
  buildModules: ["@nuxt/typescript-build"],
  modules: ["@nuxtjs/dotenv"],
  css: ["@/assets/css/reset.css"],
};
module.exports = nuxtConfig;
