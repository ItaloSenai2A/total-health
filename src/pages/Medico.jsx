import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";

const Medico = () => {
  const [medicos, setMedicos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarId, setEditarId] = useState(null);
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");

  const cores = {
    fundoTela: "#F2F2F2",
    botaoPrincipal: "#8B0000",
    botaoHover: "#A30000",
    botaoAtivo: "#C0392B",
    fundoCard: "#FFFFFF",
    textoTitulo: "#1C1C1C",
    textoSecundario: "#3A3A3A",
    bordaDourada: "#D4AF37",
  };

  const apiBaseUrl = "http://localhost:5268/api/medicos";
  const token = localStorage.getItem("token");

  useEffect(() => {
    carregarMedicos();
  }, []);

  const carregarMedicos = async () => {
    try {
      const response = await fetch(apiBaseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao carregar médicos");
      const data = await response.json();
      setMedicos(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const abrirModalNovo = () => {
    setEditarId(null);
    setNome("");
    setCrm("");
    setShowModal(true);
  };

  const abrirModalEditar = (medico) => {
    setEditarId(medico.medicoId);
    setNome(medico.nome);
    setCrm(medico.crm);
    setShowModal(true);
  };

  const validarCampos = () => {
    if (!nome.trim() || !crm.trim()) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  };

  const salvarMedico = async () => {
    if (!validarCampos()) return;

    const medico = { nome: nome.trim(), crm: crm.trim() };

    try {
      const url = editarId ? `${apiBaseUrl}/${editarId}` : apiBaseUrl;
      const method = editarId ? "PUT" : "POST";
      const body = editarId ? JSON.stringify({ medicoId: editarId, ...medico }) : JSON.stringify(medico);

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar médico.");
      }

      setShowModal(false);
      carregarMedicos();
    } catch (error) {
      alert(error.message);
    }
  };

  const excluirMedico = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este médico?")) return;

    try {
      const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao excluir médico.");

      carregarMedicos();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="container my-4"
      style={{ backgroundColor: cores.fundoTela, minHeight: "100vh", padding: "20px" }}
    >
      <h2 className="mb-4" style={{ color: cores.botaoPrincipal, fontWeight: "700" }}>
        Gerenciar Médicos
      </h2>

      <Card
        className="mb-4"
        onClick={abrirModalNovo}
        style={{
          cursor: "pointer",
          backgroundColor: cores.botaoPrincipal,
          color: "#fff",
          border: `2px solid ${cores.bordaDourada}`,
          textAlign: "center",
        }}
      >
        <Card.Body>
          <h5>+ Adicionar Novo Médico</h5>
        </Card.Body>
      </Card>

      {medicos.map((medico) => (
        <Card
          key={medico.medicoId}
          className="mb-3"
          style={{
            border: `1px solid ${cores.bordaDourada}`,
            backgroundColor: cores.fundoCard,
          }}
        >
          <Card.Body>
            <h5 style={{ color: cores.textoTitulo }}>{medico.nome}</h5>
            <p style={{ color: cores.textoSecundario }}>CRM: {medico.crm}</p>
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => abrirModalEditar(medico)}
            >
              Editar
            </Button>
            <Button variant="outline-danger" onClick={() => excluirMedico(medico.medicoId)}>
              Excluir
            </Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Modal.Header style={{ backgroundColor: cores.botaoPrincipal, color: "#fff" }} closeButton>
          <Modal.Title>{editarId ? "Editar Médico" : "Adicionar Novo Médico"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard, color: cores.textoSecundario }}>
          <Form>
            <Form.Group controlId="formNome" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome"
              />
            </Form.Group>
            <Form.Group controlId="formCrm" className="mb-3">
              <Form.Label>CRM</Form.Label>
              <Form.Control
                type="text"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
                placeholder="Digite o CRM"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: cores.botaoPrincipal, borderColor: cores.bordaDourada }}
            onClick={salvarMedico}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Medico;
