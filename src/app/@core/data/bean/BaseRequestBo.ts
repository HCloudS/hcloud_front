export class BaseRequestBo<T> {
    public static STATUS_CODE_ERROR = -1;

    public static STATUS_CODE_DEFAULT = 0;

    private _data: T | null = null;

    private _msg: string | null = null;

    private _code: number = BaseRequestBo.STATUS_CODE_DEFAULT;

    get data(): T | null {
        return this._data;
    }

    set data(value: T | null) {
        this._data = value;
    }

    get msg(): string | null {
        return this._msg;
    }

    set msg(value: string | null) {
        this._msg = value;
    }

    get code(): number {
        return this._code;
    }

    set code(value: number) {
        this._code = value;
    }
}
