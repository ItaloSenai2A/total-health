const Sobre = () => {
  return (
    <div className="container mt-5" style={{ backgroundColor: "#F2F2F2", padding: "2rem", borderRadius: "1rem" }}>
      <div className="text-center mb-4">
        <h2 style={{ color: "#1C1C1C", fontWeight: "bold" }}>Sobre a TotalHealth</h2>
        <hr style={{ borderTop: "3px solid #8B0000", width: "60px", margin: "0.5rem auto" }} />
      </div>

      <div className="text-start text-secondary">
        <p style={{ color: "#3A3A3A", fontSize: "1.1rem" }}>
          A <strong style={{ color: "#8B0000" }}>TotalHealth</strong> é uma plataforma digital voltada para a modernização e integração de dados no setor da saúde. Nosso objetivo é oferecer uma solução eficiente, segura e centralizada para o gerenciamento de informações clínicas entre hospitais, clínicas e profissionais da área médica.
        </p>

        <p style={{ color: "#3A3A3A", fontSize: "1.1rem" }}>
          Através de uma interface intuitiva, a TotalHealth proporciona mais agilidade na tomada de decisões, redução de erros, organização dos históricos médicos e maior integração entre os setores envolvidos no cuidado com o paciente.
        </p>

        <h4 style={{ color: "#1C1C1C", marginTop: "2rem" }}>✨ Facilidades e Benefícios</h4>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item" style={{ backgroundColor: "#F2F2F2", color: "#3A3A3A" }}>
            ✅ Centralização de prontuários e histórico clínico dos pacientes
          </li>
          <li className="list-group-item" style={{ backgroundColor: "#F2F2F2", color: "#3A3A3A" }}>
            ✅ Compartilhamento seguro de dados entre diferentes instituições
          </li>
          <li className="list-group-item" style={{ backgroundColor: "#F2F2F2", color: "#3A3A3A" }}>
            ✅ Redução de retrabalho e burocracia no atendimento médico
          </li>
          <li className="list-group-item" style={{ backgroundColor: "#F2F2F2", color: "#3A3A3A" }}>
            ✅ Interface moderna, acessível e com suporte técnico especializado
          </li>
        </ul>

        <p className="mt-4" style={{ color: "#3A3A3A", fontSize: "1.1rem" }}>
          A TotalHealth foi pensada para transformar a experiência de gestão hospitalar, contribuindo para um sistema de saúde mais ágil, conectado e eficaz. Ao utilizar nossa plataforma, sua instituição entra em um novo padrão de excelência digital.
        </p>

        <div className="text-end mt-5">
          <span style={{ color: "#D4AF37" }}>🌐 TotalHealth — Conectando o cuidado com a inovação.</span>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
