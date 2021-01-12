import { Component, OnInit } from '@angular/core';
import { MedicalFileService } from 'src/app/common/services/medical-file.service';
import { MedicalFile } from '../../../common/interfaces/medical-file';
import { Visit } from '../../../common/interfaces/visit';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-medical-file',
    templateUrl: './medical-file.component.html',
    styleUrls: ['./medical-file.component.scss'],
    providers: [MedicalFileService]
})
export class MedicalFileComponent implements OnInit {

    medicalForm: FormGroup;
    visitsArr = FormArray;

    data: Observable<any>;

    medicalFile: MedicalFile;

    constructor(
        private formBuilder: FormBuilder,
        private medicalFileService: MedicalFileService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(
    ) {
        this.medicalForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            age: ['', Validators.required],
            visits: this.formBuilder.array([
                this.formBuilder.group({
                    visitDate: ['', Validators.required],
                    practitioner: ['', Validators.required],
                    notes: ['', Validators.required]
                })
            ])
        });
        const id = this.activatedRoute.snapshot.queryParams.patientId;
        console.log(this.activatedRoute);
        this.medicalFileService.show(id).subscribe(
            (res: MedicalFile) => {
                this.medicalFile = res;
                console.log(this.medicalFile);
                this.loadData(res);
            });

    }

    onSubmit(): void {
        console.log(this.medicalForm);
    }

    loadData(data: MedicalFile): void {
        this.medicalForm.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age
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
}
