import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

// Mock dados para seleção (substitua por API real)
const medicosMock = [
  { MedicoId: "1", Nome: "Dr. Carlos Souza" },
  { MedicoId: "2", Nome: "Dra. Ana Paula" },
];

const especialidadesMock = [
  { EspecialidadeId: "1", Nome: "Cardiologia" },
  { EspecialidadeId: "2", Nome: "Dermatologia" },
];

const MedicoEspecialidade = () => {
  const [lista, setLista] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarId, setEditarId] = useState(null);

  // Campos do formulário
  const [medicoId, setMedicoId] = useState("");
  const [especialidadeId, setEspecialidadeId] = useState("");

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
    const dados = localStorage.getItem("totalhealth_medicoespecialidade");
    if (dados) setLista(JSON.parse(dados));
  }, []);

  const salvarLista = (novaLista) => {
    localStorage.setItem("totalhealth_medicoespecialidade", JSON.stringify(novaLista));
  };

  const abrirModalNovo = () => {
    setEditarId(null);
    setMedicoId("");
    setEspecialidadeId("");
    setShowModal(true);
  };

  const abrirModalEditar = (item) => {
    setEditarId(item.MedicoEspecialidadeId);
    setMedicoId(item.MedicoId);
    setEspecialidadeId(item.EspecialidadeId);
    setShowModal(true);
  };

  const validarCampos = () => {
    if (!medicoId || !especialidadeId) {
      alert("Por favor, selecione Médico e Especialidade.");
      return false;
    }
    return true;
  };

  const salvarItem = () => {
    if (!validarCampos()) return;

    const novoItem = {
      MedicoEspecialidadeId: editarId || crypto.randomUUID(),
      MedicoId: medicoId,
      EspecialidadeId: especialidadeId,
      // Medico e Especialidade podem ser carregados via API ou mock para exibição
    };

    let listaAtualizada;
    if (editarId) {
      listaAtualizada = lista.map((i) =>
        i.MedicoEspecialidadeId === editarId ? novoItem : i
      );
    } else {
      listaAtualizada = [...lista, novoItem];
    }

    setLista(listaAtualizada);
    salvarLista(listaAtualizada);
    setShowModal(false);
  };

  const excluirItem = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta associação?")) {
      const listaFiltrada = lista.filter((i) => i.MedicoEspecialidadeId !== id);
      setLista(listaFiltrada);
      salvarLista(listaFiltrada);
    }
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
        Associação Médico & Especialidade
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
          <h5>+ Adicionar Nova Associação</h5>
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
            {editarId ? "Editar Associação" : "Adicionar Nova Associação"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: cores.fundoCard,
            color: cores.textoSecundario,
          }}
        >
          <Form>
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
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: cores.botaoPrincipal }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: cores.botaoAtivo, border: "none" }}
            onClick={salvarItem}
          >
            {editarId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {lista.length === 0 ? (
          <p
            className="text-center"
            style={{ color: cores.textoSecundario, width: "100%" }}
          >
            Nenhuma associação cadastrada.
          </p>
        ) : (
          lista.map((item) => (
            <Col
              md={4}
              lg={3}
              sm={6}
              key={item.MedicoEspecialidadeId}
              className="mb-4"
            >
              <Card
                style={{
                  backgroundColor: cores.fundoCard,
                  border: `2px solid ${cores.bordaDourada}`,
                  cursor: "pointer",
                  color: cores.textoTitulo,
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: "700" }}>
                    {nomeMedico(item.MedicoId)}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {nomeEspecialidade(item.EspecialidadeId)}
                  </Card.Subtitle>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEditar(item)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => excluirItem(item.MedicoEspecialidadeId)}
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

export default MedicoEspecialidade;
