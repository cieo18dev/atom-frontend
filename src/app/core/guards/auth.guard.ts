import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const email = localStorage.getItem("email");
        if (email) {
            this.router.navigate(["/main"]); // Change to your second page route
            return false;
        }
        return true;
    }
}
