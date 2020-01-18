import {of as observableOf, Observable, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Contacts, RecentUsers, RegisterUserInfo, User, UserData} from '../data/users';
import {HttpClient} from '@angular/common/http';
import {BaseRequestBo} from '../data/bean/BaseRequestBo';
import {catchError, map} from 'rxjs/operators';
import {APP_TENANT_ID, APP_USER_ID, OAUTH_ACCESS_TOKEN, OAUTH_REFRSH_TOKEN} from '../data/common/constant.common';

@Injectable()
export class UserService extends UserData {

  public currentUser: Observable<any>;

  private currentUserSubject: BehaviorSubject<User>;

  constructor(private  http: HttpClient) {
    super();
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  isLogin(): Boolean {
    let isLogin = false;
    this.currentUser.subscribe(res => {
      if (res) {
        isLogin = res.code === 0;
      }
    });
    return isLogin;
  }

  registerByPassword(registerInfo: RegisterUserInfo): Observable<any> {
    const url = '/api/admin/user/account/add';
    return this.http.post<any>(url, registerInfo).pipe(
      catchError(super.handleError('loginByMobile', [])));
  }

  registerByPhone(registerInfo: RegisterUserInfo): Observable<any> {
    const url = '/api/admin/user/phone/add';
    return this.http.post<any>(url, registerInfo).pipe(
      catchError(super.handleError('loginByMobile', [])));
  }

  getContacts(): Observable<Contacts[]> {
    return undefined;
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return undefined;
  }

  getUsers(): Observable<BaseRequestBo<User>> {
    const url = '/api/admin/user/info';
    return this.http.get<any>(url).pipe(
      catchError(super.handleError('getUserInfo', [])));
  }

  logOut(): Observable<any> {
    const url = '/api/auth/token/logout';
    return this.http.delete<BaseRequestBo<any>>(url).pipe((map(res => {
        if (res.code === 0) {
          this.currentUserSubject.next(null);
          this.clearTokenToSession();
        }
      })),
      catchError(super.handleError('getUserInfo', [])));
  }

  /**
   * @des 移除登出后的所有session存储的用户相关信息
   * @author houshuai
   * @date 2019/5/29
   */
  protected clearTokenToSession() {
    sessionStorage.removeItem(OAUTH_ACCESS_TOKEN);
    sessionStorage.removeItem(OAUTH_REFRSH_TOKEN);
    sessionStorage.removeItem(APP_USER_ID);
    sessionStorage.removeItem(APP_TENANT_ID);
  }
}
