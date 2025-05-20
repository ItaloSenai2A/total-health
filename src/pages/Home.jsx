import React from "react";
import Medicos from "../assets/capadositetotalhealth.png";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaStethoscope,
  FaQuestionCircle,
} from "react-icons/fa";

const Home = () => {
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
      {/* Conteúdo principal com texto à esquerda e imagem à direita */}
      <div
        className="row align-items-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="col-md-6 text-start">
          <h1
            style={{
              fontWeight: "700",
              fontSize: "2.3rem", // levemente maior
              marginBottom: "1rem",
              color: "#8b1a2b",
            }}
          >
            Clínica Médica Total Health
          </h1>
          <p
            style={{
              fontSize: "1.15rem", // levemente maior
              marginBottom: "1.5rem",
              color: "#8b1a2b",
            }}
          >
            Total Health conta com equipamentos de última geração e os melhores profissionais da região.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn"
              style={{
                borderRadius: "30px",
                fontWeight: "500",
                color: "white",
                backgroundColor: "#8B1C27",
                border: "2px solid #8B1C27",
                fontSize: "1rem", // levemente maior
                padding: "8px 16px",
              }}
            >
              📞 Ligar (22) 2737-6450
            </button>
            <button
              className="btn"
              style={{
                borderRadius: "30px",
                fontWeight: "500",
                color: "white",
                backgroundColor: "#8B1C27",
                border: "2px solid #8B1C27",
                fontSize: "1rem", // levemente maior
                padding: "8px 16px",
              }}
            >
              💬 Agendar por WhatsApp
            </button>
          </div>
        </div>

        {/* Imagem à direita, menor */}
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            src={Medicos}
            alt="Equipe médica"
            style={{
              height: "310px", // levemente maior
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Cards abaixo */}
      <div className="row row-cols-1 row-cols-md-4 g-3 mt-4">
        {[
          {
            icon: <FaCalendarAlt size={42} color="#8B1C27" />,
            title: "Pré-Agendamento",
            text: "Agende agora mesmo seus exames e tenha acesso aos melhores serviços de diagnóstico por imagem.",
            btn: "Pré-Agendar",
          },
          {
            icon: <FaClipboardList size={42} color="#8B1C27" />,
            title: "Resultados Online",
            text: "Acesse o resultado dos seus exames de maneira rápida e prática agora mesmo.",
            btn: "Acessar",
          },
          {
            icon: <FaStethoscope size={42} color="#8B1C27" />,
            title: "Exames",
            text: "Conheça todos os exames e procedimentos oferecidos pela nossa clínica.",
            btn: "Lista de Exames",
          },
          {
            icon: <FaQuestionCircle size={42} color="#8B1C27" />,
            title: "Dúvidas",
            text: "Veja as perguntas frequentes em relação às nossas atividades.",
            btn: "Acessar",
          },
        ].map((card, index) => (
          <div className="col" key={index}>
            <div
              className="card text-center p-3"
              style={{
                borderRadius: "10px",
                backgroundColor: "#f8f9fa",
                fontSize: "1rem", // levemente maior
              }}
            >
              {card.icon}
              <h6 className="my-2" style={{ color: "#8B1C27", fontWeight: "600" }}>
                {card.title}
              </h6>
              <p style={{ fontSize: "0.95rem" }}>{card.text}</p>
              <button
                className="btn"
                style={{
                  backgroundColor: "#8B1C27",
                  color: "white",
                  borderRadius: "30px",
                  fontSize: "0.95rem", // levemente maior
                  padding: "8px 16px",
                }}
              >
                {card.btn}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
