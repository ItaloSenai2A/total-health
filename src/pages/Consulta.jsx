import style from "./Consulta.module.css";
import { useNavigate } from "react-router";

const Consulta = () => {
  const navigate = useNavigate();

  // Exemplo de consultas cadastradas (mantendo os dados originais)
  const consultas = [
    {
      id: 1,
      paciente: "João Silva",
      data: "2023-10-01",
      medico: "Dr. Tal",
      status: "Agendada",
      valor: "R$500,00",
    },
    {
      id: 2,
      paciente: "Maria Oliveira",
      data: "2023-10-05",
      medico: "Dr. Tal",
      status: "Concluída",
      valor: "R$500,00",
    },
    {
      id: 3,
      paciente: "Carlos Santos",
      data: "2023-10-10",
      medico: "Dr. Tal",
      status: "Finalizada",
      valor: "R$500,00",
    },
    
  ];

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4" style={{ fontWeight: 600 }}>
        Consultas
      </h2>

      {/* Search and pagination */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            className="form-control pe-5"
            placeholder="Buscar"
          />
        </div>
      </div>

      <div className="row g-4">
        {/* Card para criar nova consulta */}
        <div className="col-12 col-md-6 col-lg-4 col-xl-3">
          <div
            className="card h-100"
            style={{
              cursor: "pointer",
              borderRadius: "8px",
              borderStyle: "dashed",
              borderWidth: "1px",
              borderColor: "#ccc",
            }}
            onClick={() => navigate("/consulta/nova")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <div
                className="text-primary mb-3"
                style={{ width: "80px", height: "80px" }}
              ></div>
              <h5 className="card-title text-primary">Criar Nova Consulta</h5>
            </div>
          </div>
        </div>

        {/* Cards para consultas cadastradas*/}
        {consultas.map((consulta) => (
          <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={consulta.id}>
            <div
              className="card h-100"
              style={{
                borderRadius: "8px",
                border: "1px solid #f0f0f0",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <div className="card-body p-3">
                {/* Header with patient name and menu */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title text-danger">
                    {consulta.paciente}
                  </h5>
                  <button className="btn btn-sm btn-light rounded-circle p-1">
                    ⋮
                  </button>
                </div>

                <p className="card-text">
                  <strong>Data:</strong> {consulta.data}
                </p>
                <p className="card-text">
                  <strong>Médico:</strong> {consulta.medico}
                </p>
                <p className="card-text">
                  <strong>Status:</strong> {consulta.status}
                </p>
                <p className="card-text">
                  <strong>Valor:</strong> {consulta.valor}
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
