import { Component } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailTreatmentI, SummaryTreatmentI } from 'src/app/therapist/interfaces/patients.interface';
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
  treatmentSummary: SummaryTreatmentI = {
    id: -1,
    title: '--',
    completedTasks: -1,
    numberTasks: -1,
    overdueTasks: -1,
    pendingTasks: -1,
  };

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
    this.getTreatmentSummary();
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
    const treatmentId = ViewDetailTreatmentComponent.treatmentId;
    this.patientService.getSummaryTreatment(this.headers.getHeaders(), treatmentId)
      .subscribe({
        next: (response) => {
          this.treatmentSummary = response.data;
        },
        error: (_) => {
          this.showToastError("No se pudo obtener el resumen del tratamiento", 'Error');
        }
      });
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
