interface Task {
  id: number;
  title: string;
  about: string;
  isPinned: boolean;
}

class LocalTaskStorage {
  private storageKey: string;

  constructor() {
    this.storageKey = "tasks";
  }

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson
      ? JSON.parse(tasksJson).map((task: Task) => ({
          ...task,
          isPinned: task.isPinned ?? false,
        }))
      : [];
  }

  getTask(taskId: number): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find((task) => task.id === taskId);
  }

  addTask(task: Omit<Task, "id">): Task {
    const tasks = this.getTasks();
    const newTask: Task = { ...task, id: Date.now(), isPinned: false };
    tasks.push(newTask);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    return newTask;
  }

  deleteTask(taskId: number): number {
    const tasks = this.getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
    return taskId;
  }

  editTask(taskId: number, updatedTask: Omit<Task, "id">): Task | undefined {
    const tasks = this.getTasks();
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          ...updatedTask,
        };
      }
      return task;
    });
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
    return updatedTasks.find((task) => task.id === taskId);
  }
}

const storage = new LocalTaskStorage();
export { LocalTaskStorage, storage };
export default storage;
