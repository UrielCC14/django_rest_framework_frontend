import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Bibliteca para tener multiples rutas.
import { TasksPages } from "./pages/TasksPages";
import { TaskFormPages } from "./pages/TaskFormPages";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast"; // ontifications

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TasksPages />} />
          {/*mostrar una pagina*/}
          cuando se visite una ruta.
          <Route path="/tasks-create" element={<TaskFormPages />} />
          <Route path="/tasks/:id" element={<TaskFormPages />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
