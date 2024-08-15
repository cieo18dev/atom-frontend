import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/enviroments/environment";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;
    constructor(private http: HttpClient) {}

    getUserByEmail(email: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?email=${email}`);
    }

    createUser(email: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}`, { email });
    }
}
