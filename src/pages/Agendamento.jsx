import React from 'react';

const Agendamento = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      width: '300px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        fontSize: '20px', 
        fontWeight: 'bold',
        marginBottom: '15px',
        textAlign: 'left'
      }}>Novo Agendamento</h1>
      
      <h2 style={{ 
        fontSize: '18px', 
        fontWeight: 'bold',
        marginBottom: '15px',
        textAlign: 'left'
      }}>Agendamento</h2>
      
      {/* Consulta */}
      <div style={{ marginBottom: '12px', textAlign: 'left' }}>
        <div style={{ 
          fontSize: '14px',
          marginBottom: '4px'
        }}>Consulta</div>
        <input
          type="text"
          style={{ 
            padding: '6px',
            fontSize: '13px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      {/* Especialização */}
      <div style={{ marginBottom: '12px', textAlign: 'left' }}>
        <div style={{ 
          fontSize: '14px',
          marginBottom: '4px'
        }}>Especialização</div>
        <input
          type="text"
          style={{ 
            padding: '6px',
            fontSize: '13px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      {/* Status e Data */}
      <div style={{ 
        display: 'flex',
        gap: '10px',
        marginBottom: '12px'
      }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ 
            fontSize: '14px',
            marginBottom: '4px'
          }}>Status</div>
          <input
            type="text"
            style={{ 
              padding: '6px',
              fontSize: '13px',
              borderRadius: '3px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ 
            fontSize: '14px',
            marginBottom: '4px'
          }}>Data</div>
          <input
            type="date"
            style={{ 
              padding: '6px',
              fontSize: '13px',
              borderRadius: '3px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
      
      {/* Médico */}
      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <div style={{ 
          fontSize: '14px',
          marginBottom: '4px'
        }}>Médico</div>
        <input
          type="text"
          style={{ 
            padding: '6px',
            fontSize: '13px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      {/* Botão Criar */}
      <button
        type="submit"
        style={{
          padding: '6px 12px',
          fontSize: '13px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          marginTop: '5px'
        }}
      >
        Criar
      </button>
    </div>
  );
};

export default Agendamento;