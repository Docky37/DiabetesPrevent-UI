import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/common/services/patient.service';
import { Patient } from '../../../common/interfaces/patient';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  providers: [PatientService]
})

export class PatientAddComponent implements OnInit {

  patient: Patient;

  constructor(
    private patientService: PatientService,
    ) { }

  ngOnInit() {
    this.patientService.add().subscribe((res: Patient) => {
        this.patient = res;
    });
  }

  addPatient(form: NgForm) {
    console.log(form.value);
    this.patientService.save(form.value);
    form.reset();
  }
}
