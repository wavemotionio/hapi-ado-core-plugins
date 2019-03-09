import * as azdev from "azure-devops-node-api";
export declare function getWebApi(bearerToken?: string, adoServerUrl?: string, patToken?: string): Promise<azdev.WebApi>;
