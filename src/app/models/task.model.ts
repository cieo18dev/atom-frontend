export interface Task {
    id?: number; // Optional for new tasks, required for existing ones
    title: string;
    description: string;
    createdAt?: Date; // Optional if it will be set automatically by the backend
    completed: boolean;
    userId: number; // ID of the user to whom the task belongs
}
