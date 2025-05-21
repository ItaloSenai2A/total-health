import React, { useState, useEffect } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Sair = () => {
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const navigate = useNavigate();

  const cores = {
    fundo: "#F2F2F2",
    botaoPrincipal: "#8B0000",
    botaoHover: "#A30000",
    botaoAtivo: "#C0392B",
    texto: "#1C1C1C",
  };

  useEffect(() => {
    // Verifica se o usuário está logado (exemplo: localStorage tem algo que identifique o login)
    const usuarioLogado = localStorage.getItem("usuario"); // ou a chave que você usa pra identificar login
    if (!usuarioLogado) {
      // se não tiver, já vai direto pra home sem mostrar nada
      navigate("/");
    } else {
      // se tiver logado, mostra o modal de confirmação
      setMostrarConfirmacao(true);
    }
  }, [navigate]);

  const confirmarSaida = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
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
              textAlign: "left",
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
  );
};

export default Sair;
