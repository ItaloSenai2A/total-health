import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState(null);

  // Estado para o formulário de usuário
  const [novoUsuario, setNovoUsuario] = useState({
    Nome: "",
    Email: "",
    Senha: "",
    Telefone: "",
    Cpf: "",
    Genero: "",
    TipoSanguineo: "",
    Endereco: "",
  });

  // Carrega usuários do localStorage no carregamento
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("totalhealth_usuarios");
    if (dadosSalvos) {
      setUsuarios(JSON.parse(dadosSalvos));
    }
  }, []);

  // Salva usuários no localStorage
  const salvarUsuarios = (lista) => {
    localStorage.setItem("totalhealth_usuarios", JSON.stringify(lista));
  };

  // Handle para atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  // Validação simples
  const validarCampos = () => {
    if (!novoUsuario.Nome.trim() || !novoUsuario.Telefone.trim() || !novoUsuario.Cpf.trim()) {
      alert("Nome, Telefone e CPF são obrigatórios.");
      return false;
    }
    return true;
  };

  // Abrir modal para novo usuário
  const abrirModalNovo = () => {
    setEditarUsuario(null);
    setNovoUsuario({
      Nome: "",
      Email: "",
      Senha: "",
      Telefone: "",
      Cpf: "",
      Genero: "",
      TipoSanguineo: "",
      Endereco: "",
    });
    setShowModal(true);
  };

  // Abrir modal para editar usuário existente
  const abrirModalEditar = (usuario) => {
    setEditarUsuario(usuario.UsuarioId);
    setNovoUsuario({ ...usuario });
    setShowModal(true);
  };

  // Adicionar ou editar usuário
  const handleAddEditarUsuario = () => {
    if (!validarCampos()) return;

    if (editarUsuario) {
      // Editar
      const listaAtualizada = usuarios.map((u) =>
        u.UsuarioId === editarUsuario ? { ...novoUsuario, UsuarioId: editarUsuario } : u
      );
      setUsuarios(listaAtualizada);
      salvarUsuarios(listaAtualizada);
    } else {
      // Adicionar novo
      const usuarioComId = {
        ...novoUsuario,
        UsuarioId: Date.now(),
      };
      const novaLista = [...usuarios, usuarioComId];
      setUsuarios(novaLista);
      salvarUsuarios(novaLista);
    }

    setShowModal(false);
  };

  // Excluir usuário
  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      const listaFiltrada = usuarios.filter((u) => u.UsuarioId !== id);
      setUsuarios(listaFiltrada);
      salvarUsuarios(listaFiltrada);
    }
  };

  // Paleta de cores
  const cores = {
    fundoTela: "#F2F2F2", // alterei para não ficar bege/amarelado
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
      style={{ backgroundColor: cores.fundoTela, minHeight: "100vh", padding: "20px" }}
    >
      <h2 className="mb-4" style={{ color: cores.botaoPrincipal, fontWeight: "700" }}>
        Gerenciar Usuários
      </h2>

      {/* Card para adicionar novo usuário */}
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

      {/* Modal formulário maior */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        size="lg" // tamanho maior do modal
      >
        <Modal.Header style={{ backgroundColor: cores.botaoPrincipal, color: "#fff" }} closeButton>
          <Modal.Title>{editarUsuario ? "Editar Usuário" : "Adicionar Novo Usuário"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: cores.fundoCard, color: cores.textoSecundario }}>
          <Form>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome *</Form.Label>
              <Form.Control
                type="text"
                name="Nome"
                value={novoUsuario.Nome}
                onChange={handleChange}
                placeholder="Digite o nome completo"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={novoUsuario.Email}
                onChange={handleChange}
                placeholder="Digite o email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="Senha"
                value={novoUsuario.Senha}
                onChange={handleChange}
                placeholder="Digite a senha"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTelefone">
              <Form.Label>Telefone *</Form.Label>
              <Form.Control
                type="text"
                name="Telefone"
                value={novoUsuario.Telefone}
                onChange={handleChange}
                placeholder="(xx) xxxx-xxxx"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCpf">
              <Form.Label>CPF *</Form.Label>
              <Form.Control
                type="text"
                name="Cpf"
                value={novoUsuario.Cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGenero">
              <Form.Label>Gênero</Form.Label>
              <Form.Select name="Genero" value={novoUsuario.Genero} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Não binário">Não binário</option>
                <option value="Outros">Outros</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTipoSanguineo">
              <Form.Label>Tipo Sanguíneo</Form.Label>
              <Form.Select
                name="TipoSanguineo"
                value={novoUsuario.TipoSanguineo}
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

            <Form.Group className="mb-3" controlId="formEndereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="Endereco"
                value={novoUsuario.Endereco}
                onChange={handleChange}
                placeholder="Digite o endereço"
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
            onClick={handleAddEditarUsuario}
          >
            {editarUsuario ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Lista de usuários */}
      <Row>
        {usuarios.length === 0 ? (
          <p className="text-center" style={{ color: cores.textoSecundario, width: "100%" }}>
            Nenhum usuário cadastrado.
          </p>
        ) : (
          usuarios.map((usuario) => (
            <Col md={4} lg={3} sm={6} key={usuario.UsuarioId} className="mb-4">
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
                    {usuario.Nome}
                  </Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {usuario.Email || "-"} <br />
                    <strong>Telefone:</strong> {usuario.Telefone} <br />
                    <strong>CPF:</strong> {usuario.Cpf} <br />
                    <strong>Gênero:</strong> {usuario.Genero || "-"} <br />
                    <strong>Tipo Sanguíneo:</strong> {usuario.TipoSanguineo || "-"} <br />
                    <strong>Endereço:</strong> {usuario.Endereco || "-"}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    onClick={() => abrirModalEditar(usuario)}
                    style={{ borderColor: cores.botaoPrincipal, color: cores.botaoPrincipal }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleExcluir(usuario.UsuarioId)}
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

export default Usuario;
