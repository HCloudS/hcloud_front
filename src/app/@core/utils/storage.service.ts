import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {
  }

  // 将数据写入localStorage
  setItemToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // 从localStorage中读取key的值，转换为JSON对象
  getJsonItemFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  getItemFromLocalStorage(key) {
    return localStorage.getItem(key);
  }

  // 从localStorage中删除key的值
  removeItemFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  // 将数据写入localStorage
  setItemToSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // 从localStorage中读取key的值，转换为JSON对象
  getJsonItemFromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  getItemFromSessionStorage(key) {
    return sessionStorage.getItem(key);
  }

  // 从localStorage中删除key的值
  removeItemFromSessionStorage(key) {
    sessionStorage.removeItem(key);
  }
}
