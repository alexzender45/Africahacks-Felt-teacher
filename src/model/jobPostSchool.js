import { config as dotConfig } from 'dotenv';
import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

dotConfig();

const JobSchema = new Schema(
  {
    neededTeacher: {
      type: String,
      required: true,
    },
    shortNoteAboutTeacherYouWant: {
      type: String,
       required: true,
    },
    owner: [{
        type: Schema.Types.ObjectId,
        ref: 'School'
    }]
  
  }
);



JobSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const Job = model('Job', JobSchema);

export default Job;
