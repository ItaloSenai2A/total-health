import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white text-center py-3"
      style={{
        // Removido position fixed e propriedades relacionadas
        width: "100%", // Opcional, para garantir largura total
        zIndex: 10, // Pode remover se não precisar
      }}
    >
      <div className="container">
        <p className="mb-0">
          © 2025 TotalHealth. Todos os direitos reservados.
        </p>
        <p className="mb-0">
          <a href="/sobre" className="text-white text-decoration-none">
            Sobre Nós
          </a>{" "}
          |{" "}
          <a href="/contato" className="text-white text-decoration-none">
            Contato
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
