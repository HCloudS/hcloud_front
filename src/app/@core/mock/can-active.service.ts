import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserData} from '../data/users';


@Injectable()
export class CanActiveService implements CanActivate {

  constructor(private route: Router, private users: UserData) {
  }

  /**
   * des: 用户是否可以登陆的逻辑内容
   * date: 1:13 下午 2020/1/15
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 获取当前是否登陆的状态
    if (!this.users.isLogin()) {
      this.route.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
