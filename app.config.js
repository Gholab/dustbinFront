export default () => ({
    expo: {
      name: "SmartBin",
      slug: "smartbin",
      assetBundlePatterns: ["**/*"],
      extra: {
        openaiApiKey: process.env.OPENAI_API_KEY,
      },
    },
  });