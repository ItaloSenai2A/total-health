import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Exame = () => {
  const [exames, setExames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarExameId, setEditarExameId] = useState(null);

  // Estado do formulário exame
  const [novoExame, setNovoExame] = useState({
    Nome: "",
    Descricao: "",
    UsuarioId: "",
    PrescricaoId: "",
    Valor: "",
  });

  // Paleta de cores (mesmas do usuário)
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

  // Carregar exames do localStorage
  useEffect(() => {
    const dados = localStorage.getItem("totalhealth_exames");
    if (dados) setExames(JSON.parse(dados));
  }, []);

  // Salvar exames no localStorage
  const salvarExames = (lista) => {
    localStorage.setItem("totalhealth_exames", JSON.stringify(lista));
  };

  // Atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoExame((prev) => ({ ...prev, [name]: value }));
  };

  // Validação simples
  const validarCampos = () => {
    if (!novoExame.Nome.trim() || !novoExame.Valor.trim()) {
      alert("Nome e Valor são obrigatórios.");
      return false;
    }
    if (isNaN(parseFloat(novoExame.Valor))) {
      alert("Valor deve ser numérico.");
      return false;
    }
    return true;
  };

  // Abrir modal para novo exame
  const abrirModalNovo = () => {
    setEditarExameId(null);
    setNovoExame({
      Nome: "",
      Descricao: "",
      UsuarioId: "",
      PrescricaoId: "",
      Valor: "",
    });
    setShowModal(true);
  };

  // Abrir modal para editar exame
  const abrirModalEditar = (exame) => {
    setEditarExameId(exame.ExameId);
    setNovoExame({
      Nome: exame.Nome,
      Descricao: exame.Descricao,
      UsuarioId: exame.UsuarioId,
      PrescricaoId: exame.PrescricaoId,
      Valor: exame.Valor.toString(),
    });
    setShowModal(true);
  };

  // Adicionar ou editar exame
  const handleAddEditarExame = () => {
    if (!validarCampos()) return;

    if (editarExameId) {
      // Editar
      const listaAtualizada = exames.map((e) =>
        e.ExameId === editarExameId
          ? { ...novoExame, ExameId: editarExameId, Valor: parseFloat(novoExame.Valor) }
          : e
      );
      setExames(listaAtualizada);
      salvarExames(listaAtualizada);
    } else {
      // Novo
      const exameComId = {
        ...novoExame,
        ExameId: crypto.randomUUID(),
        Valor: parseFloat(novoExame.Valor),
      };
      const novaLista = [...exames, exameComId];
      setExames(novaLista);
      salvarExames(novaLista);
    }

    setShowModal(false);
  };

  // Excluir exame
  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este exame?")) {
      const listaFiltrada = exames.filter((e) => e.ExameId !== id);
      setExames(listaFiltrada);
      salvarExames(listaFiltrada);
    }
  };

  return (
    <div
      className="container my-4"
      style={{ backgroundColor: cores.fundoTela, minHeight: "100vh", padding: "20px" }}
    >
      <h2 className="mb-4" style={{ color: cores.botaoPrincipal, fontWeight: "700" }}>
        Gerenciar Exames
      </h2>

      {/* Card adicionar novo exame */}
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
          <h5>+ Adicionar Novo Exame</h5>
        </Card.Body>
      </Card>

      {/* Modal grande */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header style={{ backgroundColor: cores.botaoPrincipal, color: "#fff" }} closeButton>
          <Modal.Title>{editarExameId ? "Editar Exame" : "Adicionar Novo Exame"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard, color: cores.textoSecundario }}>
          <Form>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome *</Form.Label>
              <Form.Control
                type="text"
                name="Nome"
                value={novoExame.Nome}
                onChange={handleChange}
                placeholder="Nome do exame"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="Descricao"
                value={novoExame.Descricao}
                onChange={handleChange}
                placeholder="Descrição do exame"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsuarioId">
              <Form.Label>Usuário ID</Form.Label>
              <Form.Control
                type="text"
                name="UsuarioId"
                value={novoExame.UsuarioId}
                onChange={handleChange}
                placeholder="ID do usuário associado"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrescricaoId">
              <Form.Label>Prescrição ID</Form.Label>
              <Form.Control
                type="text"
                name="PrescricaoId"
                value={novoExame.PrescricaoId}
                onChange={handleChange}
                placeholder="ID da prescrição associada"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formValor">
              <Form.Label>Valor *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="Valor"
                value={novoExame.Valor}
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
            onClick={handleAddEditarExame}
          >
            {editarExameId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Lista de exames */}
      <Row>
        {exames.length === 0 ? (
          <p className="text-center" style={{ color: cores.textoSecundario, width: "100%" }}>
            Nenhum exame cadastrado.
          </p>
        ) : (
          exames.map((exame) => (
            <Col md={4} lg={3} sm={6} key={exame.ExameId} className="mb-4">
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
                    {exame.Nome}
                  </Card.Title>
                  <Card.Text>
                    <strong>Descrição:</strong> {exame.Descricao || "-"} <br />
                    <strong>Usuário ID:</strong> {exame.UsuarioId || "-"} <br />
                    <strong>Prescrição ID:</strong> {exame.PrescricaoId || "-"} <br />
                    <strong>Valor:</strong> R$ {exame.Valor.toFixed(2)}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    onClick={() => abrirModalEditar(exame)}
                    style={{ borderColor: cores.botaoPrincipal, color: cores.botaoPrincipal }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleExcluir(exame.ExameId)}
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

export default Exame;
