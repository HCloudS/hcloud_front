import {Injectable} from '@angular/core';
import {JSEncrypt} from '../../../assets/jsencrypt/jsencrypt';

@Injectable()
export class EncrtyService {

  jsEncrypt: JSEncrypt;

  private = 'MIIEowIBAAKCAQEAxxCSrFW0M+Kx5lP8qzgEIX40Ep5ErbmIbGxoGmBXcU5tIOvxTAEqa+GUo1MwwNZwzwPt2g4eqHQt1' +
    'v7XHLuyfKNbAD81YfjzC2UUKJnmdC6SpkXWIa2xjeALrK6Pbb0QONtIAxP1siVi5xNLudCQnGgHHFX5HkH1PsDylBNX0qHeqH7' +
    'dkVhNTIU325ggtO9g8j8bF0PzkBmo6oP4rXgxbgT9lg4B3YOk1YRs77EWNoSCTcW1W+IgNfCQ3uC9CcPB8t9KqPA/eupP1MaCfb' +
    'mHoodx+31zMXWkipniXoE73DlLETHvYyP4MXXNYrSPBGx4XmYqXspsAaMd6K+yj1NZcQIDAQABAoIBAFtxMH87q1i+RQxR /lpElBk' +
    'ymQcIbvICrTlpHvUm1mQ1K4oY+DH6wxrld9sCxv1+RDnES0mEfO7S14/QZs5LJnV8sLvPTV1g93x/hSAVejhagIEiyXeVC1/p0FMVq' +
    'Ms3MzF7AXxwecfIxsLxKTMFLLi8TK/milYs5FRcW9JLhGc7ptrd0k7pkNEZ51Du9dr6WwlaW7p+p0G/sv7OKWZgt3wdI0DwaG0Ex/' +
    'IvIcGQ7XAgfgbbbkuMRth6RCZckne0JgZHXDLdBuCffMsmrH9dm/wGf5dx6DlKksj3tvaCcHBGpWOQ9eHcTqMgMSBDLipZ5ANok5px' +
    'P4HxA+kU602N1AECgYEA5LVnY+NiAvR1lGrsBqQyjDt9i3X4TbkbwsgNfQZQuaWPUroSfa0VB8ptdsllg6ov0Ba7v+0t60tgmmbGsa' +
    'hB87kpQ7qUdovbOs99FCGlod7zPv0LCkbOib3wbwIc5SSE7q9k1jQpPQp+Y9hYPBX0t24u5G5LGmT+Iu961KwdycECgYEA3tGbfeQd' +
    'J25geEcCzCopWEibIfpOwPRLpApjTBZ/ukYev9HonB1W/acWSCBnqOL3P8VeJrpSQlzMYkFMcCVWy/xAoZeWD+P+H1jY8ueNaRrQHD' +
    'AWJh6Pbhq2QfHbFUJwh94T8BQqgiYrJ4PPbuMBJrk6D/ENJEt018jsuBxTm7ECgYEAmJKLzo86K055wfEyU5vmPLbTId4pL3B1nJNo' +
    'rCcyYyaXXlDTVRPKG9BnBf+EwTkffGouBfNr1rQKVfaKRqpAlR7I8G3f7NWQAsO4ZV2s6TeafkLAwrJJxon3g5adQCAErlZDpsJVYG' +
    'tHtcP12N+syVGv5qPNZmZJQ3UPNCE+HgECgYAEM8fO9AJov/gpzI0M9K6a76OdXG8nzHOwwFFnGfWGudPSok7UwujlF8Wfzpyl3sHy' +
    '/fHsoQ70GXPxVnHum4WrizJc2dMGsbIVPUO6MQvFs6/BGFcSmPjzhqVxUPJk0D/3EAUoPfkfQ0EFGcNLwBRBerTRoCYzTQkDGNL+Fe' +
    'qtwQKBgAYRsQA4mXzfWEbSeV+/lMzL9XuAWCFJKHNvueIbDjurh6xETh28/yuezrrjagwTgsC5wINREGzD7jtk9C+lFe2YjwdIuWtC' +
    'JcLj0DdGh+EszOiGEmnFk9TEtZ2TtfBClasYK6+SVYP2FgLv1tu3sYAvlUqNX4/nPxD5yKgUw6Us';

  constructor() {
    this.jsEncrypt = new JSEncrypt({
      default_key_size: 2048,
    });
  }

  /**
   * @des: 对字符串进行Rsa加密
   * @author: houshuai
   * @date: 2019/5/22
   * @param inputValue 待加密字符
   */
  encryptClick(inputValue: string): string {
    this.jsEncrypt.setPrivateKey(this.private);
    const rsa = this.jsEncrypt.encrypt(inputValue);
    return rsa.toString();
  }
}
