import { useForm } from "react-hook-form";
// para validaciones mas complejas instalar las bibliotecas 'yup' y' zod' las cuales se unen a 'react-hook-form'.
import { useEffect } from "react";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPages() {
  // Cargar datos de la tarea.
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { tittle, description },
        } = await getTask(params.id);
        setValue("tittle", tittle);
        setValue("description", description);
      }
    }
    loadTask();
  }, []);

  // Importamos funcions de el useForm.
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate(); // Creamos el objeto navigate.
  const params = useParams(); //Verificar si existen parametros.

  //  Al enviar el formulario.
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      //Si recibe parametros (si se esta editando la tarea-)
      await updateTask(params.id, data);
      // CUztomizate Notifications.
      toast.success("Task Update", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      // CUztomizate Notifications.
      toast.success("Task Created", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks"); // REdireccionamos.
  });

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Tittle"
          {...register("tittle", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.tittle && <span>Tittle is required</span>}

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>Description is required</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const acepted = confirm("Are you sure");
              if (acepted) {
                await deleteTask(params.id);
                toast.success("Task Delete", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
