import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
        console.log(res)
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
