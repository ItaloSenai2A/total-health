import React from 'react';

const Agendamento = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <nav style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '1rem' }}>
        <ul>
          <li>Usuário</li>
          <li>Prescrições</li>
          <li>Pagamentos</li>
          <li>Médicos/Especialidades</li>
          <li>Exames</li>
          <li>Especialidades</li>
          <li>Contato</li>
          <li>Consultas</li>
          <li>Agendamentos</li>
        </ul>
        <div style={{ marginTop: '2rem' }}>
          <h4>Linha direta de emergência</h4>
          <p>(XX) XXXX-XXXX</p>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <h1>Nova Consulta</h1>
        <form>
          <div>
            <label>Paciente</label>
            <input type="text" placeholder="Nome do Paciente" />
          </div>
          <div>
            <label>Médico</label>
            <input type="text" placeholder="Nome do Médico" />
          </div>
          <div>
            <label>Valor</label>
            <input type="number" placeholder="Valor da Consulta" />
          </div>
          <div>
            <label>Status</label>
            <input type="text" placeholder="Status da Consulta" />
          </div>
          <div>
            <label>Data</label>
            <input type="date" />
          </div>
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
};

export default Agendamento;
