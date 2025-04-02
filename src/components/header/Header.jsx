import { Link } from "react-router";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white"
      style={{
        minHeight: "90px",
        fontFamily: "'Poppins', 'Open Sans', 'Lato', sans-serif"
      }}
    >
      <div className="container" style={{ marginLeft: "25%" }}> {/* Alinhamento ajustado */}
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "#800020", fontWeight: "bold", fontSize: "20px" }} // Tamanho aumentado para a marca
        >
          TotalHealth
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{ color: "#800020", fontWeight: "bold", fontSize: "18px" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/sobre#navbar"
                style={{ color: "#800020", fontWeight: "bold", fontSize: "18px" }}
              >
                Sobre
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contato#navbar"
                style={{ color: "#800020", fontWeight: "bold", fontSize: "18px" }}
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
