
type Req = import("express").Request;
type Res = import("express").Response;
declare type Middleware<T extends Object | void = void> = (req: Req, res: Res) => Promise<T>;