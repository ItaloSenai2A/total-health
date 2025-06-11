import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Especialidade = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarId, setEditarId] = useState(null);
  const [nome, setNome] = useState("");

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
    const dados = localStorage.getItem("totalhealth_especialidades");
    if (dados) {
      const convertidos = JSON.parse(dados).map((e) => ({
        EspecialidadeId: e.EspecialidadeId ?? e.id,
        Nome: e.Nome ?? e.nome,
      }));
      setEspecialidades(convertidos);
    }
  }, []);

  const salvarEspecialidades = (lista) => {
    localStorage.setItem("totalhealth_especialidades", JSON.stringify(lista));
  };

  const abrirModalNovo = () => {
    setEditarId(null);
    setNome("");
    setShowModal(true);
  };

  const abrirModalEditar = (esp) => {
    setEditarId(esp.EspecialidadeId);
    setNome(esp.Nome);
    setShowModal(true);
  };

  const validarNome = () => {
    if (!nome.trim()) {
      alert("O nome da especialidade é obrigatório.");
      return false;
    }
    return true;
  };

  const salvarEspecialidade = async () => {
    if (!validarNome()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token de autenticação não encontrado.");
      return;
    }

    try {
      if (editarId) {
        const response = await fetch(
          `https://totalhealth.somee.com/api/Especialidades/${editarId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: editarId, nome }), // Alteração importante aqui
          }
        );

        if (response.ok) {
          const listaAtualizada = especialidades.map((e) =>
            e.EspecialidadeId === editarId
              ? { EspecialidadeId: editarId, Nome: nome }
              : e
          );
          setEspecialidades(listaAtualizada);
          salvarEspecialidades(listaAtualizada);
          setShowModal(false);
        } else {
          alert("Erro ao editar especialidade.");
        }
      } else {
        const response = await fetch(
          "https://totalhealth.somee.com/api/Especialidades",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nome }),
          }
        );

        if (response.ok) {
          const novaEspecialidade = await response.json();
          const novaLista = [
            ...especialidades,
            {
              EspecialidadeId:
                novaEspecialidade.EspecialidadeId ?? novaEspecialidade.id,
              Nome: novaEspecialidade.Nome ?? novaEspecialidade.nome,
            },
          ];
          setEspecialidades(novaLista);
          salvarEspecialidades(novaLista);
          setShowModal(false);
        } else {
          alert("Erro ao salvar especialidade.");
        }
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de rede ao tentar salvar/editar.");
    }
  };
  console.log(especialidades);

  const excluirEspecialidade = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta especialidade?"))
      return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token de autenticação não encontrado.");
      return;
    }

    try {
      const response = await fetch(
        `https://totalhealth.somee.com/api/Especialidades/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const listaFiltrada = especialidades.filter(
          (e) => e.EspecialidadeId !== id
        );
        setEspecialidades(listaFiltrada);
        salvarEspecialidades(listaFiltrada);
      } else {
        alert("Erro ao excluir especialidade.");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro de rede ao tentar excluir.");
    }
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
        Gerenciar Especialidades
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
          <h5>+ Adicionar Nova Especialidade</h5>
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
            {editarId ? "Editar Especialidade" : "Adicionar Nova Especialidade"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: cores.fundoCard,
            color: cores.textoSecundario,
          }}
        >
          <Form>
            <Form.Group controlId="formNomeEspecialidade" className="mb-3">
              <Form.Label>Nome *</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome da especialidade"
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
            onClick={salvarEspecialidade}
          >
            {editarId ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {especialidades.length === 0 ? (
          <p
            className="text-center"
            style={{ color: cores.textoSecundario, width: "100%" }}
          >
            Nenhuma especialidade cadastrada.
          </p>
        ) : (
          especialidades.map((esp) => (
            <Col
              md={4}
              lg={3}
              sm={6}
              key={esp.EspecialidadeId}
              className="mb-4"
            >
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
                  <Card.Title
                    style={{ color: cores.botaoPrincipal, fontWeight: "700" }}
                  >
                    {esp.Nome}
                  </Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    onClick={() => abrirModalEditar(esp)}
                    style={{
                      borderColor: cores.botaoPrincipal,
                      color: cores.botaoPrincipal,
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => excluirEspecialidade(esp.EspecialidadeId)}
                    style={{
                      borderColor: cores.botaoAtivo,
                      color: cores.botaoAtivo,
                    }}
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

export default Especialidade;
