import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MedicalFile } from '../interfaces/medical-file';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MedicalFileService {

    constructor(
        private http: HttpClient
    ) { }

    show(id: string): Observable<MedicalFile> {
        console.log('MedicalFileService - Show');
        return this.http.get<MedicalFile>(environment.apiBaseUrl2 + 'medicalFiles?patientId=' + id)
                .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error: ', errorResponse.error);
        } else {
            console.error('Server Side Error: ', errorResponse);
        }

        return throwError('There is a probleme with service.');
    }
}

