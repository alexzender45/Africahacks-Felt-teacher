import { config as dotConfig } from 'dotenv';
import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

dotConfig();

const JobParentSchema = new Schema(
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
        ref: 'Parent'
    }]
  
  }
);



JobParentSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const JobParent = model('JobParent', JobParentSchema);

export default JobParent;
