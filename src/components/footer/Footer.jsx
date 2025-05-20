import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white text-center py-3"
      style={{
        position: "fixed",  // Fixa o footer na tela
        bottom: 0,         // Coloca o footer na parte inferior
        left: 0,           // Alinha à esquerda
        width: "100%",     // Faz com que ocupe toda a largura da tela
        zIndex: 10,        // Garante que o footer fique acima de outros elementos
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
