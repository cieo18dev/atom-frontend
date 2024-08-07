import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private apiUrl = "http://localhost:3000/api/users";

    constructor(private http: HttpClient) {}

    getUserByEmail(email: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?email=${email}`);
    }

    createUser(email: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}`, { email });
    }
}
