import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {BaseRequestBo} from './bean/BaseRequestBo';

export interface CaptureInfo {
  url: string;
  sessionId: string;
}

export abstract class Capture extends BaseService {

  abstract sendSmsCapture(phone: string): Observable<BaseRequestBo<string>>;

  abstract getPicCapture(phone: string): Observable<CaptureInfo>;
}
