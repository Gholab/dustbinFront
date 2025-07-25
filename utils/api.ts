import Constants from "expo-constants"

export const generateAPIUrl = (relativePath: string) => {
  const origin = Constants.experienceUrl?.replace("exp://", "http://") || "http://192.168.1.216:8081"
  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`
    console.log(`Origin: ${origin}, Path: ${path}`)
  if (process.env.NODE_ENV === "development") {
    return origin.concat(path)
  }

  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    throw new Error("EXPO_PUBLIC_API_BASE_URL environment variable is not defined")
  }

  console.log(`Using API base URL: ${process.env.EXPO_PUBLIC_API_BASE_URL.concat(path)}`);
  
  return process.env.EXPO_PUBLIC_API_BASE_URL.concat(path)
}
