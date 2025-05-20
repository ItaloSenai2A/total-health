import React, { useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Sair = () => {
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(true);
  const navigate = useNavigate();

  const cores = {
    fundo: "#F2F2F2",
    botaoPrincipal: "#8B0000",
    botaoHover: "#A30000",
    botaoAtivo: "#C0392B",
    texto: "#1C1C1C",
  };

  const confirmarSaida = () => {
    localStorage.clear();         // remove todos os dados do usuário
    navigate("/");                // vai para a home
    window.location.reload();     // recarrega a página para atualizar Topbar
  };

  return (
    <div>
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: cores.fundo }}
    >
      <Modal
        show={mostrarConfirmacao}
        onHide={() => setMostrarConfirmacao(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          style={{
            backgroundColor: cores.botaoPrincipal,
            color: "#fff",
            justifyContent: "space-between",
          }}
        >
          <Modal.Title>Confirmação de saída</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            style={{
              fontSize: "1.1rem",
              color: cores.texto,
              textAlign: "left", // Alinha o texto mais à direita
              marginBottom: "0",
            }}
          >
            Tem certeza que deseja sair?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button
            style={{
              backgroundColor: cores.botaoAtivo,
              border: "none",
            }}
            onClick={confirmarSaida}
          >
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default Sair;
