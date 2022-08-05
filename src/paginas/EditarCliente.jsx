import React from 'react'
import Formulario from '../components/Formulario'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function EditarCliente() { 

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();
   
  useEffect(() => { 
    const obtenerClienteAPI = async () => {
      try {
        setCargando(true)
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log("error");
      }
      setTimeout(() => {
        setCargando(!cargando);
      }, 300);
      
    };

    obtenerClienteAPI();
  }, []);

  return (
    <>
    <h1 className="font-black text-4xl text-blue-900 ">Editar Cliente </h1>
    <p className="mt-3">
      Edita los datos del Cliente
    </p>

    {cliente?.nombre ? (
       <Formulario
     cliente={cliente}
     cargando={cargando}
     /> 
    ): <p>Cliente ID no Válido</p> }
   
  </>
  )
}

export default EditarCliente