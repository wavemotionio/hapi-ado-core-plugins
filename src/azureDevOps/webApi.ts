import * as azdev from "azure-devops-node-api";

export async function getWebApi(bearerToken?: string, adoServerUrl?: string, patToken?: string): Promise<azdev.WebApi> {
    return new Promise<azdev.WebApi>(async (resolve, reject) => {
        let authHandler = null;

        try {
            if (patToken) {
                authHandler = azdev.getPersonalAccessTokenHandler(patToken);
            } else {
                authHandler = bearerToken ? azdev.getBearerHandler(bearerToken.replace('Bearer ', '')) : null;
            }

            const azureDevOps: azdev.WebApi = new azdev.WebApi(adoServerUrl, authHandler);

            resolve(azureDevOps);
        } catch (err) {
            reject(err);
        }
    });
}
