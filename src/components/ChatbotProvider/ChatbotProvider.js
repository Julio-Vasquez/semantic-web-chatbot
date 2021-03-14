import ChatBot from "react-simple-chatbot";

import { ChatbotSteps } from '../ChatbotSteps';

export const ChatbotProvider = () => 
  <ChatBot 
    headerTitle="SemanticBot"
    speechSynthesis={{ enable: true, lang: 'es' }}
    placeholder="Escriba su busqueda"
    recognitionEnable={true}
    steps={ChatbotSteps} 
  />;
