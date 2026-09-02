import { useState, useCallback, useRef } from 'react';
import { ChatMessage, CitedSource, IndianStandard } from '../types/bis';
import { AIAssistantService } from '../services/aiAssistantService';

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-init',
  sender: 'assistant',
  text: `### 🇮🇳 Namaste! Welcome to BIS Intelligent Compliance Assistant

I am your official AI compliance companion for **Indian Standards (IS)**, **Quality Control Orders (QCOs)**, and **BIS Certifications** (ISI Mark, CRS, Hallmarking, FMCS).

Ask me any product question in plain English or Hindi (e.g., *"How do I get ISI mark for packaged drinking water?"*, *"What tests are mandatory for EV batteries?"*, *"How does gold hallmarking HUID work?"*), or pick one of the recommended topics below.`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  citations: [
    {
      id: 'cit-bis-act',
      title: 'Bureau of Indian Standards Act, 2016',
      documentType: 'BIS Guidelines',
      referenceNumber: 'Act No. 11 of 2016',
      snippet: 'Official statutory framework for standardization, marking, and quality certification of goods.',
      officialUrl: 'https://bis.gov.in'
    }
  ],
  suggestedActions: [
    { id: 'act-1', label: '💧 Packaged Water (IS 14543)', actionType: 'run_query', payload: 'What are the mandatory requirements for packaged drinking water under IS 14543?' },
    { id: 'act-2', label: '🔋 Lithium EV Battery (IS 16046)', actionType: 'run_query', payload: 'What are the safety testing steps for Lithium-ion battery packs under IS 16046?' },
    { id: 'act-3', label: '🏍️ Helmets (IS 4151)', actionType: 'run_query', payload: 'What are the impact test requirements for two-wheeler helmets under IS 4151?' },
    { id: 'act-4', label: '📊 Check MSME Readiness', actionType: 'open_gap_test' }
  ]
};

export function useChat(onNavigate?: (view: string, payload?: any) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeCitation, setActiveCitation] = useState<CitedSource | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<IndianStandard | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const assistantMsgId = `asst-${Date.now()}`;
    const placeholderAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };

    setMessages(prev => [...prev, userMsg, placeholderAssistantMsg]);
    setIsLoading(true);

    try {
      const ragResponse = await AIAssistantService.processQuery(queryText, messages);

      // Simulate smooth streaming output
      const fullText = ragResponse.answer;
      let currentIndex = 0;
      const chunkSize = 12;

      const interval = setInterval(() => {
        currentIndex += chunkSize;
        if (currentIndex >= fullText.length) {
          clearInterval(interval);
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMsgId 
                ? {
                    ...msg,
                    text: fullText,
                    isStreaming: false,
                    citations: ragResponse.citations,
                    suggestedActions: ragResponse.suggestedActions,
                    highlightedStandard: ragResponse.highlightedStandard
                  }
                : msg
            )
          );
          if (ragResponse.highlightedStandard) {
            setSelectedStandard(ragResponse.highlightedStandard);
          }
          setIsLoading(false);
        } else {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMsgId 
                ? { ...msg, text: fullText.slice(0, currentIndex) }
                : msg
            )
          );
        }
      }, 25);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMsgId 
            ? {
                ...msg,
                text: 'Sorry, I encountered an error processing your compliance query. Please try again.',
                isStreaming: false
              }
            : msg
        )
      );
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleActionClick = useCallback((action: { actionType: string; payload?: string }) => {
    if (action.actionType === 'run_query' && action.payload) {
      sendMessage(action.payload);
    } else if (onNavigate) {
      if (action.actionType === 'open_standard') {
        onNavigate('standards', action.payload);
      } else if (action.actionType === 'open_lab') {
        onNavigate('labs', action.payload);
      } else if (action.actionType === 'open_roadmap') {
        onNavigate('roadmap', action.payload);
      } else if (action.actionType === 'open_gap_test') {
        onNavigate('gap_analysis', action.payload);
      }
    }
  }, [sendMessage, onNavigate]);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_GREETING]);
    setSelectedStandard(null);
  }, []);

  return {
    messages,
    isLoading,
    activeCitation,
    setActiveCitation,
    selectedStandard,
    setSelectedStandard,
    sendMessage,
    handleActionClick,
    clearChat
  };
}
