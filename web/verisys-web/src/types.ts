export type Status = "todo" | "doing" | "done";

export interface TaskItem {
  id: number;
  title: string;
  status: Status;
}
