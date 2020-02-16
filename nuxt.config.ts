import { Configuration } from "@nuxt/types";

const nuxtConfig: Configuration = {
  buildModules: ["@nuxt/typescript-build"],
  modules: ["@nuxtjs/dotenv"]
};
module.exports = nuxtConfig;
