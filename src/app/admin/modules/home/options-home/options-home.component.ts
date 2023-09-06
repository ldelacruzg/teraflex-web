import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-options-home',
  templateUrl: './options-home.component.html',
  styleUrls: ['./options-home.component.css']
})
export class OptionsHomeComponent {
  /*Variables*/
  @Output() title1: string = "Algunos videos de ayuda";
  @Output() carouselExample1: string ="carouselExample1";
  @Output() arrayVideosDetail1: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693718738/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Registrar_Nuevo_Terapeuta.png",
      title: "Registrar nuevo terapeuta",
      url: "https://www.youtube.com/embed/yswNF-QlyWs?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:38 minutos",
      descripcion: "En este video explicativo se muestra el proceso paso a paso de cómo registrar un nuevo terapeuta y asignar el área o departamento encargado. Toda la información registrada es visible solo para el administrador y el propio terapeuta."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693719931/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Editar_Info_Categorias.png",
      title: "Editar iformación de categorías",
      url: "https://www.youtube.com/embed/4XDtFUuHNrM?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:16 minutos",
      descripcion: "En este video explicativo se muestran los pasos necesarios para poder editar la información de una categoría."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693720629/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Generar_Nueva_Contrase%C3%B1a.png",
      title: "Generar nueva contraseña",
      url: "https://www.youtube.com/embed/tY-b3jCROvg?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:34 minutos",
      descripcion: "En este video explicativo se muestra paso a paso cómo generar una nueva contraseña temporal, para el terapeuta en caso de que la haya olvidado, dicha contraseña debe ser cambiada una vez que se le proporcione al terapeuta."
    },
  ];
  
  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693688035/TeraFlex%20-%20Vinculaci%C3%B3n/Ver_detalles_pacientes_ifo5fa.png",
      title: "Ver detalles de pacientes",
      url: "https://www.youtube.com/embed/tSkrPeYQkKI?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:00 minutos",
      descripcion: "En este video explicativo se muestra paso a paso el proceso para poder ver la información detalla de los pacientes registrados en TeraFlex, además se puede visualizar los terapeutas que están bajo ese paciente."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693720148/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Reporte_Categorias.png",
      title: "Emitir reportes de categorías",
      url: "https://www.youtube.com/embed/JW0N3qbPxRY?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:22 minutos",
      descripcion: "En este video explicativo se muestra paso a paso cómo emitir reportes de tipo PDF y Excel. Los reportes son generados a partir del listado de categorías que se muestran en la tabla."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693719403/TeraFlex%20-%20Vinculaci%C3%B3n/Admin_Filtros_para_Buscar_Terapeutas.png",
      title: "Filtros para buscar terapeutas",
      url: "https://www.youtube.com/embed/lILppGSy44A?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:01 minutos",
      descripcion: "En este video explicativo se muestra paso a paso cómo visualizar el listado de los terapeutas y cómo se puede buscar a los terapeutas en el listado, para poder encontrarlos de manera más fácil y rápida."
    },
  ];
}
