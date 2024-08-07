import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
    FormBuilder,
    FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
    MatDialog, MatDialogModule
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/services/user.service";

import { CreateAccountDialogComponent } from "../../components/create-account-dialog.component";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    imports: [
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule
    ],
    standalone: true,
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    error: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: UserService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.error = null;

        const { email } = this.loginForm.value;

        this.authService.getUserByEmail(email).subscribe({
            next: (response) => {
                this.isLoading = false;

                if (response?.id && response?.email) {
                    localStorage.setItem("email", email);
                    this.router.navigate(["/main"]);
                }
            },
            error: (err) => {
                this.isLoading = false;
                if (err.status === 404) {
                    this.showCreateAccountDialog(email);
                } else {
                    this.error = err.error.message;
                }
            }
        });
    }

    showCreateAccountDialog(email: string): void {
        const dialogRef = this.dialog.open(CreateAccountDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log("result ->", result);
            if (result) {
                this.authService.createUser(email).subscribe({
                    next: (response) => {
                        console.log("response", response);
                        this.isLoading = false;
                        if (response?.id && response?.email) {
                            localStorage.setItem("email", email);
                            this.router.navigate(["/main"]);
                        }
                    }
                });
            } else {
                this.error = "Usuario no encontrado";
            }
        });
    }
}
