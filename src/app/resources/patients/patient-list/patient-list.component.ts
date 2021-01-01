import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/common/services/patient.service';
import { Patient } from '../../../common/interfaces/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  providers: [PatientService]
})
export class PatientListComponent implements OnInit {

  patients: Patient[];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.list().subscribe((res: Patient[]) => {
      this.patients = res;
    });
  }
}
