import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/common/services/patient.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  providers: [PatientService]
})

export class PatientAddComponent implements OnInit {

  model = {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: ''
  }

  constructor(
    private patientService: PatientService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  addPatient(form: NgForm) {
    console.log(form.value);
    this.patientService.save(form.value);
    this.router.navigate(['patients']);
  }
}
