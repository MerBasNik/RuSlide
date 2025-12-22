import type { Presentation } from "../../src/store/types/Presentation/Presentation.ts";
import { databases } from "./config.ts";
import authService from "./auth.ts";
import { validateDocument, validatePresentation } from "../schema/presentationSchema.ts";
import { Query } from "appwrite";

const presentationService = () => {
    const { getCurrentUser } = authService();
    const savePresentation = async (data: Presentation) => {
        const user = await getCurrentUser();
        if (!user) {
            return;
        }
        let presentation;
        try {
            presentation = await databases.getDocument(
                '69367aed00219cb3d3b3',
                "presentations",
                data.id
            );
        } catch {
            presentation = await databases.createDocument(
                "69367aed00219cb3d3b3",
                "presentations",
                data.id,
                {
                    name: data.name,
                    data: JSON.stringify(data),
                    user_id: user?.id || "",
                }
            );
            return presentation;
        }
        presentation = await databases.updateDocument(
            "69367aed00219cb3d3b3",
            "presentations",
            data.id,
            {
                name: data.name,
                data: JSON.stringify(data),
                user_id: user?.id || "",
            }
        );
        return presentation;
    }
    const getPresentation = async (id: string) => {
        try {
            const presentation = await databases.getDocument(
                '69367aed00219cb3d3b3',
                "presentations",
                id
            );
            const validDoc = validateDocument(presentation);
            if (!validDoc) {
                return false;
            }
            const presentationData = JSON.parse(presentation.data);
            const validPres = validatePresentation(presentationData);
            if (!validPres) {
                return false;
            }
            return true;
        } catch {
            return false;
        }
    }

    const getAllPresentations = async () => {
        try {
            const user = await getCurrentUser();
            if (!user) {
                return [];
            }
            const presentations = await databases.listDocuments(
                '69367aed00219cb3d3b3',
                'presentations',
                [
                    Query.equal('user_id', user.id),
                    Query.orderDesc('$createdAt')
                ]
            );
            return presentations.documents.map(doc => {
                const validDoc = validateDocument(doc);
                if (!validDoc) {
                    return null;
                }
                return {
                    id: doc.$id,
                    name: doc.name,
                    data: doc.data ? JSON.parse(doc.data) : null,
                    userId: doc.user_id,
                    createdAt: doc.$createdAt,
                    updatedAt: doc.$updatedAt,
                    rawDocument: doc,
                };
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
