import { Component, OnInit } from '@angular/core';
import { MedicalFileService } from 'src/app/common/services/medical-file.service';
import { PatientService } from 'src/app/common/services/patient.service';
import { MedicalFile } from '../../../common/interfaces/medical-file';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/common/interfaces/patient';
import { Router } from '@angular/router';

@Component({
    selector: 'app-medical-file-add',
    templateUrl: './medical-file-add.component.html',
    styleUrls: ['./medical-file-add.component.scss'],
    providers: [MedicalFileService]
})
export class MedicalFileAddComponent implements OnInit {

    medicalForm: FormGroup;
    visitsArr = FormArray;

    data: Observable<any>;

    medicalFile: MedicalFile;

    constructor(
        private formBuilder: FormBuilder,
        private medicalFileService: MedicalFileService,
        private patientService: PatientService,
        private router: Router
    ) {
    }
    ngOnInit(
    ) {
        this.medicalForm = this.formBuilder.group({
            patientId: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            birthDate: ['', Validators.required],
            age: ['', Validators.required],
            gender: ['', Validators.required],
            visits: this.formBuilder.array([
                this.formBuilder.group({
                    visitDate: ['', Validators.required],
                    practitioner: ['', Validators.required],
                    notes: ['', Validators.required]
                })
            ])
        });

        this.patientService.show(PatientService.currentPatientId).subscribe(
            (res: Patient) => {
                console.log(res);
                this.loadData(res);
                this.medicalFile = {
                    patientId: null,
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    age: 0,
                    gender: '',
                    visits: []
                }
            });

    }
    loadData(data: Patient): void {
        console.log('LOAD DATA');
        this.medicalForm.patchValue({
            patientId: data.patientId,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            age: data.age,
            gender: data.gender,
        });
        this.medicalForm.setControl('visits', new FormArray([]));

        console.log(this.medicalForm.value.patientId);
    }

    onSubmit(): void {
        console.log('onSubmit');
        console.log(this.medicalFile);
        this.mapFormValuesToMedicalFileModel();
        this.medicalFileService.saveMedicalFile(this.medicalFile).subscribe(
            (res: MedicalFile) => {
                console.log(res);
                this.router.navigate(['patients']);
            });
    }

    mapFormValuesToMedicalFileModel() {
        console.log('mapFormValuesToMedicalFileModel');
        console.log(this.medicalFile);
        this.medicalFile.patientId = this.medicalForm.value.patientId;
        this.medicalFile.firstName = this.medicalForm.value.firstName;
        this.medicalFile.lastName = this.medicalForm.value.lastName;
        this.medicalFile.birthDate = this.medicalForm.value.birthDate;
        this.medicalFile.age = this.medicalForm.value.age;
        this.medicalFile.gender = this.medicalForm.value.gender;
        this.medicalFile.visits = this.medicalForm.value.visits;
        console.log(this.medicalFile);
    }

}
