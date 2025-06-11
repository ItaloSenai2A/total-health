import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginCadastro({ onLogin }) {
  const [modoCadastro, setModoCadastro] = useState(true);
  // const [nome, setNome] = useState("");
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

  useEffect(() => {
    if (localStorage.getItem("usuario")) {
      navigate("/"); // Redireciona para a página principal
    }
  }, [navigate]);

  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro("E-mail inválido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await fetch(
        "https://totalhealth.somee.com/Users/register",
        {
          method: "POST",
          headers: { accept: "*/*", "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: senha }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors?.DuplicateUserName) {
          setErro("E-mail já cadastrado. Tente outro e-mail.");
        } else {
          setErro(errorData.title || "Erro ao cadastrar.");
        }
        return;
      }

      setModoCadastro(false);
      setErro("");
      setEmail("");
      setSenha("");
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    try {
      const response = await fetch(
        "https://totalhealth.somee.com/Users/login?useCookies=false&useSessionCookies=false",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password: senha }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "E-mail ou senha incorretos.");
        return;
      }

      // Capturar o token e o userId da resposta
      const token = data.accessToken;

      // Salvar o token e o userId no localStorage
      if (typeof token === "string") {
        localStorage.setItem("token", token);
      } else {
        console.error("Token inválido:", token);
        setErro("Erro ao processar o token de autenticação.");
        return;
      }

      if (onLogin) onLogin({ email });
      // Verificando se o perfil do usuário existe
      const profileResponse = await fetch(
        `https://totalhealth.somee.com/api/UsuariosLogin/${email}`,
        {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (profileResponse.status === 204) {
        navigate("/usuarioLogin"); // Redireciona para a página de edição de perfil
      }

      if (!profileResponse.ok) {
        throw new Error("Erro ao verificar o perfil do usuário");
      }

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        // Se o perfil não existir, redireciona para a página de edição de perfil
        console.log("Perfil do usuário encontrado:", profileData);
        localStorage.setItem("usuario", JSON.stringify(profileData));
        window.location.reload(); // Recarrega a página para atualizar o estado do usuário
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErro("Erro ao conectar com o servidor.");
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

        <form
          onSubmit={modoCadastro ? handleSubmitCadastro : handleSubmitLogin}
        >
          {/* {modoCadastro && (
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
          )} */}

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
              color: "#fff",
              fontWeight: "600",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = cores.hover)}
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = cores.destaque)
            }
          >
            {modoCadastro ? "Cadastrar" : "Entrar"}
          </button>

          <p
            className="text-center mt-3"
            style={{ fontSize: "14px", color: cores.texto }}
          >
            {modoCadastro ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
            <span
              style={{ color: cores.destaque, cursor: "pointer" }}
              onClick={() => {
                setModoCadastro(!modoCadastro);
                setErro("");
              }}
            >
              {modoCadastro ? "Entrar" : "Cadastrar"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginCadastro;
