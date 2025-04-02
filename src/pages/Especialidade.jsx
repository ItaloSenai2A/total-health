import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";


const Especialidade = () => {
  const [formData, setFormData] = useState({
    consulta: "",
    status: "",
    data: "",
    especializacao: "",
    medico: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.consulta) newErrors.consulta = "Consulta é obrigatória.";
    if (!formData.status) newErrors.status = "Status é obrigatório.";
    if (!formData.data) newErrors.data = "Data é obrigatória.";
    if (!formData.especializacao) newErrors.especializacao = "Especialização é obrigatória.";
    if (!formData.medico) newErrors.medico = "Médico é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Dados enviados:", formData);
      // Limpar formulário após envio
      setFormData({
        consulta: "",
        status: "",
        data: "",
        especializacao: "",
        medico: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="consulta" className="block text-sm font-medium">
            Consulta
          </label>
          <Input
            id="consulta"
            name="consulta"
            value={formData.consulta}
            onChange={handleChange}
            placeholder="Consulta"
          />
          {errors.consulta && <p className="text-red-500 text-sm">{errors.consulta}</p>}
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <Input
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
          />
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
        </div>
        <div>
          <label htmlFor="data" className="block text-sm font-medium">
            Data
          </label>
          <Input
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            placeholder="Data"
          />
          {errors.data && <p className="text-red-500 text-sm">{errors.data}</p>}
        </div>
        <div>
          <label htmlFor="especializacao" className="block text-sm font-medium">
            Especialização
          </label>
          <Input
            id="especializacao"
            name="especializacao"
            value={formData.especializacao}
            onChange={handleChange}
            placeholder="Especialização"
          />
          {errors.especializacao && <p className="text-red-500 text-sm">{errors.especializacao}</p>}
        </div>
        <div>
          <label htmlFor="medico" className="block text-sm font-medium">
            Médico
          </label>
          <Input
            id="medico"
            name="medico"
            value={formData.medico}
            onChange={handleChange}
            placeholder="Médico"
          />
          {errors.medico && <p className="text-red-500 text-sm">{errors.medico}</p>}
        </div>
        <div className="col-span-2">
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Especialidade;