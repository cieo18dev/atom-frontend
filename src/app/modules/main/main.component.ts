import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TaskService } from "src/app/core/services/task.service";

import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { Task } from "../../models/task.model";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"],
    standalone: true,
    imports: [TaskListComponent, TaskFormComponent],
})
export class MainComponent implements OnInit {
    tasks: Task[] = [];
    newTask: Partial<Task> = {
        title: "",
        description: "",
        completed: false
    };

    constructor(private taskService: TaskService, private router: Router) {}

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        this.taskService.getTasks().subscribe((tasks) => {
            // Sort tasks by id
            const sortedTasks = tasks.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
            // Assign sorted tasks to the component's tasks property
            this.tasks = sortedTasks;
        });
    }

    addTask(newTask: Partial<Task>) {
        if (newTask.title && newTask.description) {
            this.taskService.addTask(newTask as Task).subscribe((task) => {
                this.tasks.push(task);
                this.tasks = [...this.tasks]; // trigger change detection
            });
        }
    }

    toggleTaskCompletion(task: Task) {
        this.taskService.updateTask(task).subscribe();
    }

    editTask(updatedTask: Partial<Task>) {
        if (updatedTask.id && updatedTask.title && updatedTask.description) {
            this.taskService.updateTask(updatedTask as Task).subscribe((task) => {
                const index = this.tasks.findIndex((t) => t.id === task.id);
                if (index !== -1) {
                    this.tasks[index] = task;
                    this.tasks = [...this.tasks]; // trigger change detection
                }
            });
        }
    }

    deleteTask(taskId: number) {
        this.taskService.deleteTask(taskId).subscribe(() => {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
        });
    }

    logout() {
        sessionStorage.removeItem("email");
        this.router.navigate(["/login"]);
    }
}
