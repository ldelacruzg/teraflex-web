import { Component } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  ngOnInit(): void {
    this.showHideChildsOption();
    this.showHideMenuProfile();
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
    const imgProfile = profile?.querySelector<HTMLImageElement>('img');
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

  /*Íconos*/
  iconBars = iconos.faBars
  iconArrowDown = iconos.faChevronDown;
  iconTasks = iconos.faListCheck;
  iconBell = iconos.faBell;
  iconMessage = iconos.faMessage;

  iconSearch = iconos.faSearch;
  iconProfile = iconos.faUserCircle;
  iconSettings = iconos.faGear;
  iconLogOut = iconos.faArrowRightFromBracket;
}
