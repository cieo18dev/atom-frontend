import { Component, EventEmitter, Output } from "@angular/core";
import {
    FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Task } from "src/app/models/task.model";

@Component({
    selector: "app-task-form",
    templateUrl: "./task-form.component.html",
    styleUrls: ["./task-form.component.scss"],
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class TaskFormComponent {
    @Output() taskCreated = new EventEmitter<Partial<Task>>();
    taskForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.taskForm = this.fb.group({
            title: ["", Validators.required],
            description: ["", Validators.required]
        });
    }

    onSubmit() {
        if (this.taskForm.valid) {
            this.taskCreated.emit(this.taskForm.value);
            this.taskForm.reset();
        }
    }
}
