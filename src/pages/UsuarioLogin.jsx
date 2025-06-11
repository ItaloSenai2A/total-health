import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsuarioLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  // RECEBER onLogin como prop
  const [usuarioLogin, setUsuarioLogin] = useState({
    cargo: "",
    username: "",
    telefone: "",
  });

  useEffect(() => {
    if (localStorage.getItem("contador")) {
      navigate("/"); // Redireciona para a página principal se já estiver logado
    }
  }, [navigate]);

  const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioLogin({ ...usuarioLogin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://totalhealth.somee.com/api/UsuariosLogin/${usuarioStorage.email}`,
      {
        method: "POST",
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        localStorage.setItem("usuario", JSON.stringify(response)); // Armazena os dados do usuário no localStorage
      }
    });

    fetch(`https://totalhealth.somee.com/api/UsuariosLogin`, {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(usuarioLogin),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar usuário.");
        }

        const contentType = response.headers.get("content-type");
        let data = null;

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        }

        alert("Usuário cadastrado com sucesso!");
        setUsuarioLogin({
          cargo: "",
          username: "",
          telefone: "",
        });

        if (typeof onLogin === "function") onLogin(data); // chama onLogin só se existir e for função
        localStorage.setItem(
          "contador",
          parseInt(localStorage.getItem("contador") || 0) + 1
        ); // Atualiza o contador para redirecionar após o cadastro
        window.location.reload(); // Redireciona para home
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao cadastrar usuário.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="p-4 rounded-lg"
        style={{
          border: "2px solid gold",
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "20px", // aumento do arredondamento
        }}
      >
        <h2 className="text-center mb-4">Complete seu Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Cargo:</label>
            <select
              className="form-select"
              name="cargo"
              value={usuarioLogin.cargo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um cargo</option>
              <option value="Administração">Administração</option>
              <option value="Funcionário da Saúde">Funcionário da Saúde</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Nome completo:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={usuarioLogin.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone:</label>
            <input
              type="text"
              className="form-control"
              name="telefone"
              value={usuarioLogin.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#800000" }}
          >
            Cadastrar
          </button>
        </form>

        <div className="text-center mt-3">
          <a
            href="/loginCadastro"
            style={{ color: "#800000", textDecoration: "none" }}
          >
            Já tem conta? Faça login
          </a>
        </div>
      </div>
    </div>
  );
};

export default UsuarioLogin;
