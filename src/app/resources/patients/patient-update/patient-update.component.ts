import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/common/services/patient.service';
import { Patient } from '../../../common/interfaces/patient';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.scss'],
  providers: [PatientService]
})

export class PatientUpdateComponent implements OnInit {

  patient: Patient;

  constructor(
      private patientService: PatientService,
      private activatedRoute: ActivatedRoute
      ) { }


  ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams.patientId;
    console.log(id);
    this.patientService.update(id).subscribe((res: Patient) => {
        this.patient = res;
    });
  }

  updatePatient(form: NgForm) {
    console.log(form.value);
    this.patientService.modify(form.value);
  }
}
