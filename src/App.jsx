import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import Layout from "./layout/Layout";
import NuevoCliente from "./paginas/NuevoCliente";
import EditarCliente from "./paginas/EditarCliente";
import VerClientes from "./paginas/VerClientes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerClientes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
