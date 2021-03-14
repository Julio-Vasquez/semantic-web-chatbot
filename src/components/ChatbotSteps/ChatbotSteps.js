import { ChatbotQuery } from "./../ChatbotQuery";

export const ChatbotSteps = [
  {
    id: "1",
    message: "Bup, Bup, Soy SemanticBot, Espero estes bien humano.",
    trigger: "2",
  },
  {
    id: "2",
    message: "Busca algo en Wikipédia. (Ejemplo: Colombia)",
    trigger: "search",
  },
  {
    id: "search",
    user: true,
    trigger: "4",
  },
  {
    id: "4",
    component: <ChatbotQuery />,
    waitAction: true,
    trigger: "2",
  },
];
