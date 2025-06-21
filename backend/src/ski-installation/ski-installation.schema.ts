// ski-installation.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class SkiInstallation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'SkiDomain', required: true })
  domainId: Types.ObjectId;

  @Prop({ required: true })
  name: string; // Numele instalației (ex: Gondola Sinaia)

  @Prop()
  type: string; // Tipul instalației (ex: Gondola, Telescaun, Teleschi)

  @Prop()
  schedule: string; // Programul de funcționare (ex: "08:30 - 16:30")
}

export const SkiInstallationSchema = SchemaFactory.createForClass(SkiInstallation);
