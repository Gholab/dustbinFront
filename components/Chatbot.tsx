"use client"

import Constants from "expo-constants";
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native"



// 👉 remplace ta vraie clé ici ou charge depuis Constants.expoConfig.extra...
const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiApiKey;

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:`
	  Tu es EcoBot, un assistant IA spécialisé en développement durable et écologie. 
      Tes domaines d'expertise incluent :
      - Développement durable et objectifs de développement durable (ODD)
      - Écologie et protection de l'environnement
      - Énergies renouvelables et transition énergétique
      - Consommation responsable et économie circulaire
      - Agriculture durable et alimentation responsable
      - Transport écologique et mobilité durable
      - Gestion des déchets et recyclage
      - Biodiversité et conservation
      - Changement climatique et adaptation
      - Technologies vertes et innovations durables
      - Politiques environnementales
      - RSE (Responsabilité Sociétale des Entreprises)
      
      Instructions :
      - Réponds toujours en anglais
      - Sois précis, informatif et encourageant
      - Propose des solutions concrètes et réalisables
      - Utilise des exemples pratiques quand c'est pertinent
      - Si la question n'est pas liée au développement durable, redirige poliment vers ton domaine d'expertise
      - Encourage les bonnes pratiques environnementales
      - Reste optimiste tout en étant réaliste sur les défis environnementaux
      - Utilise des émojis appropriés pour rendre tes réponses plus engageantes (🌱, 🌍, ♻️, etc.)`.trim()
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "API error");

      const content = data.choices[0].message.content;
      setResponse(content);
    } catch (err: any) {
      console.log("Erreur", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 EcoBot</Text>

      <TextInput
        style={styles.input}
        placeholder="Ask something about recycling..."
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity onPress={handleSubmit}>
		<View style={styles.Button}>
		  <Text style={{ color: "#00796B", fontWeight: "bold", fontSize: 20 }}>Ask EcoBot</Text>
		</View>
	  </TouchableOpacity>
	

      {loading && <ActivityIndicator size="large" color="#00796B" style={{ margin: 20 }} />}

      <ScrollView style={styles.responseBox}>
        <Text>{response}</Text>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  padding: 20,
	  paddingTop: 60,
	  backgroundColor: '#f0f4f3',
	},
	title: {
	  fontSize: 24,
	  fontWeight: 'bold',
	  marginBottom: 20,
	  color: '#1B4332',
	},
	input: {
	  borderWidth: 1,
	  borderColor: '#ccc',
	  padding: 10,
	  borderRadius: 12,
	  marginBottom: 10,
	  backgroundColor: '#fff',
	},
	Button: {
	  backgroundColor: '#e0eaba',
	  padding: 15,
	  borderRadius: 12,
	  alignItems: 'center',
	  justifyContent: 'center',
	  fontSize: 16,
	},
	responseBox: {
	  marginTop: 20,
	  backgroundColor: '#e0eaba',
	  padding: 15,
	  borderRadius: 10,
	  maxHeight: 300,
	},
  });
  