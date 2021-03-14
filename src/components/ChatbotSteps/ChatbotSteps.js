import React from 'react'
import ChatBot from 'react-simple-chatbot'

import { ChatbotQuery} from './../ChatbotQuery'

export const ChatbotSteps = () => {
  const steps = [
    {
      id: '1',
        message: 'buscar pais en Wikipédia. (Ex.: Brazil)',
        trigger: 'search',
    },{
      id: 'search',
        user: true,
        trigger: '3',
    },{
      id: '3',
        component: <ChatbotQuery />,
        waitAction: true,
        trigger: '1',
    }
  ];

  return (
    <ChatBot steps={steps}/>
  )
}
