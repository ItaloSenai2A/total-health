import React, { useState } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Pagamento = () => {
  const [pagamentos, setPagamentos] = useState([
    {
      nomePaciente: "João da Silva",
      valorConsulta: 350.0,
      dataPagamento: "2025-05-20T14:30:00",
      exame: "Ultrassonografia",
      valorExame: 150.0,
    },
    {
      nomePaciente: "Maria Oliveira",
      valorConsulta: 280.0,
      dataPagamento: "2025-05-18T09:00:00",
      exame: "Raio-X",
      valorExame: 90.0,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    nomePaciente: "",
    valorConsulta: "",
    dataPagamento: "",
    exame: "",
    valorExame: "",
  });

  const cores = {
    fundoTela: "#F2F2F2",
    botaoPrincipal: "#8B0000",
    botaoHover: "#A30000",
    botaoAtivo: "#C0392B",
    fundoCard: "#FFFFFF",
    textoTitulo: "#8B1C27",
    textoSecundario: "#3A3A3A",
    bordaDourada: "#D4AF37",
    totalVerde: "#198754",
  };

  const abrirModalAdd = () => {
    setForm({
      nomePaciente: "",
      valorConsulta: "",
      dataPagamento: "",
      exame: "",
      valorExame: "",
    });
    setEditIndex(null);
    setModalType("edit");
    setShowModal(true);
  };

  const abrirModalEdit = (index) => {
    setForm({ ...pagamentos[index] });
    setEditIndex(index);
    setModalType("edit");
    setShowModal(true);
  };

  const abrirModalDelete = (index) => {
    setEditIndex(index);
    setModalType("delete");
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setModalType(null);
    setEditIndex(null);
    setForm({
      nomePaciente: "",
      valorConsulta: "",
      dataPagamento: "",
      exame: "",
      valorExame: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarPagamento = () => {
    if (
      !form.nomePaciente ||
      !form.valorConsulta ||
      !form.dataPagamento ||
      !form.exame ||
      !form.valorExame
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const novoPagamento = {
      nomePaciente: form.nomePaciente,
      valorConsulta: parseFloat(form.valorConsulta),
      dataPagamento: form.dataPagamento,
      exame: form.exame,
      valorExame: parseFloat(form.valorExame),
    };

    let listaAtualizada;
    if (editIndex !== null) {
      listaAtualizada = pagamentos.map((p, i) =>
        i === editIndex ? novoPagamento : p
      );
    } else {
      listaAtualizada = [...pagamentos, novoPagamento];
    }

    setPagamentos(listaAtualizada);
    fecharModal();
  };

  const confirmarExclusao = () => {
    const listaAtualizada = pagamentos.filter((_, i) => i !== editIndex);
    setPagamentos(listaAtualizada);
    fecharModal();
  };

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: cores.fundoTela, minHeight: "100vh" }}
    >
      <div className="text-center mb-4">
        <Button
          style={{
            backgroundColor: cores.botaoPrincipal,
            borderColor: cores.botaoPrincipal,
            fontWeight: "bold",
            borderRadius: 8,
            minWidth: 1200,
            padding: "12px 24px",
          }}
          onClick={abrirModalAdd}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = cores.botaoHover)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = cores.botaoPrincipal)
          }
        >
          + Adicionar Pagamento
        </Button>
      </div>

      <Row xs={1} md={2} className="g-4">
        {pagamentos.length === 0 && (
          <p className="text-center w-100" style={{ color: cores.textoSecundario }}>
            Nenhum pagamento cadastrado.
          </p>
        )}
        {pagamentos.map((pagamento, index) => (
          <Col key={index}>
            <Card
              className="h-100 shadow-sm"
              style={{
                backgroundColor: cores.fundoCard,
                border: `1px solid ${cores.bordaDourada}`,
                borderRadius: 16,
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: cores.textoTitulo, fontWeight: "bold" }}>
                  {pagamento.nomePaciente}
                </Card.Title>
                <hr />
                <Card.Text>
                  <strong>Data do Pagamento:</strong>{" "}
                  {new Date(pagamento.dataPagamento).toLocaleDateString("pt-BR")}
                </Card.Text>
                <Card.Text>
                  <strong>Valor da Consulta:</strong> R$ {pagamento.valorConsulta.toFixed(2)}
                </Card.Text>
                <Card.Text>
                  <strong>Exame:</strong> {pagamento.exame}
                </Card.Text>
                <Card.Text>
                  <strong>Valor do Exame:</strong> R$ {pagamento.valorExame.toFixed(2)}
                </Card.Text>
                <Card.Text>
                  <strong>Total:</strong>{" "}
                  <span style={{ color: cores.totalVerde, fontWeight: "bold" }}>
                    R$ {(pagamento.valorConsulta + pagamento.valorExame).toFixed(2)}
                  </span>
                </Card.Text>

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    style={{ borderRadius: 8 }}
                    onClick={() => abrirModalEdit(index)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    style={{ borderRadius: 8 }}
                    onClick={() => abrirModalDelete(index)}
                  >
                    Excluir
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de adicionar/editar */}
      <Modal
        show={showModal && modalType === "edit"}
        onHide={fecharModal}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: cores.botaoPrincipal, color: "#fff" }}
        >
          <Modal.Title>
            {editIndex !== null ? "Editar Pagamento" : "Adicionar Novo Pagamento"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard }}>
          <Form>
            <Form.Group controlId="nomePaciente" className="mb-3">
              <Form.Label>Nome do Paciente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do Paciente"
                name="nomePaciente"
                value={form.nomePaciente}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="valorConsulta" className="mb-3">
              <Form.Label>Valor da Consulta (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Valor da Consulta"
                name="valorConsulta"
                value={form.valorConsulta}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="dataPagamento" className="mb-3">
              <Form.Label>Data do Pagamento</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dataPagamento"
                value={form.dataPagamento}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="exame" className="mb-3">
              <Form.Label>Exame</Form.Label>
              <Form.Control
                type="text"
                placeholder="Exame"
                name="exame"
                value={form.exame}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="valorExame" className="mb-3">
              <Form.Label>Valor do Exame (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Valor do Exame"
                name="valorExame"
                value={form.valorExame}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: cores.fundoCard }}>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={salvarPagamento}
            style={{ fontWeight: "bold" }}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal
        show={showModal && modalType === "delete"}
        onHide={fecharModal}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir este pagamento?
          <br />
          <strong>
            {editIndex !== null ? pagamentos[editIndex]?.nomePaciente : ""}
          </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarExclusao}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pagamento;
