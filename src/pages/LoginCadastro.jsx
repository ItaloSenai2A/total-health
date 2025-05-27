// pages/LoginCadastro.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginCadastro({ onLogin }) {
  const [modoCadastro, setModoCadastro] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const cores = {
    fundo: "#F2F2F2",
    texto: "#1C1C1C",
    destaque: "#8B0000",
    hover: "#A30000",
    borda: "#D4AF37",
  };

  const handleSubmitCadastro = (e) => {
    e.preventDefault();
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    const avatarAleatorio = `https://api.dicebear.com/6.x/bottts/svg?seed=${nome}`;
    const cadastro = { nome, email, senha, avatar: avatarAleatorio };
    localStorage.setItem("usuario", JSON.stringify(cadastro));

    setModoCadastro(false);
    setErro("");
    setNome("");
    setEmail("");
    setSenha("");
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.email === email && usuario?.senha === senha) {
      if (onLogin) onLogin(usuario);
      navigate("/");
      window.location.reload();
    } else {
      setErro("E-mail ou senha incorretos.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: cores.fundo,
        padding: "20px",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "90%",
          maxWidth: "450px",
          minWidth: "280px",
          backgroundColor: "#ffffff",
          border: `2px solid ${cores.borda}`,
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: cores.texto,
            fontWeight: "600",
            fontSize: "26px",
          }}
        >
          {modoCadastro ? "Crie sua conta" : "Bem-vindo de volta"}
        </h2>

        <form onSubmit={modoCadastro ? handleSubmitCadastro : handleSubmitLogin}>
          {modoCadastro && (
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: "500" }}>
                Nome completo:
              </label>
              <input
                type="text"
                className="form-control rounded-pill"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "500" }}>
              E-mail:
            </label>
            <input
              type="email"
              className="form-control rounded-pill"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "500" }}>
              Senha:
            </label>
            <input
              type="password"
              className="form-control rounded-pill"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && (
            <div
              className="mb-3"
              style={{ color: "#C0392B", fontWeight: "500", fontSize: "14px" }}
            >
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="btn w-100 rounded-pill"
            style={{
              backgroundColor: cores.destaque,
              color: "#FFFFFF",
              fontWeight: "600",
              fontSize: "16px",
              padding: "10px 0",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = cores.hover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = cores.destaque)}
          >
            {modoCadastro ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <button
            className="btn btn-link"
            style={{
              color: cores.destaque,
              textDecoration: "none",
              fontWeight: "500",
            }}
            onClick={() => {
              setModoCadastro(!modoCadastro);
              setErro("");
              setNome("");
              setEmail("");
              setSenha("");
            }}
          >
            {modoCadastro
              ? "Já tem conta? Faça login"
              : "Ainda não tem conta? Cadastre-se"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginCadastro;
