import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Contato = () => {
  const [contatos, setContatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarId, setEditarId] = useState(null);
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [endereco, setEndereco] = useState("");
  const [redesSociais, setRedesSociais] = useState("");

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
    const dados = localStorage.getItem("totalhealth_contatos");
    if (dados) setContatos(JSON.parse(dados));
  }, []);

  const salvarContatos = (lista) => {
    localStorage.setItem("totalhealth_contatos", JSON.stringify(lista));
  };

  const abrirModalNovo = () => {
    setEditarId(null);
    setTipo("");
    setValor("");
    setEndereco("");
    setRedesSociais("");
    setShowModal(true);
  };

  const abrirModalEditar = (contato) => {
    setEditarId(contato.ContatoId);
    setTipo(contato.Tipo);
    setValor(contato.Valor);
    setEndereco(contato.Endereco);
    setRedesSociais(contato.RedesSociais);
    setShowModal(true);
  };

  const validarCampos = () => {
    if (!tipo.trim() || !valor.trim() || !endereco.trim() || !redesSociais.trim()) {
      alert("Preencha todos os campos.");
      return false;
    }
    return true;
  };

  const salvarContato = () => {
    if (!validarCampos()) return;

    const novo = {
      ContatoId: editarId || crypto.randomUUID(),
      Tipo: tipo.trim(),
      Valor: valor.trim(),
      Endereco: endereco.trim(),
      RedesSociais: redesSociais.trim(),
    };

    const listaAtualizada = editarId
      ? contatos.map((c) => (c.ContatoId === editarId ? novo : c))
      : [...contatos, novo];

    setContatos(listaAtualizada);
    salvarContatos(listaAtualizada);
    setShowModal(false);
  };

  const excluirContato = (id) => {
    if (window.confirm("Deseja excluir este contato?")) {
      const lista = contatos.filter((c) => c.ContatoId !== id);
      setContatos(lista);
      salvarContatos(lista);
    }
  };

  return (
    <div
      className="container my-4"
      style={{ backgroundColor: cores.fundoTela, minHeight: "100vh", padding: "20px" }}
    >
      <h2 className="mb-4" style={{ color: cores.botaoPrincipal, fontWeight: "700" }}>
        Gerenciar Contatos
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
          <h5>+ Adicionar Novo Contato</h5>
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
          <Modal.Title>{editarId ? "Editar Contato" : "Novo Contato"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tipo *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Email, Telefone"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: exemplo@email.com, (11) 99999-9999"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Endereço *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Endereço do contato"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Redes Sociais *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: @instagram, /facebook"
                value={redesSociais}
                onChange={(e) => setRedesSociais(e.target.value)}
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
            onClick={salvarContato}
          >
            {editarId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {contatos.length === 0 ? (
          <p className="text-center" style={{ color: cores.textoSecundario, width: "100%" }}>
            Nenhum contato cadastrado.
          </p>
        ) : (
          contatos.map((c) => (
            <Col md={4} lg={3} sm={6} key={c.ContatoId} className="mb-4">
              <Card
                style={{
                  backgroundColor: cores.fundoCard,
                  border: `2px solid ${cores.bordaDourada}`,
                  color: cores.textoTitulo,
                }}
              >
                <Card.Body>
                  <Card.Title>{c.Tipo}</Card.Title>
                  <Card.Text><strong>Valor:</strong> {c.Valor}</Card.Text>
                  <Card.Text><strong>Endereço:</strong> {c.Endereco}</Card.Text>
                  <Card.Text><strong>Redes Sociais:</strong> {c.RedesSociais}</Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEditar(c)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => excluirContato(c.ContatoId)}
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

export default Contato;
