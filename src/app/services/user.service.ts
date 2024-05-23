import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient) {}

  signup(userObj: any,img:File) {
    let fData= new FormData();
    fData.append("firstName",userObj.firstName)
    fData.append("lasteName",userObj.lastName)
    fData.append("email",userObj.email)
    fData.append("pwd",userObj.pwd)
    fData.append("tel",userObj.tel)
    fData.append("role",userObj.role)
    fData.append("img",img)
    return this.http.post<{ msg: string }>(this.userUrl + '/signup', fData);
  }

  login(userObj: any) {
    return this.http.post<{ msg: string, user: any }>(
      this.userUrl + '/login',
      userObj
    );
  }
}
