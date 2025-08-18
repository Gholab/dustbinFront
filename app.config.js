export default ({config}) => ({
    ...config,
    name: "DustbinApp",
    slug: "dustbinapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "dustbinapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.gholab.smartbin"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },

    assetBundlePatterns: ["**/*"],
    extra: {
      router: {},
      eas: {
        projectId: "5f6a6df9-8fa3-412a-8b53-ac7bd2b36a76"
      },
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  });