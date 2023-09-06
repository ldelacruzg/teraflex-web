import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-list-videos-help',
  templateUrl: './list-videos-help.component.html',
  styleUrls: ['./list-videos-help.component.css']
})
export class ListVideosHelpComponent {
  @Output() title1: string = "Videos de ayuda para módulo de terapeutas"
  @Output() title2: string = "Videos de ayuda para módulo de categorías y pacientes"
  @Output() carouselExample1: string ="carouselExample1";
  @Output() carouselExample2: string ="carouselExample2";

  @Output() arrayVideosDetail1: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693718643/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Ver_Detalle_Terapeutas.png",
      title: "Ver información de terapeutas",
      url: "https://www.youtube.com/embed/FdcecHjlQVI?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:02 minutos",
      descripcion: "En este video explicativa se muestran los pasos de cómo poder visualizar información detallada de los terapeutas que se encuentran registrados en el sistema."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693718738/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Registrar_Nuevo_Terapeuta.png",
      title: "Registrar nuevo terapeuta",
      url: "https://www.youtube.com/embed/yswNF-QlyWs?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:38 minutos",
      descripcion: "En este video explicativo se muestra el proceso paso a paso de cómo registrar un nuevo terapeuta y asignar el área o departamento encargado. Toda la información registrada es visible solo para el administrador y el propio terapeuta."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693718934/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Editar_Info_Terapeuta.png",
      title: "Editar información de terapeuta",
      url: "https://www.youtube.com/embed/6kXDo6bJzFk?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:39 minutos",
      descripcion: "En este video explicativo se muestra el proceso paso a paso de cómo poder editar la información de un terapeuta en caso de haber registrado información errónea o que el terapeuta cambie información que se ha registrado."
    },
  ];

  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693719111/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Activar_Desactivar_Terapeuta.png",
      title: "Desactivar o activar terapeuta",
      url: "https://www.youtube.com/embed/U1hEwe6oQQU?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:48 minutos",
      descripcion: "En este video explicativo se muestra el proceso paso a paso de cómo desactivar o activar un terapeuta el cual se encuentra en listado de los terapeutas."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693719289/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Reporte_de_Terapeutas.png",
      title: "Emitir reportes de terapeutas",
      url: "https://www.youtube.com/embed/_zLWdZ5FmKc?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:24 minutos",
      descripcion: "En este video explicativo se muestra el proceso paso a paso de cómo emitir reportes de tipo PDF o Excel, del listado de terapeutas existentes. Recuerde que este reporte se genera en base a todos los registros existentes."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693719403/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Filtros_para_Buscar_Terapeutas.png",
      title: "Filtros para buscar terapeutas",
      url: "https://www.youtube.com/embed/lILppGSy44A?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:01 minutos",
      descripcion: "En este video explicativo se muestra paso a paso cómo visualizar el listado de los terapeutas y cómo se puede buscar a los terapeutas en el listado, para poder encontrarlos de manera más fácil y rápida."
    },
  ];

  @Output() arrayVideosDetail3: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693719749/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Ver_Info_Categorias.png",
      title: "Ver informaición de categorías",
      url: "https://www.youtube.com/embed/9cKY9FzYEdk?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:11 minutos",
      descripcion: "En este video explicativo se muestra paso a paso cómo poder ver información más a detalle sobre las categorías que se presentan en el listado dentro del módulo de categorías. Se puede visualizar información como la fecha de creación y actualización."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693719931/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Editar_Info_Categorias.png",
      title: "Editar iformación de categorías",
      url: "https://www.youtube.com/embed/4XDtFUuHNrM?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:16 minutos",
      descripcion: "En este video explicativo se muestran los pasos necesarios para poder editar la información de una categoría."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693720148/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Reporte_Categorias.png",
      title: "Emitir reportes de categorías",
      url: "https://www.youtube.com/embed/JW0N3qbPxRY?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:22 minutos",
      descripcion: "En este video explicativo se muestra paso a paso cómo emitir reportes de tipo PDF y Excel. Los reportes son generados a partir del listado de categorías que se muestran en la tabla."
    },
  ];

  @Output() arrayVideosDetail4: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693688035/TeraFlex%20-%20Vinculaci%C3%B3n/Ver_detalles_pacientes_ifo5fa.png",
      title: "Ver detalles de pacientes",
      url: "https://www.youtube.com/embed/tSkrPeYQkKI?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:00 minutos",
      descripcion: "En este video explicativo se muestra paso a paso el proceso para poder ver la información detalla de los pacientes registrados en TeraFlex, además se puede visualizar los terapeutas que están bajo ese paciente."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687924/TeraFlex%20-%20Vinculaci%C3%B3n/Reportes_de_pacientes_pjn5dt.png",
      title: "Emitir reportes de pacientes",
      url: "https://www.youtube.com/embed/NJ56pS-w9Pg?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:00 minutos",
      descripcion: "En este video explicativo se muestra paso a paso el proceso para emitir reportes de tipo PDF y Excel de acuerdo con el listado de pacientes que se presenta en la tabla. Los reportes se generan según la cantidad de pacientes en la tabla."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693720629/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Generar_Nueva_Contrase%C3%B1a.png",
      title: "Generar nueva contraseña",
      url: "https://www.youtube.com/embed/tY-b3jCROvg?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:34 minutos",
      descripcion: "En este video explicativo se muestra paso a paso cómo generar una nueva contraseña temporal, para el terapeuta en caso de que la haya olvidado, dicha contraseña debe ser cambiada una vez que se le proporcione al terapeuta."
    },
  ];
}
