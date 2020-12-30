import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(
        private http: HttpClient
    ) { }

    list(): Observable<Patient[]> {
        return this.http.get(environment.apiBaseUrl + 'patients').pipe(
            map((res: Patient[]) => {
                return res;
            })
        );
    }

    show(id: string): Observable<Patient> {
        return this.http.get(environment.apiBaseUrl + 'patients/id?patientId=' + id).pipe(
            map((res: Patient) => {
                return res;
            })
        );
    }

    update(id: string): Observable<Patient> {
        return this.http.get(environment.apiBaseUrl + 'patients/id?patientId=' + id).pipe(
            map((res: Patient) => {
                return res;
            })
        );
    }

    save(patient: Patient) {
        console.log(patient);
        this.http.post(environment.apiBaseUrl + 'patients', patient)
            .subscribe((result) => {
                console.log("result", result);
        });
        console.warn(patient);
    }

    modify(patient: Patient) {
        console.log(patient);
        this.http.put(environment.apiBaseUrl + 'patients/id?patientId=' + patient.patientId, patient)
            .subscribe((result) => {
                console.log("result", result);
        });
        console.warn(patient);
    }

}
