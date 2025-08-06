import { StyleSheet, SafeAreaView } from "react-native";
import WebView from "react-native-webview";

const jsCode = `
  document.getElementById("email").value = "Arnaud";
  document.getElementById("password").value = "arnaud";
	const buttons = document.querySelectorAll("button[type='submit']");
	if (buttons.length > 0) {
		buttons[0].click();
		console.log("Login button clicked");
	}
	`;

export default function ViewLoraApp() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://neturna.nytuo.fr/' }}
        style={styles.webview}
				injectedJavaScript={jsCode}
				javaScriptEnabled={true}
				onMessage={(event) => console.log('message from web:', event.nativeEvent.data)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
	},
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  webviewWrapper: {
		flex: 1,
		width: '100%',
		height: '100%',
  },
  webview: {
		width: '100%',
		height: '100%',
	},
});