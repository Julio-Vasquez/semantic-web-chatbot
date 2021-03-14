import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

export const Chatbot = () => {
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#f51",
    headerFontColor: "#fff",
    headerFontSize: "20px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#f51",
  };

  const steps = [
    {
      id: "hello-world",
      message: "me la pela todo!",
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} />
    </ThemeProvider>
  );
};
