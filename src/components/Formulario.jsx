import React from "react";
import { Formik, Form, Field } from "formik";
import Alerta from "./Alerta";
import Sppiner from "./Sppiner";
import { useNavigate } from "react-router-dom";
import * as Yup from "Yup";

function Formulario({ cliente, cargando }) {
  const navigate = useNavigate();

  const nuevoClienteShema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El Nombre es muy Corto")
      .max(20, "El Nombre es muy Largo")
      .required("El Nombre del Cliente es Obligarorio"),
    empresa: Yup.string().required("El Nombre de la Empresa Es Obligatorio"),
    email: Yup.string()
      .email("Email no Válido")
      .required("El email es Obligatorio"),
    telefono: Yup.number()
      .integer("Número no es Válido")
      .positive("Número no es Válido")
      .typeError("El Número no es Válido"),
  });

  const HandleSubmit = async (valores) => {
    try {
      let respuesta
      if (cliente.id) {
        //Editar registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;
         respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Nuevo Registro//
        const url = "http://localhost:4000/clientes";
         respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });

        
      }
       await respuesta.json();
        navigate("/clientes");

    } catch (error) {
      console.log("error");
    }
  };

  return cargando ? (
    <Sppiner />
  ) : (
    <div className="bg-black mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          HandleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteShema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10 ">
              <div className="mb-4 ">
                <label className="text-gray-800 " htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />

                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className="mb-4 ">
                <label className="text-gray-800 " htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className="mb-4 ">
                <label className="text-gray-800 " htmlFor="email">
                  E-mail:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className="mb-4 ">
                <label className="text-gray-800 " htmlFor="telefono">
                  Teléfono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Teléfono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className="mb-4 ">
                <label className="text-gray-800 " htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
