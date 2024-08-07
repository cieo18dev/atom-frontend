import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "src/app/models/task.model";

@Injectable({
    providedIn: "root"
})
export class TaskService {
    private apiUrl = "http://localhost:3000/api/tasks";

    constructor(private http: HttpClient) {}

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}`);
    }

    addTask(task: Partial<Task>): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}`, { ...task, email: localStorage.getItem("email") });
    }

    updateTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
    }

    deleteTask(taskId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
    }
}
