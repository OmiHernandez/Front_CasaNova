import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SidebarControlsService } from 'src/app/services/sidebar-controls.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  isSidebarOpen = true;

  constructor(private router:Router, private sidebarControls: SidebarControlsService){
    this.sidebarControls.toggle$.subscribe(() => {
      this.isSidebarOpen = !this.isSidebarOpen;
    });
  }
  ngOnInit(): void {
    console.log(localStorage.getItem('accountId'));
    console.log(localStorage.getItem('username'));
    console.log(localStorage.getItem('usertype'))
    var tipo = localStorage.getItem('usertype')

    if (tipo == null){
      this.router.navigate(['/login']); 
    }
  }
}
