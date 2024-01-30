interface Task {
  id: number;
  title: string;
}

interface addTask {
  type: "ADD";
  task: Task;
}

interface deleteTask {
  type: "DELETE";
  taskId: number;
}

type TaskAction = addTask | deleteTask;

const taskReducer = (value: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD":
      return [action.task, ...value];
    case "DELETE":
      return value.filter((task) => task.id !== action.taskId);
  }
};

export default taskReducer;
