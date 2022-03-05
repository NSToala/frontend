import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { UserResponse } from '../models/userResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL_API = 'http://localhost:3000/api'
  user: User
  autocomplete: string = ''
  Users: UserResponse[]
  admin: boolean = false
  
  constructor( private http: HttpClient ) {
    this.user = {email: '', password: '', roles: 'usuario'}
    this.Users = []
  }

  signin(user: User) {
    return this.http.post(`${this.URL_API}/auth/signin`, user)
  }  

  signup(user: User) {
    return this.http.post(`${this.URL_API}/auth/signup`, user)
  }  

  getUsers(token: string) {
    const headers = { 'x-access-token': token}
    return this.http.get(`${this.URL_API}/users`, { 'headers': headers })
  }

  filter(token: string) {
    const headers = { 'x-access-token': token}
    return this.http.get(`${this.URL_API}/users/autocomplete/${this.autocomplete}`, { 'headers': headers })
  }
}