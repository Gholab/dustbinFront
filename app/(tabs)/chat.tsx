import SustainableChatbot from "@/components/Chatbot"

// Permet les réponses en streaming jusqu'à 30 secondes
export const maxDuration = 30


export default function ecoChatbot() {
  console.log("Rendering EcoChatbot component");
  
  return (
    <SustainableChatbot apiBaseUrl={"https://api.openai.com/v1/chat/completions"} />
  )
}
