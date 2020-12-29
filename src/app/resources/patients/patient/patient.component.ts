import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/common/services/patient.service';
import { Patient } from '../../../common/interfaces/patient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  providers: [PatientService]
})
export class PatientComponent implements OnInit {

  patient: Patient;

  constructor(
      private patientService: PatientService,
      private activatedRoute: ActivatedRoute
      ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams.patientId;
    console.log(this.activatedRoute);
    this.patientService.show(id).subscribe((res: Patient) => {
        this.patient = res;
    });
  }
}
