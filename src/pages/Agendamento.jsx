import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

// Mock dados para seleção (substitua por API real)
const consultasMock = [
  { ConsultaId: "1", descricao: "Consulta João Silva - 10/05/2025 10:00" },
  { ConsultaId: "2", descricao: "Consulta Maria Oliveira - 12/05/2025 15:00" },
];

const medicosMock = [
  { MedicoId: "1", Nome: "Dr. Carlos Souza" },
  { MedicoId: "2", Nome: "Dra. Ana Paula" },
];

const especialidadesMock = [
  { EspecialidadeId: "1", Nome: "Cardiologia" },
  { EspecialidadeId: "2", Nome: "Dermatologia" },
];

const Agendamento = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarId, setEditarId] = useState(null);

  // Campos do formulário
  const [consultaId, setConsultaId] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [especialidadeId, setEspecialidadeId] = useState("");
  const [status, setStatus] = useState("");

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
    const dados = localStorage.getItem("totalhealth_agendamentos");
    if (dados) setAgendamentos(JSON.parse(dados));
  }, []);

  const salvarAgendamentos = (lista) => {
    localStorage.setItem("totalhealth_agendamentos", JSON.stringify(lista));
  };

  const abrirModalNovo = () => {
    setEditarId(null);
    setConsultaId("");
    setDataHora("");
    setMedicoId("");
    setEspecialidadeId("");
    setStatus("");
    setShowModal(true);
  };

  const abrirModalEditar = (agendamento) => {
    setEditarId(agendamento.AgendamentoId);
    setConsultaId(agendamento.ConsultaId);
    setDataHora(agendamento.DataHora ? agendamento.DataHora.slice(0, 16) : "");
    setMedicoId(agendamento.MedicoId);
    setEspecialidadeId(agendamento.EspecialidadeId);
    setStatus(agendamento.Status);
    setShowModal(true);
  };

  const validarCampos = () => {
    if (!consultaId || !dataHora || !medicoId || !especialidadeId || !status) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  };

  const salvarAgendamento = () => {
    if (!validarCampos()) return;

    const novoAgendamento = {
      AgendamentoId: editarId || crypto.randomUUID(),
      ConsultaId: consultaId,
      DataHora: dataHora,
      MedicoId: medicoId,
      EspecialidadeId: especialidadeId,
      Status: status,
    };

    let listaAtualizada;
    if (editarId) {
      listaAtualizada = agendamentos.map((a) =>
        a.AgendamentoId === editarId ? novoAgendamento : a
      );
    } else {
      listaAtualizada = [...agendamentos, novoAgendamento];
    }

    setAgendamentos(listaAtualizada);
    salvarAgendamentos(listaAtualizada);
    setShowModal(false);
  };

  const excluirAgendamento = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este agendamento?")) {
      const listaFiltrada = agendamentos.filter((a) => a.AgendamentoId !== id);
      setAgendamentos(listaFiltrada);
      salvarAgendamentos(listaFiltrada);
    }
  };

  // Funções para mostrar nomes e descrições nos cards
  const descricaoConsulta = (id) => {
    const c = consultasMock.find((c) => c.ConsultaId === id);
    return c ? c.descricao : "Consulta desconhecida";
  };

  const nomeMedico = (id) => {
    const m = medicosMock.find((m) => m.MedicoId === id);
    return m ? m.Nome : "Médico desconhecido";
  };

  const nomeEspecialidade = (id) => {
    const e = especialidadesMock.find((e) => e.EspecialidadeId === id);
    return e ? e.Nome : "Especialidade desconhecida";
  };

  return (
    <div
      className="container my-4"
      style={{
        backgroundColor: cores.fundoTela,
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2
        className="mb-4"
        style={{ color: cores.botaoPrincipal, fontWeight: "700" }}
      >
        Gerenciar Agendamentos
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
          <h5>+ Adicionar Novo Agendamento</h5>
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
        <Modal.Header
          style={{ backgroundColor: cores.botaoPrincipal, color: "#fff" }}
          closeButton
        >
          <Modal.Title>
            {editarId ? "Editar Agendamento" : "Adicionar Novo Agendamento"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: cores.fundoCard,
            color: cores.textoSecundario,
          }}
        >
          <Form>
            <Form.Group controlId="formConsulta" className="mb-3">
              <Form.Label>Consulta *</Form.Label>
              <Form.Select
                value={consultaId}
                onChange={(e) => setConsultaId(e.target.value)}
              >
                <option value="">Selecione a consulta</option>
                {consultasMock.map((c) => (
                  <option key={c.ConsultaId} value={c.ConsultaId}>
                    {c.descricao}
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

            <Form.Group controlId="formEspecialidade" className="mb-3">
              <Form.Label>Especialidade *</Form.Label>
              <Form.Select
                value={especialidadeId}
                onChange={(e) => setEspecialidadeId(e.target.value)}
              >
                <option value="">Selecione a especialidade</option>
                {especialidadesMock.map((e) => (
                  <option key={e.EspecialidadeId} value={e.EspecialidadeId}>
                    {e.Nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Status *</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Selecione o status</option>
                <option value="Agendado">Agendado</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Realizado">Realizado</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: cores.botaoPrincipal }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: cores.botaoAtivo, border: "none" }}
            onClick={salvarAgendamento}
          >
            {editarId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {agendamentos.length === 0 ? (
          <p
            className="text-center"
            style={{ color: cores.textoSecundario, width: "100%" }}
          >
            Nenhum agendamento cadastrado.
          </p>
        ) : (
          agendamentos.map((agendamento) => (
            <Col
              md={4}
              lg={3}
              sm={6}
              key={agendamento.AgendamentoId}
              className="mb-4"
            >
              <Card
                style={{
                  backgroundColor: cores.fundoCard,
                  border: `2px solid${cores.bordaDourada}`,
                  cursor: "pointer",
                  color: cores.textoTitulo,
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: "700" }}>
                    {descricaoConsulta(agendamento.ConsultaId)}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {new Date(agendamento.DataHora).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Médico:</strong> {nomeMedico(agendamento.MedicoId)}{" "}
                    <br />
                    <strong>Especialidade:</strong>{" "}
                    {nomeEspecialidade(agendamento.EspecialidadeId)} <br />
                    <strong>Status:</strong> {agendamento.Status}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEditar(agendamento)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      excluirAgendamento(agendamento.AgendamentoId)
                    }
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

export default Agendamento;
