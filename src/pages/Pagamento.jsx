import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Pagamento = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarPagamentoId, setEditarPagamentoId] = useState(null);

  const [novoPagamento, setNovoPagamento] = useState({
    ConsultaId: "",
    Valor: "",
    DataPagamento: "",
    ExameId: "",
    ValorExame: "",
  });

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
    const dados = localStorage.getItem("totalhealth_pagamentos");
    if (dados) setPagamentos(JSON.parse(dados));
  }, []);

  const salvarPagamentos = (lista) => {
    localStorage.setItem("totalhealth_pagamentos", JSON.stringify(lista));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoPagamento((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    if (!novoPagamento.ConsultaId || !novoPagamento.Valor) {
      alert("Consulta ID e Valor são obrigatórios.");
      return false;
    }
    if (isNaN(parseFloat(novoPagamento.Valor))) {
      alert("Valor deve ser numérico.");
      return false;
    }
    return true;
  };

  const abrirModalNovo = () => {
    setEditarPagamentoId(null);
    setNovoPagamento({
      ConsultaId: "",
      Valor: "",
      DataPagamento: "",
      ExameId: "",
      ValorExame: "",
    });
    setShowModal(true);
  };

  const abrirModalEditar = (pagamento) => {
    setEditarPagamentoId(pagamento.PagamentoId);
    setNovoPagamento({
      ConsultaId: pagamento.ConsultaId,
      Valor: pagamento.Valor.toString(),
      DataPagamento: pagamento.DataPagamento ? pagamento.DataPagamento.split("T")[0] : "",
      ExameId: pagamento.ExameId,
      ValorExame: pagamento.ValorExame?.toString() || "",
    });
    setShowModal(true);
  };

  const handleAddEditarPagamento = () => {
    if (!validarCampos()) return;

    if (editarPagamentoId) {
      const listaAtualizada = pagamentos.map((p) =>
        p.PagamentoId === editarPagamentoId
          ? {
              ...novoPagamento,
              PagamentoId: editarPagamentoId,
              Valor: parseFloat(novoPagamento.Valor),
              ValorExame: parseFloat(novoPagamento.ValorExame) || 0,
            }
          : p
      );
      setPagamentos(listaAtualizada);
      salvarPagamentos(listaAtualizada);
    } else {
      const pagamentoComId = {
        ...novoPagamento,
        PagamentoId: crypto.randomUUID(),
        Valor: parseFloat(novoPagamento.Valor),
        ValorExame: parseFloat(novoPagamento.ValorExame) || 0,
      };
      const novaLista = [...pagamentos, pagamentoComId];
      setPagamentos(novaLista);
      salvarPagamentos(novaLista);
    }

    setShowModal(false);
  };

  const handleExcluir = (id) => {
    if (window.confirm("Deseja realmente excluir este pagamento?")) {
      const novaLista = pagamentos.filter((p) => p.PagamentoId !== id);
      setPagamentos(novaLista);
      salvarPagamentos(novaLista);
    }
  };

  return (
    <div
      className="container my-4"
      style={{ backgroundColor: cores.fundoTela, minHeight: "100vh", padding: "20px" }}
    >
      <h2 className="mb-4" style={{ color: cores.botaoPrincipal, fontWeight: "700" }}>
        Gerenciar Pagamentos
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
          <h5>+ Adicionar Novo Pagamento</h5>
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
          <Modal.Title>{editarPagamentoId ? "Editar Pagamento" : "Adicionar Novo Pagamento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard, color: cores.textoSecundario }}>
          <Form>
            <Form.Group className="mb-3" controlId="formConsultaId">
              <Form.Label>Consulta ID *</Form.Label>
              <Form.Control
                type="text"
                name="ConsultaId"
                value={novoPagamento.ConsultaId}
                onChange={handleChange}
                placeholder="ID da consulta"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formValor">
              <Form.Label>Valor (Consulta) *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="Valor"
                value={novoPagamento.Valor}
                onChange={handleChange}
                placeholder="Valor da consulta"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDataPagamento">
              <Form.Label>Data do Pagamento</Form.Label>
              <Form.Control
                type="date"
                name="DataPagamento"
                value={novoPagamento.DataPagamento}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formExameId">
              <Form.Label>Exame ID</Form.Label>
              <Form.Control
                type="text"
                name="ExameId"
                value={novoPagamento.ExameId}
                onChange={handleChange}
                placeholder="ID do exame"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formValorExame">
              <Form.Label>Valor (Exame)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="ValorExame"
                value={novoPagamento.ValorExame}
                onChange={handleChange}
                placeholder="Valor do exame"
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
            onClick={handleAddEditarPagamento}
          >
            {editarPagamentoId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {pagamentos.length === 0 ? (
          <p className="text-center" style={{ color: cores.textoSecundario, width: "100%" }}>
            Nenhum pagamento cadastrado.
          </p>
        ) : (
          pagamentos.map((pagamento) => (
            <Col md={4} lg={3} sm={6} key={pagamento.PagamentoId} className="mb-4">
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
                    Pagamento
                  </Card.Title>
                  <Card.Text>
                    <strong>Consulta ID:</strong> {pagamento.ConsultaId || "-"} <br />
                    <strong>Valor:</strong> R$ {pagamento.Valor.toFixed(2)} <br />
                    <strong>Data:</strong> {pagamento.DataPagamento || "-"} <br />
                    <strong>Exame ID:</strong> {pagamento.ExameId || "-"} <br />
                    <strong>Valor Exame:</strong> R$ {pagamento.ValorExame?.toFixed(2) || "0.00"}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    onClick={() => abrirModalEditar(pagamento)}
                    style={{ borderColor: cores.botaoPrincipal, color: cores.botaoPrincipal }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleExcluir(pagamento.PagamentoId)}
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

export default Pagamento;
