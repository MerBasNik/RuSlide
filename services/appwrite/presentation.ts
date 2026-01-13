import type { Presentation } from "../../src/store/types/Presentation/Presentation.ts";
import { COLLECTION_ID, DATABASE_ID, databases } from "./config.ts";
import authService from "./auth.ts";
import { validateDocument, validatePresentation } from "../schema/presentationSchema.ts";
import { Query } from "appwrite";

const presentationService = () => {
    const { getUser } = authService();
    const savePresentation = async (data: Presentation) => {
        try {
            const user = await getUser();
            if (!user) {
                return;
            }
            const presentationData = {
                name: data.name,
                data: JSON.stringify(data),
                user_id: user.id,
            };
            const dataConfig = {
                databaseId: DATABASE_ID,
                collectionId: COLLECTION_ID,
                documentId: data.id,
                data: presentationData
            };
            try {
                return await databases.updateDocument(
                    dataConfig.databaseId,
                    dataConfig.collectionId,
                    dataConfig.documentId,
                    dataConfig.data
                );
            } catch (error: any) {
                if (error?.code === 404) {
                    return await databases.createDocument(
                        dataConfig.databaseId,
                        dataConfig.collectionId,
                        dataConfig.documentId,
                        dataConfig.data
                    );
                } else {
                    return error;
                }
            }
        } catch (error) {
            return error;
        }
    };
    const getPresentation = async (id: string) => {
        try {
            const presentationDoc = await databases.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            );
            const isValidDoc = validateDocument(presentationDoc);
            if (!isValidDoc) {
                return false;
            }
            const presentationData = JSON.parse(presentationDoc.data);
            const validPres = validatePresentation(presentationData);
            if (!validPres) {
                return false;
            }
            const presentation: Presentation = presentationData;
            return presentation;
        } catch {
            return null;
        }
    }
    const getAllPresentations = async () => {
        try {
            const user = await getUser();
            if (!user) {
                return [];
            }
            const presentations = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal('user_id', user.id),
                    Query.orderDesc('$createdAt')
                ]
            );
            return presentations.documents.map(doc => {
                const isValidDoc = validateDocument(doc);
                if (!isValidDoc) {
                    return null;
                }
                const presentation: Presentation = JSON.parse(doc.data);
                return presentation;
            });
        } catch {
            return [];
        }
    };

    return {
        savePresentation,
        getPresentation,
        getAllPresentations,
    };
};

export default presentationService;
