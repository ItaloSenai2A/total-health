// src/components/ChatBot.js
import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const perguntasERespostas = [
    {
        pergunta: "Como agendar uma consulta?",
        resposta:
          "Acesse o menu 'Consultas' e clique em 'Agendar nova consulta'. Escolha o paciente, especialidade e horário.",
      },
      {
        pergunta: "Onde vejo os exames dos meus pacientes?",
        resposta:
          "Clique em 'Exames' no menu principal para ver todos os resultados disponíveis.",
      },
      {
        pergunta: "Como editar meu perfil médico?",
        resposta:
          "Acesse 'Gerenciar Perfil' clicando no seu avatar, e selecione 'Editar Perfil'.",
      },
      {
        pergunta: "Como acessar os prontuários?",
        resposta: "No menu, clique em 'Prontuários' e selecione o paciente desejado.",
      },
      {
        pergunta: "Preciso de ajuda com pagamentos.",
        resposta: "Vá até a seção 'Pagamentos' para ver e gerenciar os lançamentos.",
      },
    ];

const ChatBot = () => {
  const [chatAberto, setChatAberto] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [perguntasRestantes, setPerguntasRestantes] = useState(perguntasERespostas);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const enviarPergunta = (pergunta, resposta) => {
    setMessages((msgs) => [...msgs, { from: "user", text: pergunta }]);
    setIsTyping(true);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setMessages((msgs) => [...msgs, { from: "bot", text: resposta }]);
      setIsTyping(false);
    }, 1500);
  };

  const abrirChat = () => {
    setChatAberto(true);
    setPerguntasRestantes(perguntasERespostas);
    setMessages([
      {
        from: "bot",
        text: "Olá! Como posso ajudar você? Escolha uma pergunta abaixo:",
        buttons: perguntasERespostas,
      },
    ]);
  };

  const handleButtonClick = (pergunta, resposta) => {
    if (resposta === "reset") {
      abrirChat();
      return;
    }
    enviarPergunta(pergunta, resposta);
    setPerguntasRestantes((prev) => prev.filter((p) => p.pergunta !== pergunta));

    setTimeout(() => {
      setMessages((msgs) => {
        if (perguntasRestantes.length <= 1) {
          return [
            ...msgs,
            {
              from: "bot",
              text: "Não há mais perguntas disponíveis. Deseja reiniciar o chat?",
              buttons: [{ pergunta: "Reiniciar Chat", resposta: "reset" }],
            },
          ];
        }
        return [
          ...msgs,
          {
            from: "bot",
            text: "Quer saber mais alguma coisa? Escolha outra pergunta:",
            buttons: perguntasRestantes.filter((p) => p.pergunta !== pergunta),
          },
        ];
      });
    }, 1800);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {chatAberto ? (
        <div
          className="chat-container"
          role="region"
          aria-label="Chat de suporte médico"
          style={{
            width: 320,
            maxHeight: 430,
            background: "white",
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "Arial, sans-serif",
            color: "#000",
          }}
        >
          <div
            className="chat-header"
            style={{
              backgroundColor: "#8B1C27",
              color: "white",
              padding: "12px 16px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Suporte Médico
            <button
              className="close-btn"
              onClick={() => setChatAberto(false)}
              aria-label="Fechar chat"
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1.2rem",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div
            className="chat-messages"
            aria-live="polite"
            aria-atomic="false"
            style={{
              flex: 1,
              padding: "12px 16px",
              overflowY: "auto",
              background: "#f1f0f0",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`message ${m.from}`}
                style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius: 20,
                  marginBottom: 10,
                  wordWrap: "break-word",
                  backgroundColor: m.from === "user" ? "#8B1C27" : "white",
                  color: m.from === "user" ? "white" : "#000",
                  border: m.from === "bot" ? "1px solid #ddd" : "none",
                  marginLeft: m.from === "user" ? "auto" : undefined,
                  borderBottomRightRadius: m.from === "user" ? 4 : 20,
                  borderBottomLeftRadius: m.from === "user" ? 20 : 4,
                }}
              >
                <div>{m.text}</div>
                {m.buttons && (
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                    {m.buttons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleButtonClick(btn.pergunta, btn.resposta)}
                        style={{
                          backgroundColor: "#8B1C27",
                          border: "none",
                          color: "white",
                          padding: "8px 12px",
                          borderRadius: 12,
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          textAlign: "left",
                          width: "fit-content",
                          maxWidth: "100%",
                        }}
                        aria-label={`Selecionar pergunta: ${btn.pergunta}`}
                      >
                        {btn.pergunta}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div
                className="typing-indicator"
                aria-label="Digitando..."
                style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, paddingLeft: 4 }}
              >
                <span style={{ width: 8, height: 8, backgroundColor: "#8B1C27", borderRadius: "50%", opacity: 0.4, animation: "blink 1.4s infinite both", animationDelay: "0s" }} />
                <span style={{ width: 8, height: 8, backgroundColor: "#8B1C27", borderRadius: "50%", opacity: 0.4, animation: "blink 1.4s infinite both", animationDelay: "0.2s" }} />
                <span style={{ width: 8, height: 8, backgroundColor: "#8B1C27", borderRadius: "50%", opacity: 0.4, animation: "blink 1.4s infinite both", animationDelay: "0.4s" }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <button
          onClick={abrirChat}
          aria-label="Abrir chat de suporte"
          style={{
            backgroundColor: "#8B1C27",
            border: "none",
            color: "white",
            borderRadius: "50%",
            padding: 14,
            fontSize: 20,
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            cursor: "pointer",
          }}
        >
          <FaComments />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
