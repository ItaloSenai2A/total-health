import { Navigate, useLocation } from "react-router-dom";

function RotaPrivada({ usuario, children }) {
  const location = useLocation();

  if (!usuario) {
    alert("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/loginCadastro" state={{ from: location }} replace />;
  }

  return children;
}

export default RotaPrivada;
