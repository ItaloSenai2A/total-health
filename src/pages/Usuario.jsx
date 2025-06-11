import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState(null);

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
    genero: "",
    tipoSanguineo: "",
    endereco: "",
  });

  const token = localStorage.getItem("token"); // Recupera o token armazenado

  // Carrega usuários da API no carregamento
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const response = await fetch(
          "https://totalhealth.somee.com/api/Usuarios",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar usuários");
        }

        const dados = await response.json();
        setUsuarios(dados);
      } catch (error) {
        console.error(error);
      }
    };

    carregarUsuarios();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    if (
      !novoUsuario.nome.trim() ||
      !novoUsuario.telefone.trim() ||
      !novoUsuario.cpf.trim()
    ) {
      alert("Nome, Telefone e CPF são obrigatórios.");
      return false;
    }
    return true;
  };

  const abrirModalNovo = () => {
    setEditarUsuario(null);
    setNovoUsuario({
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      cpf: "",
      genero: "",
      tipoSanguineo: "",
      endereco: "",
    });
    setShowModal(true);
  };

  const abrirModalEditar = (usuario) => {
    if (!usuario) return;
    setEditarUsuario(usuario.usuarioId || null);
    setNovoUsuario({ ...usuario });
    setShowModal(true);
  };

  const handleAddEditarUsuario = async () => {
    if (!validarCampos()) return;

    try {
      let response;

      const url = editarUsuario
        ? `https://totalhealth.somee.com/api/Usuarios/${editarUsuario}`
        : "https://totalhealth.somee.com/api/Usuarios";

      const method = editarUsuario ? "PUT" : "POST";

      response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const usuarioSalvo = await response.json();

      let novaLista;
      if (editarUsuario) {
        novaLista = usuarios.map((u) =>
          u.usuarioId === editarUsuario ? usuarioSalvo : u
        );
      } else {
        novaLista = [...usuarios, usuarioSalvo];
      }

      setUsuarios(novaLista);
      setShowModal(false);
      setEditarUsuario(null);
    } catch (error) {
      alert("Erro ao salvar usuário: " + error.message);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const response = await fetch(
          `https://totalhealth.somee.com/api/Usuarios/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao excluir usuário");
        }

        const listaFiltrada = usuarios.filter((u) => u.usuarioId !== id);
        setUsuarios(listaFiltrada);
      } catch (error) {
        alert("Erro ao excluir usuário: " + error.message);
      }
    }
  };

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
        Gerenciar Usuários
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
          <h5>+ Adicionar Novo Usuário</h5>
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
            {editarUsuario ? "Editar Usuário" : "Adicionar Novo Usuário"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: cores.fundoCard,
            color: cores.textoSecundario,
          }}
        >
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome *</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={novoUsuario.nome}
                onChange={handleChange}
                placeholder="Digite o nome completo"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={novoUsuario.email}
                onChange={handleChange}
                placeholder="Digite o email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="senha"
                value={novoUsuario.senha}
                onChange={handleChange}
                placeholder="Digite a senha"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone *</Form.Label>
              <Form.Control
                type="text"
                name="telefone"
                value={novoUsuario.telefone}
                onChange={handleChange}
                placeholder="(xx) xxxx-xxxx"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CPF *</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={novoUsuario.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gênero</Form.Label>
              <Form.Select
                name="genero"
                value={novoUsuario.genero}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Não binário">Não binário</option>
                <option value="Outros">Outros</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo Sanguíneo</Form.Label>
              <Form.Select
                name="tipoSanguineo"
                value={novoUsuario.tipoSanguineo}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="endereco"
                value={novoUsuario.endereco}
                onChange={handleChange}
                placeholder="Digite o endereço"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: cores.fundoCard }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            style={{
              backgroundColor: cores.botaoPrincipal,
              borderColor: cores.bordaDourada,
              fontWeight: "600",
            }}
            onClick={handleAddEditarUsuario}
          >
            {editarUsuario ? "Salvar Alterações" : "Adicionar Usuário"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {usuarios.map((usuario) => (
          <Col md={4} key={usuario.usuarioId} className="mb-3">
            <Card
              style={{
                backgroundColor: cores.fundoCard,
                border: `1px solid ${cores.bordaDourada}`,
                padding: "10px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: cores.textoTitulo }}>
                  {usuario.nome}
                </Card.Title>
                <Card.Text style={{ color: cores.textoSecundario }}>
                  Email: {usuario.email} <br />
                  Telefone: {usuario.telefone} <br />
                  CPF: {usuario.cpf}
                </Card.Text>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => abrirModalEditar(usuario)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleExcluir(usuario.usuarioId)}
                >
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Usuario;
