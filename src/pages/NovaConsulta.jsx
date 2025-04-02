

import { useNavigate } from "react-router"

const NovaConsulta = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para salvar a consulta
    navigate("/consulta") // Volta para a lista de consultas após criar
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 fw-bold">Consulta</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="paciente" className="form-label">
                    Paciente
                  </label>
                  <input type="text" className="form-control" id="paciente" placeholder="Nome do Paciente" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="medico" className="form-label">
                    Médico
                  </label>
                  <input type="text" className="form-control" id="medico" placeholder="Médico" />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="valor" className="form-label">
                    Valor
                  </label>
                  <input type="text" className="form-control" id="valor" placeholder="Consulta" />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <input type="text" className="form-control" id="status" placeholder="Status" />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="data" className="form-label">
                    Data
                  </label>
                  <div className="input-group">
                    <input type="date" className="form-control" id="data" />
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#1a6ca8",
                    borderColor: "#1a6ca8",
                    minWidth: "120px",
                  }}
                >
                  Criar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NovaConsulta

