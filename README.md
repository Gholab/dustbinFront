# DustbinApp 🗑️📱

SmartBin’s mobile application built with **React Native** and **Expo Router**.
The app connects to smart bins via BLE, fetches data from the backend, and displays real-time alerts and statistics about trash fill levels.

---

## 📦 Requirements

* [Node.js](https://nodejs.org/) (>= 18.x)
* [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
* Android Studio / Xcode (if running on Android or iOS locally) with an ANDROID_HOME environment variable set to the SDK path
* A [backend](https://github.com/eliotmnrt/backendSmartBin) instance deployed (NestJS + InfluxDB, e.g., on Railway)

---

## 🚀 Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/Gholab/dustbinFront
npm install
```

---

## ⚙️ Environment Configuration

In your project root, create one files:

### `.env.local`

```ini
OPENAI_API_KEY=your-local-api-key
```

Environment variables are loaded via `app.config.js` into `expo-constants`.

---

## 🖥️ Run in Development

The app uses environment variables for flexibility (`dev` vs `prod`).

### Run with dev backend

```sh
npm run android:dev   # Launch on Android with dev version (backend on localhost:3000)
```

### Run with prod backend

```sh
npm run android:prod # Launch on Android with prod version (backend on https://smartbin-backend-production.up.railway.app)
```

---

## 📱 Features

* 🔗 Connect to SmartBins via **BLE**
* 📊 Real-time monitoring of **fill levels** and **battery**
* ⚠️ Alert system with persistent history (bin full, trash detected, etc.)
* 🌐 Ecological chatbot assistant (**SmartBinBot**)
* 📈 Data visualization with charts
* 🔔 Local push notifications for critical alerts

---

## 📝 License
This project is licensed under for the Danang International Institute of Technology

## 👥 Contributing
* [Hajar El Gholabzouri](https://github.com/Gholab)
* [Eliot Menoret](https://github.com/eliotmnrt)