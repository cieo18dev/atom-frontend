import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { AuthenticatedGuard } from "./core/guards/authenticated.guard";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./modules/login/login.component").then(
            (m) => m.LoginComponent
        ),
        canActivate: [AuthGuard]
    },
    {
        path: "main",
        loadComponent: () => import("./modules/main/main.component").then(
            (m) => m.MainComponent
        ),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: "**",
        redirectTo: ""
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
