import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: "app-create-account-dialog",
    template: `
        <h2 mat-dialog-title>Hi</h2>
        <mat-dialog-content>
            <p>¿Desea crear el usuario?</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="onNoClick()">No gracias</button>
            <button mat-button (click)="onYesClick()">Sí</button>
        </mat-dialog-actions>`,
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
    ],
})
export class CreateAccountDialogComponent {
    constructor(public dialogRef: MatDialogRef<CreateAccountDialogComponent>) {}

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
