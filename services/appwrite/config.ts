import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

const PROJECT_ID = "692da510001f6869a0a2"
const ENDPOINT = "http://ruslide.ru/v1"; //"https://fra.cloud.appwrite.io/v1"

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const DATABASE_ID = '69367aed00219cb3d3b3';
export const COLLECTION_ID = 'presentations';
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);