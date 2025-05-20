import React from 'react';

const Prescricao = () => {
  return (
    <div
      style={{
        padding: '20px',
        border: '2px solid #D4AF37', // borda dourada
        borderRadius: '10px',
        width: '500px',
        margin: 'auto',
        backgroundColor: '#FFFFFF' // fundo do card
      }}
    >
      <h2 style={{ color: '#1C1C1C' }}>Nova Prescrição</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: '#3A3A3A' }}>Consulta</label>
        <input
          type="text"
          placeholder="Consulta"
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #B0B0B0',
            backgroundColor: '#F9E6E6',
            color: '#1C1C1C'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: '#3A3A3A' }}>Valor</label>
        <input
          type="text"
          placeholder="Preço do Exame"
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #B0B0B0',
            backgroundColor: '#F9E6E6',
            color: '#1C1C1C'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: '#3A3A3A' }}>Descrição</label>
        <input
          type="text"
          placeholder="Descrição do Exame"
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #B0B0B0',
            backgroundColor: '#F9E6E6',
            color: '#1C1C1C'
          }}
        />
      </div>

      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#8B0000',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onMouseOver={e => (e.target.style.backgroundColor = '#A30000')}
        onMouseOut={e => (e.target.style.backgroundColor = '#8B0000')}
      >
        Criar
      </button>
    </div>
  );
};

export default Prescricao;
