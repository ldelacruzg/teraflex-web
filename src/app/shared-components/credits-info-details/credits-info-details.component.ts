import { Component } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-credits-info-details',
  templateUrl: './credits-info-details.component.html',
  styleUrls: ['./credits-info-details.component.css', '../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class CreditsInfoDetailsComponent {
  /*Variables*/
  spinnerStatus: boolean = false;
  infoCredits: string = "Esta aplicación web ha sido desarrollada como parte del proyecto de vinculación “Tecnologías de la Información y Comunicación enfocadas a la discapacidad en la zona de influencia de la UTEQ” (F&C), de la Carrera de Ingeniería en Sistemas/Software, perteneciente a la Facultad de Ciencias de la Ingeniería, de la Universidad Técnica Estatal de Quevedo, en cooperación con la Dirección de Gestión de Desarrollo Social del GAD de Quevedo. Con este proyecto, se pretende mejorar la atención de terapias de los pacientes de la ciudad de Quevedo."
  arrayDevelopers: any[] = [
    {
      profile: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1691903628/TeraFlex%20-%20Vinculaci%C3%B3n/Profile-photo_dvkvlo.jpg",
      name: "Jordan Vera Coello",
      position: "Desarrollador web",
      mail: "mailto:jverac12@uteq.edu.ec",
      linkedin: "https://www.linkedin.com/in/jordanfvc26/"
    },
    {
      profile: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1691903729/TeraFlex%20-%20Vinculaci%C3%B3n/Ivan_Manzaba_Profile_rqwqsm.jpg",
      name: "Iván Manzaba Garcés",
      position: "Desarrollador backend",
      mail: "mailto:imanzabag@uteq.edu.ec",
      linkedin: "https://www.linkedin.com/in/iv%C3%A1n-manzaba-1ab312214/"
    },
    {
      profile: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1691905705/TeraFlex%20-%20Vinculaci%C3%B3n/Luis_Moreira_Profile_zxey6k.jpg",
      name: "Luis Moreira Torres",
      position: "Desarrollador móvil",
      mail: "mailto:lmoreirat@uteq.edu.ec",
      linkedin: "https://www.linkedin.com/in/luis-enrique-moreira-torres-317334252/"
    },
    {
      profile: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1691903729/TeraFlex%20-%20Vinculaci%C3%B3n/Luis_de_la_Cruz_Profile_cmw3au.jpg",
      name: "Luis De La Cruz",
      position: "Desarrollador fullstack",
      mail: "mailto:ldelacruzg@uteq.edu.ec",
      linkedin: "https://www.linkedin.com/in/luis-de-la-cruz-b07930298/"
    }
  ];
  arrayProfessors: any[] = [
    {
      profile: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1691905728/TeraFlex%20-%20Vinculaci%C3%B3n/user-profile_fbdmtf.png",
      name: "Orlando Erazo",
      position: "Director del proyecto de vinculación",
      mail: "mailto:oerazo@uteq.edu.ec",
      google: "https://sites.google.com/a/uteq.edu.ec/oerazo/"
    },
    {
      profile: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1691905728/TeraFlex%20-%20Vinculaci%C3%B3n/user-profile_fbdmtf.png",
      name: "Rafael Salinas",
      position: "Coordinador proyecto de vinculación",
      mail: "mailto:rsalinas@uteq.edu.ec",
      google: "https://sites.google.com/a/uteq.edu.ec/rsalinas/"
    },
  ];

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
  }

  /*Icons to use*/
  iconCredits = iconos.faInfoCircle;
  iconMail = iconos.faEnvelope;
}
