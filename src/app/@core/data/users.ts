import {Observable} from 'rxjs';
import {BaseRequestBo} from './bean/BaseRequestBo';
import {BaseService} from './base.service';

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export interface User {
  permission: [string];

  sysUser: UserInfo;
}

export interface UserInfo {
  userId: number;
  username: string;
  password: string;
  createTime: string;
  updateTime: string;
  phone: string;
  avatar: string;
  tenantId: number;
  deptId: number;
}

export interface RegisterUserInfo {
  username: string;
  password: string | null;
  code: string;
  email: string | null;
  phone: string | null;
  sessionId: string | null;
}

export abstract class UserData extends BaseService {

  abstract getContacts(): Observable<Contacts[]>;

  abstract getRecentUsers(): Observable<RecentUsers[]>;

  // 获取相关内容 获取当前用户的登陆状态
  abstract isLogin(): Boolean;

  abstract logOut(): Observable<any>;

  abstract getUsers(): Observable<BaseRequestBo<User>>;

  abstract registerByPassword(registerInfo: RegisterUserInfo): Observable<any>;

  abstract registerByPhone(registerInfo: RegisterUserInfo): Observable<any>;
}
