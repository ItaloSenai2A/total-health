import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Medico = () => {
  const [medicos, setMedicos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarId, setEditarId] = useState(null);

  // Campos do formulário
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

  useEffect(() => {
    const dados = localStorage.getItem("totalhealth_medicos");
    if (dados) setMedicos(JSON.parse(dados));
  }, []);

  const salvarMedicos = (lista) => {
    localStorage.setItem("totalhealth_medicos", JSON.stringify(lista));
  };

  const abrirModalNovo = () => {
    setEditarId(null);
    setNome("");
    setCrm("");
    setShowModal(true);
  };

  const abrirModalEditar = (medico) => {
    setEditarId(medico.MedicoId);
    setNome(medico.Nome);
    setCrm(medico.Crm);
    setShowModal(true);
  };

  const validarCampos = () => {
    if (!nome.trim() || !crm.trim()) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  };

  const salvarMedico = () => {
    if (!validarCampos()) return;

    const novoMedico = {
      MedicoId: editarId || crypto.randomUUID(),
      Nome: nome.trim(),
      Crm: crm.trim(),
    };

    let listaAtualizada;
    if (editarId) {
      listaAtualizada = medicos.map((m) =>
        m.MedicoId === editarId ? novoMedico : m
      );
    } else {
      listaAtualizada = [...medicos, novoMedico];
    }

    setMedicos(listaAtualizada);
    salvarMedicos(listaAtualizada);
    setShowModal(false);
  };

  const excluirMedico = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este médico?")) {
      const listaFiltrada = medicos.filter((m) => m.MedicoId !== id);
      setMedicos(listaFiltrada);
      salvarMedicos(listaFiltrada);
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

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        size="md"
      >
        <Modal.Header style={{ backgroundColor: cores.botaoPrincipal, color: "#fff" }} closeButton>
          <Modal.Title>{editarId ? "Editar Médico" : "Adicionar Novo Médico"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard, color: cores.textoSecundario }}>
          <Form>
            <Form.Group controlId="formNome" className="mb-3">
              <Form.Label>Nome *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCrm" className="mb-3">
              <Form.Label>CRM *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número do CRM"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: cores.botaoPrincipal }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: cores.botaoAtivo, border: "none" }}
            onClick={salvarMedico}
          >
            {editarId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {medicos.length === 0 ? (
          <p className="text-center" style={{ color: cores.textoSecundario, width: "100%" }}>
            Nenhum médico cadastrado.
          </p>
        ) : (
          medicos.map((medico) => (
            <Col md={4} lg={3} sm={6} key={medico.MedicoId} className="mb-4">
              <Card
                style={{
                  backgroundColor: cores.fundoCard,
                  border: `2px solid ${cores.bordaDourada}`,
                  cursor: "pointer",
                  color: cores.textoTitulo,
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: "700" }}>{medico.Nome}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">CRM: {medico.Crm}</Card.Subtitle>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEditar(medico)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => excluirMedico(medico.MedicoId)}
                  >
                    Excluir
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Medico;
