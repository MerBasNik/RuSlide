import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client();

const PROJECT_ID = "692da510001f6869a0a2"
// const PROJECT_NAME = "RuSlide"
const ENDPOINT = "https://fra.cloud.appwrite.io/v1"

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };