import {Injectable} from '@angular/core';
import {Auth, Token} from '../data/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageService} from '../utils/storage.service';
import {EncrtyService} from '../utils/encrty.service';
import {
  APP_TENANT_ID,
  APP_USER_ID,
  AUTHORIZATION,
  OAUTH_ACCESS_TOKEN,
  OAUTH_REFRSH_TOKEN,
  scope,
} from '../data/common/constant.common';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AuthService extends Auth {

  private currentTokenSubject: BehaviorSubject<any>;

  public token: Observable<Token>;

  constructor(private  http: HttpClient,
              private stroage: StorageService,
              private  encrty: EncrtyService) {
    super();
    this.currentTokenSubject = new BehaviorSubject<any>(null);
    this.token = this.currentTokenSubject.asObservable();
  }


  getTokenByMobile(mobile: string, code: string): Observable<Token> {
    const url = '/api/auth/mobile/token/sms';
    const grant_type = 'mobile';
    const header = new HttpHeaders();
    header.set('isToken', 'false');
    header.set('TENANT_ID', '1');
    header.set('Authorization', AUTHORIZATION);
    return this.http.post<any>(url, {
      mobile: 'SMS@' + mobile,
      code: code,
      grant_type: grant_type,
      scope: scope,
    }, {
      headers: header,
    }).pipe(map(res => {
        sessionStorage.setItem(OAUTH_ACCESS_TOKEN, res.access_token);
        sessionStorage.setItem(OAUTH_REFRSH_TOKEN, res.access_token);
        sessionStorage.setItem(APP_USER_ID, String(res.user_id));
        sessionStorage.setItem(APP_TENANT_ID, String(res.tenant_id));
        this.currentTokenSubject.next(res);
        return res;
      }),
      catchError(super.handleError('loginByMobile', [])));
  }

  getTokenBySocial(state: string, code: string): Observable<Token> {
    const url = '/api/auth/mobile/token/social';
    const grant_type = 'mobile';
    const header = new HttpHeaders()
      .set('isToken', 'false')
      .set('Authorization', AUTHORIZATION)
      .set('TENANT_ID', '1');
    const formData = new FormData();
    formData.set('mobile', state + '@' + code);
    formData.set('grant_type', grant_type);
    formData.set('scope', scope);
    return this.http.post<any>(url, formData, {
      headers: header,
    }).pipe(map(res => {
        sessionStorage.setItem(OAUTH_ACCESS_TOKEN, res.access_token);
        sessionStorage.setItem(OAUTH_REFRSH_TOKEN, res.access_token);
        sessionStorage.setItem(APP_USER_ID, String(res.user_id));
        sessionStorage.setItem(APP_TENANT_ID, String(res.tenant_id));
        this.currentTokenSubject.next(res);
        return res;
      }),
      catchError(super.handleError('loginBySocial', [])));
  }

  getRefreshToken(refresh_token: string): Observable<Token> {
    return undefined;
  }

  getTokenByPassword(username: string, password: string, code: string): Observable<Token> {
    this.stroage.removeItemFromSessionStorage(OAUTH_ACCESS_TOKEN);
    const url = '/api/auth/oauth/token';
    const grant_type = 'password';
    const urlEncode = encodeURIComponent(this.encrty.encryptClick(password));
    const header = new HttpHeaders()
      .set('isToken', 'false')
      .set('Authorization', AUTHORIZATION)
      .set('TENANT_ID', '1');
    return this.http.get<any>(
      `${url}?username=${username}&password=${urlEncode}&code=${code}&grant_type=${grant_type}&scope=${scope}`, {
        headers: header,
      }).pipe(map(res => {
        this.SetTokenToSession(res);
        this.currentTokenSubject.next(res);
        return res;
      }),
      catchError(super.handleError('loginByPassword', [])));
  }

  SetTokenToSession(res) {
    sessionStorage.setItem(OAUTH_ACCESS_TOKEN, res.access_token);
    sessionStorage.setItem(OAUTH_REFRSH_TOKEN, res.refresh_token);
    sessionStorage.setItem(APP_USER_ID, String(res.user_id));
    sessionStorage.setItem(APP_TENANT_ID, String(res.tenant_id));
  }
}
