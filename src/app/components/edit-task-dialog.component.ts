import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
    FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { Task } from "../models/task.model";

@Component({
    selector: "app-edit-task-dialog",
    templateUrl: "./edit-task-dialog.component.html",
    styleUrls: ["./edit-task-dialog.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
    ],
})
export class EditTaskDialogComponent {
    editTaskForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditTaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Task
    ) {
        this.editTaskForm = this.fb.group({
            title: [data.title, [Validators.required]],
            description: [data.description, [Validators.required]],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.editTaskForm.valid) {
            this.dialogRef.close({ ...this.data, ...this.editTaskForm.value });
        }
    }
}
