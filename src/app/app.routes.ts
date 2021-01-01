import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PatientListComponent } from './resources/patients/patient-list/patient-list.component';
import { PatientComponent } from './resources/patients/patient/patient.component';
import { PatientUpdateComponent } from './resources/patients/patient-update/patient-update.component';
import { PatientAddComponent } from './resources/patients/patient-add/patient-add.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'patients',
    component: PatientListComponent
  },
  {
    path: 'patients/:idPatient',
    component: PatientComponent
  },
  {
    path: 'patients-update/:idPatient',
    component: PatientUpdateComponent
  },
  {
    path: 'patients-add',
    component: PatientAddComponent
  }
];
