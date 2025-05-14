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

  const handleSubmitCadastro = (e) => {
    e.preventDefault();
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    const cadastro = { nome, email, senha };
    localStorage.setItem("usuario", JSON.stringify(cadastro));
    if (onLogin) onLogin(cadastro);
    navigate("/");
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
    } else {
      setErro("E-mail ou senha incorretos.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFF5E1",
        padding: "20px",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          border: "2px solid #D4AF37",
          borderRadius: "16px",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#1C1C1C" }}>
          {modoCadastro ? "Cadastro" : "Login"}
        </h2>

        <form onSubmit={modoCadastro ? handleSubmitCadastro : handleSubmitLogin}>
          {modoCadastro && (
            <div className="mb-3">
              <label className="form-label" style={{ color: "#3A3A3A" }}>
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label" style={{ color: "#3A3A3A" }}>
              E-mail:
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#3A3A3A" }}>
              Senha:
            </label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && (
            <div className="mb-3" style={{ color: "#C0392B", fontWeight: "500" }}>
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#8B0000",
              color: "#FFFFFF",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#A30000")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#8B0000")}
          >
            {modoCadastro ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <button
            className="btn btn-link"
            style={{ color: "#8B0000", textDecoration: "none", fontWeight: "500" }}
            onClick={() => {
              setModoCadastro(!modoCadastro);
              setErro("");
              setNome("");
              setEmail("");
              setSenha("");
            }}
          >
            {modoCadastro ? "Já tem conta? Entrar" : "Não tem conta? Cadastre-se"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginCadastro;
