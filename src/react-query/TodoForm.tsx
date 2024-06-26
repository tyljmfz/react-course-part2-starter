import { useRef } from "react";
import useAddTodos from "./hooks/useAddNewTodo";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useAddTodos(() => {
    if (ref.current) ref.current.value = "";
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              userId: 1,
              title: ref.current.value,
              completed: false,
            });
          }
        }}
      >
        <div className="col">
          <input
            aria-label="add"
            ref={ref}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
