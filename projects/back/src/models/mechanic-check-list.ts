import mongoose, { Document, Schema, Model } from 'mongoose';

interface IStatus {
  name: string;
  type: string;
  state: string;
  quality: string;
}

interface IParts {
  value: string;
  label: string;
}

interface IProblem {
  name: string;
  title: string;
  reason: string;
  parts: IParts[];
  images: string[];
}

interface IMechanicalCheckList extends Document {
  data: IStatus[];
  problem: IProblem[];
  vehicle: string;
  mechanicEngineer: string;
}

const StatusSchema: Schema<IStatus> = new Schema({
  name: { type: String, default: '' },
  type: { type: String, default: '' },
  state: { type: String, default: '' },
  quality: { type: String, default: '' },
});

const PartsSchema: Schema<IParts> = new Schema({
  value: { type: String, default: '' },
  label: { type: String, default: '' },
});

const ProblemSchema: Schema<IProblem> = new Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  reason: { type: String, default: '' },
  parts: { type: [PartsSchema], default: [] },
  images: { type: [String], default: [''] },
});

const MechanicalCheckListSchema: Schema<IMechanicalCheckList> = new Schema({
  data: { type: [StatusSchema], default: [] },
  problem: { type: [ProblemSchema], default: [] },
  vehicle: { type: String, default: '' },
  mechanicEngineer: { type: String, default: '' },
});

export const MechanicalCheckListModel: Model<IMechanicalCheckList> =
  mongoose.models.MechanicalCheckList ||
  mongoose.model<IMechanicalCheckList>(
    'MechanicalCheckList',
    MechanicalCheckListSchema
  );
