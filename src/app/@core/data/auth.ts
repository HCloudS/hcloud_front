/**
 * des: 授权相关操作
 * date: 1:30 下午 2020/1/18
 */
import {Observable} from 'rxjs';
import {BaseService} from './base.service';


export interface Token {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  dept_id: number;
  license: string;
  username: string;
  user_id: number;
  tenant_id: number;
  token_type: string;
  scope: string;
}

export abstract class Auth extends BaseService {

  /**
   * des: 通过密码模式获取token
   * date: 1:30 下午 2020/1/18
   */
  abstract getTokenByPassword(username: string, password: string, code: string): Observable<Token>;

  /**
   * des: 通过手机号验证获取token
   * date: 1:31 下午 2020/1/18
   */
  abstract getTokenByMobile(mobile: string, code: string): Observable<Token>;

  /**
   * des: 通过社会账号获取token
   * date: 1:31 下午 2020/1/18
   */
  abstract getTokenBySocial(state: string, code: string): Observable<Token>;

  /**
   * des: 获取刷新token的
   * date: 1:31 下午 2020/1/18
   */
  abstract getRefreshToken(refresh_token: string): Observable<Token>;
}
