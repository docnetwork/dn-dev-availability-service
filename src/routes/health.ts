import { HealthRoute } from "../types";
import { RouteProps } from "./routeProps";

export const health = ({ req, res } : RouteProps ) => {
    res.json( { message: 'OK' } as HealthRoute );
}
