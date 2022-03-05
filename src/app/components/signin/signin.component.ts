import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import {Router} from "@angular/router"
// import { User } from 'src/app/models/user'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.verifySession()
  }

  verifySession() {
    let token = localStorage.getItem('token')

    if(token) {
      this.router.navigate(['/users'])
    }
  }

  signin(form: NgForm) {
    const {email, password} = form.value
    const emailRegex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email !== "" && password !== "" ) {
      if (emailRegex.test(email)) {
        this.authService.signin(form.value).subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.user))
            form.reset()
            this.router.navigate(['/users'])
          },
          (err:any) => {
            form.reset()
            alert(err.error?.message)
          }
        )
      } else {
        alert("Correo electrónico no válido!")
      }
    }else {
      alert("(*) Todos los campos son obligatorios!")
    }
  }
}
