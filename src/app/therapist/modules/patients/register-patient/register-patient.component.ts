import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css', './../../videos/upload-video-form/upload-video-form.component.css']
})
export class RegisterPatientComponent {
  /*Variables*/
  patientForm!: FormGroup;
  spinnerStatus: boolean = false;

  /*constructor*/
  constructor(
    private formBuilder: FormBuilder
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createPatientForm();
  }

  /*Método que crea el formulario*/
  createPatientForm() {
    this.patientForm = this.formBuilder.group({
      lastName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      firstName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      docNumber: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ],
      birthDate: ['',
        [
          Validators.required,
        ]
      ],
      phone: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ],
      description: ['',
        [
          Validators.required,
        ]
      ],
    })
  }

  /*Método que manda a registrar los datos del paciente a la base de datos*/
  registerMyPatient(){
  }

  /*Icons to use*/
  iconAddPatient = iconos.faUserPlus;
}
