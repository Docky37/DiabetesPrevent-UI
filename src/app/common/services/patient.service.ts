import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient';
import { PatientAddComponent } from '../../resources/patients/patient-add/patient-add.component';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    static currentPatientId: string;
    constructor(
        private http: HttpClient,
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

    save(patientAddComponent: PatientAddComponent, patient: Patient) {
        console.log(patient);
        this.http.post<Patient>(environment.apiBaseUrl + 'patients', patient)
            .subscribe((result) => {
                console.log('POST result: ', result);
                PatientService.currentPatientId = result.patientId;
                patientAddComponent.addMedicalFile();
        });
    }

    modify(patient: Patient) {
        console.log(patient);
        this.http.put(environment.apiBaseUrl + 'patients/id?patientId=' + patient.patientId, patient)
            .subscribe((result) => {
                console.log('PUT result: ', result);
        });
    }

}
