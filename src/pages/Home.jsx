import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Medicos from "../assets/capadositetotalhealth.png";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaStethoscope,
  FaUserMd,
  FaComments,
  FaTimes,
} from "react-icons/fa";

const perguntasERespostas = [
  { pergunta: "Como agendar uma consulta?", resposta: "Acesse o menu 'Consultas' e clique em 'Agendar nova consulta'. Escolha o paciente, especialidade e horário." },
  { pergunta: "Onde vejo os exames dos meus pacientes?", resposta: "Clique em 'Exames' no menu principal para ver todos os resultados disponíveis." },
  { pergunta: "Como editar meu perfil médico?", resposta: "Acesse 'Perfil do Médico' no menu lateral e clique em 'Editar dados'." },
  { pergunta: "Como acessar os prontuários?", resposta: "No menu, clique em 'Prontuários' e selecione o paciente desejado." },
  { pergunta: "Preciso de ajuda com pagamentos.", resposta: "Vá até a seção 'Pagamentos' para ver e gerenciar os lançamentos." },
];

const ChatMessage = ({ from, text, buttons, onButtonClick }) => (
  <div className={`message ${from === "user" ? "user" : "bot"}`} style={{ animation: "fadeSlideIn 0.4s ease forwards" }}>
    <div>{text}</div>
    {buttons && (
      <div className="message-buttons">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => onButtonClick(btn.pergunta, btn.resposta)}
            className="chat-question-btn"
            aria-label={`Selecionar pergunta: ${btn.pergunta}`}
          >
            {btn.pergunta}
          </button>
        ))}
      </div>
    )}
  </div>
);

const Home = () => {
  const navigate = useNavigate();
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
    setMessages([{ from: "bot", text: "Olá! Como posso ajudar você? Escolha uma pergunta abaixo:", buttons: perguntasERespostas }]);
  };

  const handleBotaoPerguntaClick = (pergunta, resposta) => {
    enviarPergunta(pergunta, resposta);
    setPerguntasRestantes((prev) => prev.filter((p) => p.pergunta !== pergunta));
    setTimeout(() => {
      setMessages((msgs) => {
        if (perguntasRestantes.length <= 1) {
          return [...msgs, { from: "bot", text: "Não há mais perguntas disponíveis. Deseja reiniciar o chat?", buttons: [{ pergunta: "Reiniciar Chat", resposta: "reset" }] }];
        }
        return [...msgs, { from: "bot", text: "Quer saber mais alguma coisa? Escolha outra pergunta:", buttons: perguntasRestantes.filter((p) => p.pergunta !== pergunta) }];
      });
    }, 1800);
  };

  const handleButtonClick = (pergunta, resposta) => {
    if (resposta === "reset") {
      abrirChat();
      return;
    }
    handleBotaoPerguntaClick(pergunta, resposta);
  };

  const cards = [
    { icon: <FaCalendarAlt size={42} color="#8B1C27" />, title: "Gerenciar Consultas", text: "Visualize, agende e organize seus horários de atendimento e consultas com os pacientes.", btn: "Acessar Agenda", rota: "/agendamento" },
    { icon: <FaClipboardList size={42} color="#8B1C27" />, title: "Prontuários Eletrônicos", text: "Acesse e atualize os prontuários médicos dos seus pacientes com segurança e praticidade.", btn: "Abrir Prontuário", rota: "/consulta" },
    { icon: <FaStethoscope size={42} color="#8B1C27" />, title: "Resultados e Exames", text: "Consulte os resultados dos exames solicitados e acompanhe o histórico clínico dos pacientes.", btn: "Ver Exames", rota: "/exame" },
    { icon: <FaUserMd size={42} color="#8B1C27" />, title: "Perfil do Médico", text: "Gerencie suas informações profissionais, agenda e comunique-se com a equipe administrativa.", btn: "Editar Perfil", rota: "/perfil" },
  ];

  return (
    <div className="container" style={{ position: "relative", minHeight: "80vh", paddingTop: "10px", paddingBottom: "60px" }}>
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
        {chatAberto ? (
          <div className="chat-container" role="region" aria-label="Chat de suporte médico">
            <div className="chat-header">
              Suporte Médico
              <button className="close-btn" onClick={() => setChatAberto(false)} aria-label="Fechar chat">
                <FaTimes />
              </button>
            </div>
            <div className="chat-messages" aria-live="polite" aria-atomic="false">
              {messages.map((m, i) => (
                <ChatMessage key={i} from={m.from} text={m.text} buttons={m.buttons} onButtonClick={handleButtonClick} />
              ))}
              {isTyping && (
                <div className="typing-indicator" aria-label="Digitando...">
                  <span></span><span></span><span></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          <button
            className="btn"
            onClick={abrirChat}
            style={{
              backgroundColor: "#8B1C27",
              border: "none",
              color: "white",
              borderRadius: "50%",
              padding: "14px",
              fontSize: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
            aria-label="Abrir chat de suporte"
          >
            <FaComments />
          </button>
        )}
      </div>

      <div className="row align-items-center" style={{ position: "relative", zIndex: 1 }}>
        <div className="col-12 col-md-6 text-start">
          <h1 style={{ fontWeight: "700", fontSize: "2.3rem", marginBottom: "1rem", color: "#8b1a2b" }}>Plataforma Médica Total Health</h1>
          <p style={{ fontSize: "1.15rem", marginBottom: "1.5rem", color: "#8b1a2b" }}>
            Sistema exclusivo para médicos da clínica gerenciarem pacientes, consultas, exames e agendas de forma simples e segura.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            <a
              href="tel:+5522999991234"
              className="btn"
              style={{
                borderRadius: "30px",
                fontWeight: "500",
                color: "white",
                backgroundColor: "#8B1C27",
                border: "2px solid #8B1C27",
                fontSize: "1rem",
                padding: "8px 16px",
                textDecoration: "none",
              }}
            >
              📞 Ligar (22) 99999-1234
            </a>
          </div>
        </div>

        <div className="col-12 col-md-6 text-center mt-4 mt-md-0">
          <img src={Medicos} alt="Equipe médica" style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }} />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mt-4">
        {cards.map((card, index) => (
          <div className="col" key={index}>
            <div className="card h-100 d-flex flex-column justify-content-between text-center p-3" style={{ borderRadius: "12px", border: "2px solid #8B1C27", boxShadow: "0 4px 6px rgba(139,28,39,0.2)" }}>
              <div>{card.icon}</div>
              <h3 style={{ fontWeight: "600", fontSize: "1.3rem", color: "#8B1C27", margin: "12px 0" }}>{card.title}</h3>
              <p style={{ fontWeight: "400", fontSize: "0.95rem", flexGrow: 1, color: "#8b1a2b" }}>{card.text}</p>
              <button
                onClick={() => navigate(card.rota)}
                className="btn"
                style={{
                  backgroundColor: "#8B1C27",
                  border: "none",
                  color: "white",
                  borderRadius: "30px",
                  fontWeight: "600",
                  padding: "8px 20px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                aria-label={card.btn}
              >
                {card.btn}
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .chat-container {
            width: 320px;
            max-width: 90vw;
            height: 420px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .chat-header {
            background: #8B1C27;
            color: white;
            padding: 10px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .chat-messages {
            flex: 1;
            padding: 10px;
            overflow-y: auto;
          }
          .typing-indicator span {
            display: inline-block;
            width: 8px;
            height: 8px;
            margin: 0 2px;
            background: #8B1C27;
            border-radius: 50%;
            animation: blink 1.4s infinite both;
          }
          .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
          .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes blink {
            0%, 80%, 100% { opacity: 0; }
            40% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
