import { Request, Response } from 'express';

export type RouteProps = {
    req: Request;
    res: Response;
}
