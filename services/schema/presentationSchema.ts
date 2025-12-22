import Ajv from "ajv";

const ajv = new Ajv();

const DocumentSchema = {
    type: 'object',
    properties: {
        $id: { type: 'string' },
        name: { type: 'string' },
        data: { type: 'string' },
        user_id: { type: 'string' },
        $createdAt: { type: 'string' },
        $updatedAt: { type: 'string' },
        $collectionId: { type: 'string' },
        $databaseId: { type: 'string' },
        $sequence: { type: 'integer' },
        $permissions: { type: 'array' },
    },
    required: ['$id', 'name', 'data', 'user_id'],
    additionalProperties: false,
} as const;

const PresentationSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        slides: { type: 'object' },
        slidesOrder: { type: 'array' },
        selectedSlides: { type: 'array' },
        currentSlide: { type: 'string' },
    },
    required: ['id', 'name', 'slides', 'slidesOrder', 'selectedSlides', 'currentSlide'],
    additionalProperties: false,
} as const;

export const validateDocument = ajv.compile(DocumentSchema);
export const validatePresentation = ajv.compile(PresentationSchema);