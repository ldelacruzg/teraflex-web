import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-list-videos-help',
  templateUrl: './list-videos-help.component.html',
  styleUrls: ['./list-videos-help.component.css']
})
export class ListVideosHelpComponent {
  @Output() title1: string = "Videos de ayuda para módulo de tareas"
  @Output() title2: string = "Videos de ayuda para módulo de recursos"
  @Output() title3: string = "Videos de ayuda para módulo de pacientes"

  @Output() carouselExample1: string = "carouselExample1";
  @Output() carouselExample2: string = "carouselExample2";
  @Output() carouselExample3: string = "carouselExample3";

  /*Títulos y videos para módulo de tareas*/
  @Output() arrayVideosDetail1: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693681477/TeraFlex%20-%20Vinculaci%C3%B3n/Proyecto_nuevo_uvifha.png",
      title: "Buscar y ver listado de tareas",
      url: "https://www.youtube.com/embed/64p2-m98qdU?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:08 minutos",
      descripcion: "Este es un video explicativo en donde se muestran los pasos para poder buscar y ver el listado de tareas privadas y públicas. Adicional, se pueden visualizar las tareas públicas de los otros terapeutas."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693682122/TeraFlex%20-%20Vinculaci%C3%B3n/Crear_tarea_xdzdbg.png",
      title: "Pasos para crear una tarea",
      url: "https://www.youtube.com/embed/fS8dwEfavM0?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "2:32 minutos",
      descripcion: "Este es un video explicativo en donde se muestran los pasos necesarios para poder crear una tarea con todo lo necesario para los pacientes. Recuerde que antes de crear su tarea, debe surbir recursos, ya sean de videos locales o enlaces de YouTube."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693682358/TeraFlex%20-%20Vinculaci%C3%B3n/Editar_tarea_dxx1nt.png",
      title: "Editar tarea paso a paso",
      url: "https://www.youtube.com/embed/iP932UYabIU?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:19 minutos",
      descripcion: "En este video explicativo se muestra paso a paso el proceso de cómo se edita la información de una tarea que se ha creado previamente. Las tareas pueden ser editadas en cualquier momento e incluso cambiar la visibilidad de las mismas."
    },
  ];
  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693684393/TeraFlex%20-%20Vinculaci%C3%B3n/Emitir_reportes_tareas_uk1hs4.png",
      title: "Emitir reportes de tareas",
      url: "https://www.youtube.com/embed/y-5dHc-oJG4?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:50 minutos",
      descripcion: "En este video explicativo se muestra el proceso para poder emitir reportes en archivos de tipo PDF y Excel. Los reportes se emiten de acuerdo a la información que se presenta en la tabla de listado de tareas."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693684705/TeraFlex%20-%20Vinculaci%C3%B3n/Eliminar_tarea_vzxyde.png",
      title: "Eliminar una tarea de mi listado",
      url: "https://www.youtube.com/embed/fiTPm4clZMY?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:01 minutos",
      descripcion: "En este video explicativo se muestra el proceso que el terapeuta debe seguir, para poder eliminar una tarea de su listado de tareas. Recuerde que al eliminar las tareas, estas ya no estarán disponibles para sus pacientes."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693684883/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_asignar_tareas_s7mwnq.png",
      title: "Pasos para asignar tareas",
      url: "https://www.youtube.com/embed/WeuLafCH2VE?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "3:18 minutos",
      descripcion: "En este video explicativo se muestra el proceso paso a paso de cómo asignar una o más tareas a un paciente. Se deben completar 2 pasos para poder asignar las tareas. Recuerde que antes de asignar debe tener creada al menos una tarea."
    },
  ];

  /*Títulos y videos para módulo de recursos*/
  @Output() arrayVideosDetail3: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685434/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_subir_video_local_pz06eo.png",
      title: "Pasos para subir videos",
      url: "https://www.youtube.com/embed/PSS2UPrIwIY?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:57 minutos",
      descripcion: "En este video explicativo se muestra paso a paso como subir videos de manera local, es decir, desde su computadora o teléfono. Recuerde que previamente debe tener grabado un video que no exceda los 20mb de almacenamiento."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685725/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_subir_enlaces_YouTube_skymcm.png",
      title: "Pasos para subir enlaces",
      url: "https://www.youtube.com/embed/mdAcynTdtKg",
      time: "1:54 minutos",
      descripcion: "En este video explicativo se muestra paso a paso el proceso para poder subir videos de YouTube, es decir, copiando el enlace y registrándolo en la aplicación, con toda la información correspondiente."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685877/TeraFlex%20-%20Vinculaci%C3%B3n/Editar_recursos_bn9uza.png",
      title: "Editar tipos de recurso",
      url: "https://www.youtube.com/embed/AeNNoNRe6x8?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "0:57 segundos",
      descripcion: "En este video explicativo se muestra el proceso para poder editar un recurso, ya sea un video local o un enlace de YouTube. En el video se muestra la información que puede ser editada para registrar la información actualizada."
    },
  ];
  @Output() arrayVideosDetail4: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693686308/TeraFlex%20-%20Vinculaci%C3%B3n/Reporte_de_Recursos_lvj55f.png",
      title: "Emitir reporte de recursos",
      url: "https://www.youtube.com/embed/OSR2TfweWzU?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:47 minutos",
      descripcion: "En este video explicativo se muestra el proceso que se debe realizar para poder emitir reportes en archivos de tipo PDF o Excel. El reporte se genera según el listado de registros que existen."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693686797/TeraFlex%20-%20Vinculaci%C3%B3n/Activar_desactivar_recursos_m31v0u.png",
      title: "Activar o desactivar recursos",
      url: "https://www.youtube.com/embed/MB2Vc4HZbgA?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:27 minutos",
      descripcion: "En este video explicativo se muestra el proceso para poder activar o desactivar recursos (videos), recuerde que si desactiva un recurso, este ya no estará disponible en las tareas que haya creado con dicho recurso."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693686963/TeraFlex%20-%20Vinculaci%C3%B3n/Ver_Detalles_Recursos_cmdujc.png",
      title: "Ver detalle de recursos",
      url: "https://www.youtube.com/embed/8EKPWyu28AI?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "0:51 segundos",
      descripcion: "En este video explicativo se muestra paso a paso como ver información más detalla de un recurso que se ha creado previamente, además se puede ver la fecha en la que se creó dicho recurso."
    },
  ];

  /*Títulos y videos para módulo de pacientes*/
  @Output() arrayVideosDetail5: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687287/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_crear_pacientes_wamgf2.png",
      title: "Pasos parar crear pacientes",
      url: "https://www.youtube.com/embed/l9tNdeObdDU?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:24 minutos",
      descripcion: "En este video explicativo se muestra el proceso que debe seguir el terapeuta para crear un nuevo paciente registrando toda la información necesaria. Recuerde que los pacientes que crea, estarán bajo su área y solo usted podrá visualizar la información de sus pacientes."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687431/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_vincular_pacientes_snqzyb.png",
      title: "Pasos para vincular pacientes",
      url: "https://www.youtube.com/embed/XZhq4uFMCz8?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:11 minutos",
      descripcion: "En este video explicativo se muestra paso a paso el proceso para poder vincular un paciente a su área, es decir, usted podrá agregar a su listado de pacientes, los pacientes que sean de otras áreas o que estén bajo la supervisión de otros terapeutas."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687578/TeraFlex%20-%20Vinculaci%C3%B3n/Editar_Info_pacientes_pz4vl4.png",
      title: "Editar información de pacientes",
      url: "https://www.youtube.com/embed/H97z_oFAvOA?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:02 minutos",
      descripcion: "En este video explicativo se muestra el proceso necesario para poder editar la información de un paciente. En el video se mencionan los campos que pueden ser editados y cómo se puede cambiar dicha información."
    },
  ];
  @Output() arrayVideosDetail6: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687771/TeraFlex%20-%20Vinculaci%C3%B3n/Eliminar_desvincular_pacientes_ttxubd.png",
      title: "Eliminar o desvincular pacientes",
      url: "https://www.youtube.com/embed/oVN1RmH2Cc8",
      time: "1:19 minutos",
      descripcion: "En este video explicativo se muestra el proceso necesario para poder eliminar o dejar inactivo un paciente. Recuerde que si el paciente se encuentra inactivo, ya no podrá acceder al sistema y no podrá visualizar las tareas."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687924/TeraFlex%20-%20Vinculaci%C3%B3n/Reportes_de_pacientes_pjn5dt.png",
      title: "Emitir reporte de pacientes",
      url: "https://www.youtube.com/embed/s_hjXw4kzDQ?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:54 minutos",
      descripcion: "En este video explicativo se muestra el proceso para poder emitir reportes de pacientes en formato PDF o Excel. Estos reportes se generan de acuerdo a los registros que se muestran en el listado de pacientes."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693688035/TeraFlex%20-%20Vinculaci%C3%B3n/Ver_detalles_pacientes_ifo5fa.png",
      title: "Ver detalle de pacientes",
      url: "https://www.youtube.com/embed/UpaWGsSie2c?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "0:56 segundos",
      descripcion: "En este video explicativo se muestra el proceso para poder ver información más detallada de los pacientes, como por ejemplo la fecha de creación."
    },
  ];
}
