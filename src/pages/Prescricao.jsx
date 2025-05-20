import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Prescricao = () => {
  const [prescricoes, setPrescricoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarId, setEditarId] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [consultaId, setConsultaId] = useState("");

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
    const dados = localStorage.getItem("totalhealth_prescricoes");
    if (dados) setPrescricoes(JSON.parse(dados));
  }, []);

  const salvarPrescricoes = (lista) => {
    localStorage.setItem("totalhealth_prescricoes", JSON.stringify(lista));
  };

  const abrirModalNovo = () => {
    setEditarId(null);
    setDescricao("");
    setConsultaId("");
    setShowModal(true);
  };

  const abrirModalEditar = (prescricao) => {
    setEditarId(prescricao.PrescricaoId);
    setDescricao(prescricao.Descricao);
    setConsultaId(prescricao.ConsultaId);
    setShowModal(true);
  };

  const validarCampos = () => {
    if (!descricao.trim() || !consultaId.trim()) {
      alert("Preencha todos os campos.");
      return false;
    }
    return true;
  };

  const salvarPrescricao = () => {
    if (!validarCampos()) return;

    const nova = {
      PrescricaoId: editarId || crypto.randomUUID(),
      Descricao: descricao.trim(),
      ConsultaId: consultaId.trim(),
    };

    const listaAtualizada = editarId
      ? prescricoes.map((p) => (p.PrescricaoId === editarId ? nova : p))
      : [...prescricoes, nova];

    setPrescricoes(listaAtualizada);
    salvarPrescricoes(listaAtualizada);
    setShowModal(false); // <<< ESTE PARÊNTESE ESTAVA FALTANDO
  };

  const excluirPrescricao = (id) => {
    if (window.confirm("Deseja excluir esta prescrição?")) {
      const lista = prescricoes.filter((p) => p.PrescricaoId !== id);
      setPrescricoes(lista);
      salvarPrescricoes(lista);
    }
  };

  return (
    <div
      className="container my-4"
      style={{ backgroundColor: cores.fundoTela, minHeight: "100vh", padding: "20px" }}
    >
      <h2 className="mb-4" style={{ color: cores.botaoPrincipal, fontWeight: "700" }}>
        Gerenciar Prescrições
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
          <h5>+ Adicionar Nova Prescrição</h5>
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
          <Modal.Title>{editarId ? "Editar Prescrição" : "Nova Prescrição"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descrição *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descreva a prescrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID da Consulta *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Informe o ID da consulta"
                value={consultaId}
                onChange={(e) => setConsultaId(e.target.value)}
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
            onClick={salvarPrescricao}
          >
            {editarId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {prescricoes.length === 0 ? (
          <p className="text-center" style={{ color: cores.textoSecundario, width: "100%" }}>
            Nenhuma prescrição cadastrada.
          </p>
        ) : (
          prescricoes.map((p) => (
            <Col md={4} lg={3} sm={6} key={p.PrescricaoId} className="mb-4">
              <Card
                style={{
                  backgroundColor: cores.fundoCard,
                  border: `2px solid ${cores.bordaDourada}`,
                  color: cores.textoTitulo,
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: "700" }}>Prescrição</Card.Title>
                  <Card.Text>{p.Descricao}</Card.Text>
                  <Card.Text className="text-muted">
                    ID da Consulta: {p.ConsultaId}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEditar(p)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => excluirPrescricao(p.PrescricaoId)}
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

export default Prescricao;
