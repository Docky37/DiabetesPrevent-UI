import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { PatientListComponent } from './resources/patients/patient-list/patient-list.component';
import { PatientComponent } from './resources/patients/patient/patient.component';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './partials/footer/footer.component';
import { PatientUpdateComponent } from './resources/patients/patient-update/patient-update.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientAddComponent } from './resources/patients/patient-add/patient-add.component';
import { MedicalFileComponent } from './resources/medical-files/medical-file/medical-file.component';
import { MedicalFileAddComponent } from './resources/medical-files/medical-file-add/medical-file-add.component';
import { SortByPipe } from './common/sort-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PatientListComponent,
    PatientComponent,
    FooterComponent,
    PatientUpdateComponent,
    PatientAddComponent,
    MedicalFileComponent,
    MedicalFileAddComponent,
    SortByPipe,
   ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
