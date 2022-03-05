import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.verifyPermission()
  }
  
  verifyPermission() {
    this.authService.getUsers(localStorage.getItem('token')!).subscribe(
      (res: any) => {
        this.authService.Users = res
        //this.router.navigate(['/users'])
      },
      (err:any) => {
        alert(err.error.message)
        localStorage.clear();
        this.router.navigate(['/'])
      }
    )
  }
}
