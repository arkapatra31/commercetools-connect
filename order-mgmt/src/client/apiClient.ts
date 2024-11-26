import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { config } from "dotenv";
import fetch from 'node-fetch';

config();

export const projectKey: string = process.env.CTP_PROJECT_KEY || "";

const authMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
        clientId: process.env.CTP_CLIENT_ID || '',
        clientSecret: process.env.CTP_CLIENT_SECRET || '',
    },
    scopes: [`manage_project:${projectKey}`],
    fetch,
};

const httpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
};

const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withUserAgentMiddleware()
    .build();

export const apiRoot: ApiRoot = createApiBuilderFromCtpClient(client);