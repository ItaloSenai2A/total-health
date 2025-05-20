import React from 'react';

const Usuario = () => {
  return (
    <div className="container py-5" style={{ backgroundColor: '#F2F2F2', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg rounded" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="card-header text-center" style={{ backgroundColor: '#8B0000' }}>
              <h3 className="text-white m-0">Cadastro de Usuário</h3>
            </div>
            <div className="card-body px-4 py-5">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">Nome completo</label>
                  <input type="text" className="form-control" placeholder="Digite seu nome completo" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">Email</label>
                  <input type="email" className="form-control" placeholder="exemplo@email.com" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">Senha</label>
                  <input type="password" className="form-control" placeholder="Crie uma senha segura" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">Telefone</label>
                  <input type="text" className="form-control" placeholder="(xx) xxxxx-xxxx" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">CPF</label>
                  <input type="text" className="form-control" placeholder="Digite seu CPF" />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-dark">Gênero</label>
                    <select className="form-select">
                      <option value="">Selecione</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-dark">Tipo Sanguíneo</label>
                    <select className="form-select">
                      <option value="">Selecione</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-dark">Endereço</label>
                  <input type="text" className="form-control" placeholder="Rua, número, bairro, cidade" />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: '#8B0000',
                      color: '#FFF',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      padding: '10px 30px',
                      transition: '0.3s'
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#A30000')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#8B0000')}
                  >
                    Salvar Usuário
                  </button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center mt-4" style={{ color: '#3A3A3A' }}>
            TotalHealth &copy; 2025 - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
