import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODO } from "../constant";
import todoService, { Todo } from "../services/todoService";

interface AddTodoContext {
  previousData: Todo[];
}

const useAddTodos = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.postData,

    onMutate: (newTodo) => {
      const previousData =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODO) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, (todos = []) => [
        newTodo,
        ...todos,
      ]);
      // 等价
      //   queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, (todos) => [
      //     newTodo,
      //     ...(todos || []),
      //   ]);
      onAdd();

      return { previousData };
    },
    // savedTodo: server return to us
    // newTodo: we sent to the server
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
      // Approach 1: Invalidating the cache
      //   queryClient.invalidateQueries({
      //     queryKey: CACHE_KEY_TODO,
      //   });
      // Approach 2: Updating the data in the cache directly
      //   queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODO, (todos) => [
      //     newTodo,
      //     ...(todos || []),
      //   ]);
      //   if (ref.current) ref.current.value = "";
    },
    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODO, context.previousData);
    },
  });
};

export default useAddTodos;
