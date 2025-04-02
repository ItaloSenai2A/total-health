import { useNavigate } from "react-router";

const NovaConsulta = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/consulta"); // Volta para a lista de consultas após criar
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-lg p-4 py-5 d-flex flex-column justify-content-center"
               style={{ minHeight: "75vh", minHeight: "80vh" }}>
            <h2 className="mb-4 text-center fw-bold text-danger">Nova Consulta</h2>

            <form onSubmit={handleSubmit} className="flex-grow-1">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="paciente" className="form-label fw-semibold">
                    Paciente
                  </label>
                  <input type="text" className="form-control rounded-3" id="paciente" placeholder="Nome do Paciente" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="medico" className="form-label fw-semibold">
                    Médico
                  </label>
                  <input type="text" className="form-control rounded-3" id="medico" placeholder="Nome do Médico" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="valor" className="form-label fw-semibold">
                    Valor
                  </label>
                  <input type="text" className="form-control rounded-3" id="valor" placeholder="Valor da Consulta" />
                </div>

                <div className="col-md-4">
                  <label htmlFor="status" className="form-label fw-semibold">
                    Status
                  </label>
                  <select className="form-select rounded-3" id="status">
                    <option value="">Selecione</option>
                    <option value="pendente">Pendente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="data" className="form-label fw-semibold">
                    Data
                  </label>
                  <input type="date" className="form-control rounded-3" id="data" />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 rounded-3"
                  style={{
                    backgroundColor: "#1a6ca8",
                    borderColor: "#1a6ca8",
                  }}
                >
                  Criar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaConsulta;
