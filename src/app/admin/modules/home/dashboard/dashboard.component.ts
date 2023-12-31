import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../../therapist/modules/home/dashboard/dashboard.component.css']
})
export class DashboardComponent {
  /*Variables*/
  spinnerStatus: boolean = false;

  /*Constructor*/
  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
  ){}

  /*ngOnInit()*/
  ngOnInit(){
    this.spinnerStatus = true;
    this.showHideChildsOption();
    this.showHideMenuProfile();
    this.showHideSidebar();
    this.detectedScreen();
    this.optionSelectedOnMenu();
    this.router.navigate(['options-home'], { relativeTo: this.routerActivated })
  }

  /*Método que obtiene los headers*/
  getHeaders(){
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("role", sessionStorage.getItem("role"));
    return headers;
  }

  /*Método que cierra la sesión del usuario*/
  signOut() {
    this.spinnerStatus = false;
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    setTimeout(() => {
      this.spinnerStatus = true;
      this.router.navigateByUrl('authentication/security/login');
    }, 2000);
  }

  /*Método que muestra y oculta los hijos de una opción del menú*/
  showHideChildsOption() {
    const allDropdown = document.querySelectorAll<HTMLDivElement>('#sidebar .side-dropdown');
    allDropdown.forEach((item: HTMLDivElement) => {
      const a = item.parentElement?.querySelector<HTMLAnchorElement>('a:first-child');
      a?.addEventListener('click', function (e: Event) {
        e.preventDefault();
        if (!item.classList.contains('active')) {
          allDropdown.forEach((i: HTMLDivElement) => {
            const aLink = i.parentElement?.querySelector<HTMLAnchorElement>('a:first-child');
            if (aLink)
              aLink.classList.remove('active');
            i.classList.remove('show');
          });
        }
        item.classList.toggle('active');
        item.classList.toggle('show');
      });
    });
  }

  /*Método que muestra y oculta el menú de la foto de perfil*/
  showHideMenuProfile() {
    const profile = document.querySelector<HTMLDivElement>('nav .profile');
    const imgProfile = profile?.querySelector<HTMLImageElement>('p');
    const dropdownProfile = profile?.querySelector<HTMLDivElement>('.profile-link');
    imgProfile?.addEventListener('click', function () {
      dropdownProfile?.classList.toggle('show');
    });
    window.addEventListener('click', function (e: MouseEvent) {
      if (e.target !== imgProfile) {
        if (e.target !== dropdownProfile) {
          if (dropdownProfile && dropdownProfile.classList.contains('show')) {
            dropdownProfile.classList.remove('show');
          }
        }
      }
    });
  }

  /*Método que muestra y oculta el manú lateral del dashboard*/
  showHideSidebar() {
    const toggleSidebar = document.querySelector('nav .toggle-sidebar') as HTMLElement;
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const allSidebar = document.querySelectorAll<HTMLDivElement>('#sidebar .divider');

    if (sidebar.classList.contains('hide')) {
      allSidebar.forEach((item: HTMLDivElement) => {
        item.textContent = '-';
      });
    }
    else {
      allSidebar.forEach((item: HTMLDivElement) => {
        item.textContent = '-';
      });
    }
    toggleSidebar.addEventListener('click', function () {
      sidebar.classList.toggle('hide');
    });
  }

  /*Método que detecta el tamaño de la pantalla, para ocultar automáticamente el menú lateral*/
  detectedScreen() {
    window.addEventListener('resize', function () {
      const sidebar = document.getElementById('sidebar') as HTMLElement;
      const isMobile = window.innerWidth <= 767;
      if (isMobile) {
        sidebar?.classList.add('hide');
      } else {
        sidebar?.classList.remove('hide');
      }
    });
  }

  /*Método que agrega o elimina la clase "active" de una opción del menú*/
  optionSelectedOnMenu() {
    const menuItems = document.querySelectorAll('.side-menu li');
    menuItems.forEach((menuItem) => {
      const link = menuItem.querySelector('a') as HTMLElement;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        menuItems.forEach((item) => {
          item.querySelector('a')?.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  }


  /*Icons to use*/
  iconBars = iconos.faBars;
  iconHome = iconos.faHome;

  iconAdministration = iconos.faGear;
  iconTerapists = iconos.faUserNurse;
  iconCategories = iconos.faFolderTree;
  iconPatients = iconos.faUsers;
  iconHelp = iconos.faQuestionCircle;
  iconInformation = iconos.faInfoCircle;
  iconArrowDown = iconos.faChevronDown;

  iconSearch = iconos.faSearch;
  iconBell = iconos.faBell;
  iconMessage = iconos.faMessage;

  iconProfile = iconos.faUserCircle;
  iconPassword = iconos.faLock;
  iconLogOut = iconos.faArrowRightFromBracket;
}
