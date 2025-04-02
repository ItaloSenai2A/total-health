import { useNavigate } from "react-router";

const Consulta = () => {
  const navigate = useNavigate();

  // Exemplo de consultas cadastradas
  const consultas = [
    { id: 1, paciente: "João Silva", data: "2023-10-01", descricao: "Consulta de rotina" },
    { id: 2, paciente: "Maria Oliveira", data: "2023-10-05", descricao: "Exame de sangue" },
    { id: 3, paciente: "Carlos Santos", data: "2023-10-10", descricao: "Consulta cardiológica" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Consultas</h2>
      <div className="row">
        {/* Card para criar nova consulta */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center border-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/consulta/nova")}
          >
            <div className="card-body">
              <h5 className="card-title text-primary">Criar Nova Consulta</h5>
            </div>
          </div>
        </div>

        {/* Cards para consultas cadastradas */}
        {consultas.map((consulta) => (
          <div className="col-md-4 mb-3" key={consulta.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{consulta.paciente}</h5>
                <p className="card-text">
                  <strong>Data:</strong> {consulta.data}
                </p>
                <p className="card-text">
                  <strong>Descrição:</strong> {consulta.descricao}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consulta;