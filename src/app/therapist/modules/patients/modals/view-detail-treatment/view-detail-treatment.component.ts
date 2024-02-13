import { Component } from '@angular/core';
import { ListTreatmentI } from 'src/app/therapist/interfaces/assigments.interface';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailTreatmentI } from 'src/app/therapist/interfaces/patients.interface';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-detail-treatment',
  templateUrl: './view-detail-treatment.component.html',
  styleUrls: ['./view-detail-treatment.component.css']
})
export class ViewDetailTreatmentComponent {
  /*Variables*/
  static treatmentId: number;
  static treatmentSummary: ListTreatmentI;
  detailTreatment: DetailTreatmentI = {
    id: -1,
    title: '--',
    description: '--',
    isActive: false,
    startDate: '--',
    endDate: null,
    patientId: -1,
    therapistId: -1,
    updatedAt: '--',
    createdAt: '--'
  }

  constructor(
    public modal: NgbModal,
    private headers: DashboardComponent,
    private patientService: PatientsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getDetailTreatment();
  }

  getDetailTreatment() {
    const treatmentId = ViewDetailTreatmentComponent.treatmentId;
    this.patientService.getDetailTreatment(this.headers.getHeaders(), treatmentId)
      .subscribe({
        next: (response) => {
          this.detailTreatment = response.data;
        },
        error: (_) => {
          this.showToastError("No se pudo obtener el detalle del tratamiento", 'Error');
        }
      });
  }

  getTreatmentSummary() {
    return ViewDetailTreatmentComponent.treatmentSummary;
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons to use*/
  iconDetailProgress = iconos.faListUl;
  iconArrowRight = iconos.faCaretRight;
}
