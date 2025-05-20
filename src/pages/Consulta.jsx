import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

// Mock dados de usuários e médicos (substitua pela API real depois)
const usuariosMock = [
  { UsuarioId: "1", Nome: "João Silva" },
  { UsuarioId: "2", Nome: "Maria Oliveira" },
];

const medicosMock = [
  { MedicoId: "1", Nome: "Dr. Carlos Souza" },
  { MedicoId: "2", Nome: "Dra. Ana Paula" },
];

const Consulta = () => {
  const [consultas, setConsultas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarId, setEditarId] = useState(null);

  // Campos do formulário
  const [usuarioId, setUsuarioId] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [status, setStatus] = useState("");
  const [valor, setValor] = useState("");

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

  // Carregar do localStorage
  useEffect(() => {
    const dados = localStorage.getItem("totalhealth_consultas");
    if (dados) setConsultas(JSON.parse(dados));
  }, []);

  // Salvar no localStorage
  const salvarConsultas = (lista) => {
    localStorage.setItem("totalhealth_consultas", JSON.stringify(lista));
  };

  // Abrir modal novo
  const abrirModalNovo = () => {
    setEditarId(null);
    setUsuarioId("");
    setMedicoId("");
    setDataHora("");
    setStatus("");
    setValor("");
    setShowModal(true);
  };

  // Abrir modal editar
  const abrirModalEditar = (consulta) => {
    setEditarId(consulta.ConsultaId);
    setUsuarioId(consulta.UsuarioId);
    setMedicoId(consulta.MedicoId);
    setDataHora(consulta.DataHora ? consulta.DataHora.slice(0, 16) : "");
    setStatus(consulta.Status || "");
    setValor(consulta.Valor.toFixed(2));
    setShowModal(true);
  };

  // Validação simples
  const validarCampos = () => {
    if (!usuarioId || !medicoId || !dataHora || !status || !valor) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
    if (isNaN(parseFloat(valor)) || parseFloat(valor) < 0) {
      alert("Valor inválido.");
      return false;
    }
    return true;
  };

  // Salvar consulta
  const salvarConsulta = () => {
    if (!validarCampos()) return;

    const novaConsulta = {
      ConsultaId: editarId || crypto.randomUUID(),
      UsuarioId: usuarioId,
      MedicoId: medicoId,
      DataHora: dataHora,
      Status: status,
      Valor: parseFloat(valor),
    };

    let listaAtualizada;
    if (editarId) {
      listaAtualizada = consultas.map((c) =>
        c.ConsultaId === editarId ? novaConsulta : c
      );
    } else {
      listaAtualizada = [...consultas, novaConsulta];
    }

    setConsultas(listaAtualizada);
    salvarConsultas(listaAtualizada);
    setShowModal(false);
  };

  // Excluir consulta
  const excluirConsulta = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta consulta?")) {
      const listaFiltrada = consultas.filter((c) => c.ConsultaId !== id);
      setConsultas(listaFiltrada);
      salvarConsultas(listaFiltrada);
    }
  };

  // Mostrar nome do usuário e médico no card
  const nomeUsuario = (id) => {
    const u = usuariosMock.find((u) => u.UsuarioId === id);
    return u ? u.Nome : "Desconhecido";
  };

  const nomeMedico = (id) => {
    const m = medicosMock.find((m) => m.MedicoId === id);
    return m ? m.Nome : "Desconhecido";
  };

  return (
    <div
      className="container my-4"
      style={{ backgroundColor: cores.fundoTela, minHeight: "100vh", padding: "20px" }}
    >
      <h2 className="mb-4" style={{ color: cores.botaoPrincipal, fontWeight: "700" }}>
        Gerenciar Consultas
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
          <h5>+ Adicionar Nova Consulta</h5>
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header style={{ backgroundColor: cores.botaoPrincipal, color: "#fff" }} closeButton>
          <Modal.Title>{editarId ? "Editar Consulta" : "Adicionar Nova Consulta"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard, color: cores.textoSecundario }}>
          <Form>
            <Form.Group controlId="formUsuario" className="mb-3">
              <Form.Label>Usuário *</Form.Label>
              <Form.Select
                value={usuarioId}
                onChange={(e) => setUsuarioId(e.target.value)}
              >
                <option value="">Selecione o usuário</option>
                {usuariosMock.map((u) => (
                  <option key={u.UsuarioId} value={u.UsuarioId}>
                    {u.Nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formMedico" className="mb-3">
              <Form.Label>Médico *</Form.Label>
              <Form.Select
                value={medicoId}
                onChange={(e) => setMedicoId(e.target.value)}
              >
                <option value="">Selecione o médico</option>
                {medicosMock.map((m) => (
                  <option key={m.MedicoId} value={m.MedicoId}>
                    {m.Nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formDataHora" className="mb-3">
              <Form.Label>Data e Hora *</Form.Label>
              <Form.Control
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Status *</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Selecione o status</option>
                <option value="Agendada">Agendada</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Realizada">Realizada</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formValor" className="mb-3">
              <Form.Label>Valor (R$) *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0.00"
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
            onClick={salvarConsulta}
          >
            {editarId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {consultas.length === 0 ? (
          <p className="text-center" style={{ color: cores.textoSecundario, width: "100%" }}>
            Nenhuma consulta cadastrada.
          </p>
        ) : (
          consultas.map((consulta) => (
            <Col md={4} lg={3} sm={6} key={consulta.ConsultaId} className="mb-4">
              <Card
                style={{
                  backgroundColor: cores.fundoCard,
                  border: `2px solid ${cores.bordaDourada}`,
                  color: cores.textoTitulo,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: cores.botaoPrincipal, fontWeight: "700" }}>
                    {nomeUsuario(consulta.UsuarioId)}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Médico: {nomeMedico(consulta.MedicoId)}
                  </Card.Subtitle>
                  <Card.Text>
                    Data e Hora:{" "}
                    {new Date(consulta.DataHora).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                    <br />
                    Status: {consulta.Status}
                    <br />
                    Valor: R$ {consulta.Valor.toFixed(2)}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    onClick={() => abrirModalEditar(consulta)}
                    style={{ borderColor: cores.botaoPrincipal, color: cores.botaoPrincipal }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => excluirConsulta(consulta.ConsultaId)}
                    style={{ borderColor: cores.botaoAtivo, color: cores.botaoAtivo }}
                  >
                    Excluir
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Consulta;
