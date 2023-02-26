import mongoose from "mongoose";
import { model, Schema, Model, Document } from 'mongoose';

export interface BoardInput {
    temp: string;
    moisture: string;
    lighting: boolean;
}

interface boardModelInterface extends mongoose.Model<BoardDocument> {
    build(attr: BoardInput): BoardDocument
}

export interface BoardDocument extends BoardInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const boardSchema = new mongoose.Schema(
    {
        temp: { 
            type: String, 
            required: [true, "temp is a required field"],
         },
        moisture: { 
            type: String, 
            required: [true, "moisture is a required field"],
        },
        lighting : {
            type: Boolean, 
            required: [true, "lighting is a required field"],
        }
    },
    {
        timestamps: true,
    }
);

boardSchema.statics.build = (attr: BoardInput) => {
    return new boardModel(attr);
}

const boardModel = mongoose.model<BoardDocument, boardModelInterface>("datacenter", boardSchema);

export default boardModel;