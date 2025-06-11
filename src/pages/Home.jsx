import React from "react";
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





const Home = () => {
  const navigate = useNavigate();


  

  

  

 

  const cards = [
    {
      icon: <FaCalendarAlt size={42} color="#8B1C27" />,
      title: "Gerenciar Consultas",
      text: "Visualize, agende e organize seus horários de atendimento e consultas com os pacientes.",
      btn: "Acessar Agenda",
      rota: "/agendamento",
    },
    {
      icon: <FaClipboardList size={42} color="#8B1C27" />,
      title: "Prontuários Eletrônicos",
      text: "Acesse e atualize os prontuários médicos dos seus pacientes com segurança e praticidade.",
      btn: "Abrir Prontuário",
      rota: "/consulta",
    },
    {
      icon: <FaStethoscope size={42} color="#8B1C27" />,
      title: "Resultados e Exames",
      text: "Consulte os resultados dos exames solicitados e acompanhe o histórico clínico dos pacientes.",
      btn: "Ver Exames",
      rota: "/exame",
    },
    {
      icon: <FaUserMd size={42} color="#8B1C27" />,
      title: "Perfil do Médico",
      text: "Gerencie suas informações profissionais, agenda e comunique-se com a equipe administrativa.",
      btn: "Editar Perfil",
      rota: "/perfil",
    },
  ];

  return (
    <div
      className="container"
      style={{
        position: "relative",
        minHeight: "80vh",
        paddingTop: "10px",
        paddingBottom: "60px",
      }}
    >
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        
      </div>

      <div
        className="row align-items-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="col-12 col-md-6 text-start">
          <h1
            style={{
              fontWeight: "700",
              fontSize: "2.3rem",
              marginBottom: "1rem",
              color: "#8b1a2b",
            }}
          >
            Plataforma Médica Total Health
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              marginBottom: "1.5rem",
              color: "#8b1a2b",
            }}
          >
            Sistema exclusivo para médicos da clínica gerenciarem pacientes,
            consultas, exames e agendas de forma simples e segura.
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
          <img
            src={Medicos}
            alt="Equipe médica"
            style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mt-4">
        {cards.map((card, index) => (
          <div className="col" key={index}>
            <div
              className="card h-100 d-flex flex-column justify-content-between text-center p-3"
              style={{
                borderRadius: "12px",
                border: "2px solid #8B1C27",
                boxShadow: "0 4px 6px rgba(139,28,39,0.2)",
              }}
            >
              <div>{card.icon}</div>
              <h3
                style={{
                  fontWeight: "600",
                  fontSize: "1.3rem",
                  color: "#8B1C27",
                  margin: "12px 0",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "0.95rem",
                  flexGrow: 1,
                  color: "#8b1a2b",
                }}
              >
                {card.text}
              </p>
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
