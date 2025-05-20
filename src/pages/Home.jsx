import React from "react";
import Medicos from "../assets/capadositetotalhealth.png";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaStethoscope,
  FaUserMd,
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
      {/* Texto e imagem principais */}
      <div
        className="row align-items-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="col-md-6 text-start">
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
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              📞 Ligar (22) 99999-1234
            </a>
            <a
              href="https://wa.me/5522999991234"
              target="_blank"
              rel="noopener noreferrer"
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
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              💬 Agendar por WhatsApp
            </a>
          </div>
        </div>

        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            src={Medicos}
            alt="Equipe médica"
            style={{
              height: "350px",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Cards com foco em funcionalidades para médicos */}
      <div className="row row-cols-1 row-cols-md-4 g-3 mt-4">
        {[
          {
            icon: <FaCalendarAlt size={42} color="#8B1C27" />,
            title: "Gerenciar Consultas",
            text: "Visualize, agende e organize seus horários de atendimento e consultas com os pacientes.",
            btn: "Acessar Agenda",
          },
          {
            icon: <FaClipboardList size={42} color="#8B1C27" />,
            title: "Prontuários Eletrônicos",
            text: "Acesse e atualize os prontuários médicos dos seus pacientes com segurança e praticidade.",
            btn: "Abrir Prontuário",
          },
          {
            icon: <FaStethoscope size={42} color="#8B1C27" />,
            title: "Resultados e Exames",
            text: "Consulte os resultados dos exames solicitados e acompanhe o histórico clínico dos pacientes.",
            btn: "Ver Exames",
          },
          {
            icon: <FaUserMd size={42} color="#8B1C27" />,
            title: "Perfil do Médico",
            text: "Gerencie suas informações profissionais, agenda e comunique-se com a equipe administrativa.",
            btn: "Editar Perfil",
          },
        ].map((card, index) => (
          <div className="col" key={index}>
            <div
              className="card h-100 d-flex flex-column justify-content-between text-center p-3"
              style={{
                borderRadius: "12px",
                backgroundColor: "#f8f9fa",
                minHeight: "260px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "50px" }}
              >
                {card.icon}
              </div>
              <h6
                className="my-2"
                style={{ color: "#8B1C27", fontWeight: "600", fontSize: "1rem" }}
              >
                {card.title}
              </h6>
              <p
                style={{
                  fontSize: "0.9rem",
                  flexGrow: 1,
                  marginBottom: "10px",
                }}
              >
                {card.text}
              </p>
              <button
                className="btn"
                style={{
                  backgroundColor: "#8B1C27",
                  color: "white",
                  borderRadius: "30px",
                  fontSize: "0.9rem",
                  padding: "6px 12px",
                  width: "100%",
                  maxWidth: "160px",
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
