import { Component, OnInit } from '@angular/core';
import { MedicalFileService } from 'src/app/common/services/medical-file.service';
import { MedicalFile } from '../../../common/interfaces/medical-file';
import { Visit } from '../../../common/interfaces/visit';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DiabetesEvaluation } from 'src/app/common/interfaces/diabetes-evaluation';

@Component({
    selector: 'app-medical-file',
    templateUrl: './medical-file.component.html',
    styleUrls: ['./medical-file.component.scss'],
    providers: [MedicalFileService]
})
export class MedicalFileComponent implements OnInit {

    medicalForm: FormGroup;
    visitsArr = FormArray;
    diabetesEvalButton: string;
    color: string;
    bgcolor: string;

    data: Observable<any>;

    medicalFile: MedicalFile;

    constructor(
        private formBuilder: FormBuilder,
        private medicalFileService: MedicalFileService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(
    ) {
        this.medicalForm = this.formBuilder.group({
            patientId: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            age: ['', Validators.required],
            birthDate: ['', Validators.required],
            gender: ['', Validators.required],
            visits: this.formBuilder.array([
            ])
        });

        this.diabetesEvalButton = 'Click for diabetes evaluation';

        const id = this.activatedRoute.snapshot.queryParams.patientId;
        console.log(this.activatedRoute);
        this.medicalFileService.show(id).subscribe(
            (res: MedicalFile) => {
                console.log(res);
                this.loadData(res);
                this.medicalFile = res;
                console.log(this.medicalFile.patientId);
            });

    }

    onSubmit(): void {
        this.mapFormValuesToMedicalFileModel();
        console.log(this.medicalFile);
        const id = this.activatedRoute.snapshot.queryParams.patientId;
        this.medicalFileService.updateMedicalFile(this.medicalFile).subscribe(
            (res: MedicalFile) => {
                console.log(res);
                this.goBackList();
            });
    }

    diabetesEvalButtonClick(): void {
        if (this.medicalFile.visits.length > 0) {
            this.medicalFileService.diabetesEval(this.medicalFile).subscribe(
                (res: DiabetesEvaluation) => {
                    console.log(res);
                    this.diabetesEvalButton = res.evalResult + ' with ' + res.riskFactorsCount + ' risk factors.';
                    if (res.evalResult === 'Borderline') {
                        this.color = '#ffffff';
                        this.bgcolor = '#3ec46d';
                    } else if (res.evalResult === 'In Danger') {
                        this.color = '#333333';
                        this.bgcolor = '#ffff00';
                    } else if (res.evalResult === 'Early onset') {
                        this.color = '#ffffff';
                        this.bgcolor = '#ff0000';
                    } else {
                        this.color = '#ffffff';
                        this.bgcolor = '#99ccee';
                    }
                });
        } else {
            this.diabetesEvalButton = 'NONE with 0 risk factors.';
            this.color = '#ffffff';
            this.bgcolor = '#99ccee';
        }
    }

    displayDiabetesEvalReport(): void {

    }

    goBackList() {
        this.router.navigate(['patients']);
    }

    mapFormValuesToMedicalFileModel() {
        this.medicalFile.patientId = this.medicalForm.value.patientId;
        this.medicalFile.firstName = this.medicalForm.value.firstName;
        this.medicalFile.lastName = this.medicalForm.value.lastName;
        this.medicalFile.birthDate = this.medicalForm.value.birthDate;
        this.medicalFile.age = this.medicalForm.value.age;
        this.medicalFile.gender = this.medicalForm.value.gender;
        this.medicalFile.visits = this.medicalForm.value.visits;
    }


    loadData(data: MedicalFile): void {
        this.medicalForm.patchValue({
            patientId: data.patientId,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            age: data.age,
            gender: data.gender,
        });
        this.medicalForm.setControl('visits', this.setExistingVisits(data.visits));
    }

    setExistingVisits(visitSets: Visit[]): FormArray {
        const formArray = new FormArray([]);
        visitSets.forEach(v => {
            formArray.push(this.formBuilder.group({
                visitDate: v.visitDate,
                practitioner: v.practitioner,
                notes: v.notes
            }));
        });
        return formArray;
    }

    addVisitButtonClick(): void {
        (this.medicalForm.get('visits') as FormArray).insert(0, this.addVisitFormGroup());
    }

    removeVisit(i: number) {
        (this.medicalForm.get('visits') as FormArray).removeAt(i);
    }

    addVisitFormGroup(): FormGroup {
        return this.formBuilder.group({
            visitDate: ['', Validators.required],
            practitioner: ['', Validators.required],
            notes: ['', Validators.required]
        });
    }
}
