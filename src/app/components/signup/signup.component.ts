import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  roles:string[]=["usuario", "administrador"];

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

  signup(form: NgForm) {
    const {email, password} = form.value
    const emailRegex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email !== "" && password !== "" ) {
      if (emailRegex.test(email)) {
        form.value.roles = [form.value.roles]
        this.authService.signup(form.value).subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.user))
            form.reset()
            this.router.navigate(['/users'])
          },
          (err:any) => alert(err.error.message)
        )
      } else {
        alert("Correo electrónico no válido!")
      }
      
    }else {
      alert("(*) Todos los campos son obligatorios!")
    }
  }
}
