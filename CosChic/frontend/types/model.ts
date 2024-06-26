// src/types/models.ts

export interface Model {
    modelName: string;
    photoUrl: string;
    lips: number;
    eyes: number;
    eyebrow?: number;
    nose?: number;
    contour: number;
    similarity: number;
    userFullEyesizeRatio?: number;
    userFullTailEyeRatio?: number;
    userTopLipRatio?: number;
    userBottomLipRatio?: number;
    userRightSymmetryRatio?: number;
    userLeftSymmertyRatio?: number;
    userFaceNoseHeightRatio?: number;
    userFaceNoseWidthRatio?: number;
    modelFullEyesizeRatio?: number;
    modelFullTailEyeRatio?: number;
    modelTopLipRatio?: number;
    modelBottomLipRatio?: number;
    modelRightSymmetryRatio?: number;
    modelLeftSymmertyRatio?: number;
    modelFaceNoseHeightRatio?: number;
    modelFaceNoseWidthRatio?: number;
    modelNum: string;
    allModelNames: string;
    product: string;
}
