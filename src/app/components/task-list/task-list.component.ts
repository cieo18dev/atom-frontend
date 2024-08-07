import {
    Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

import { Task } from "../../models/task.model";
import { EditTaskDialogComponent } from "../edit-task-dialog.component";


@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.scss"],
    standalone: true,
    imports: [
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule
    ]
})
export class TaskListComponent implements OnChanges {
    @Input() tasks: Task[] = [];
    @Output() taskToggled = new EventEmitter<Task>();
    @Output() taskEdited = new EventEmitter<Task>();
    @Output() taskDeleted = new EventEmitter<number>();

    displayedColumns: string[] = ["title", "description", "createdAt", "completed", "actions"];
    dataSource = new MatTableDataSource<Task>([]);

    @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

    constructor(private dialog: MatDialog) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes["tasks"]) {
            this.dataSource.data = this.tasks.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
            this.dataSource.sort = this.sort;
        }
    }

    onToggleTaskCompletion(task: Task, completed: boolean) {
        task.completed = completed;
        this.taskToggled.emit(task);
    }

    onEditTask(task: Task) {
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            width: "300px",
            data: { ...task }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.taskEdited.emit(result);
            }
        });
    }

    onDeleteTask(taskId: number) {
        this.taskDeleted.emit(taskId);
    }
}
