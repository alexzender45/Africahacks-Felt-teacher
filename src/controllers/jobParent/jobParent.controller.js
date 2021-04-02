import { BaseController } from '.';
import JobParent from '../../model/job.indexParent';
import { throwError } from '../../utils/handleErrors';
import Parent from '../../model/parent.model';

export class JobParentController extends BaseController {
  constructor() {
    super();
  }

  async createJob(req, res) {
 if(req.user.role !== 'parent'){
  return res.status(401).json({
    message: 'You Are Not Approved To Perform This Action'
  });
 }else{
  const author = req.user._id
    const data = req.body;

    try {
      const newJob = new JobParent(data);
      const job = await newJob.save();
      const finduser= await Parent.findById(author)
      finduser.jobs.push(job)
      await finduser.save();
      job.owner.push(author)
      await job.save()
      return res.status(201).json({
       job

      });
    }
    catch (e) {
      super.error(e);
    }
  }
}

  async readAllJob(req, res) {
    if(req.user.approved !== true && req.user.status !== 'Approved'){
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    }else{
    try {

      const job = await JobParent.find({});

      super.success(res, job || [], 'Successfully Retrieved all jobs.');
    } catch (e) {
      super.error(res, e);
    }
  }
}

  async deleteAllJob(req, res) {
    try {
      await JobParent.deleteMany({});

      super.success(res, [], 'Delete Successful.');
    } catch (e) {
      super.error(res, e);
    }
  }
  async fetchOneJob(req, res, next) {
    try {
      const job = await JobParent.findById(req.params._id);
      if (!job) {
        return res.status(400).send({ error: 'Job does not exist' });
      }
      if(job)
      return res.status(200).send(job);
    } catch (e) {
      super.error(res, e);
    }
  }


async updateJob(req, res) {
  if(req.user.approved !== true && req.user.status !== 'Approved'){
    return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
  }else{
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'neededTeacher',
      'shortNoteAboutTeacherYouWant',
    ];
    const isValidUpdate = updates.every((update) => {
      return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
      throwError(400, 'Invalid Field.');
    }

    const jobParentUpdate = req.body;

    updates.map((update) => {
      req.user[update] = jobParentUpdate[update];
    });

    const updatedJobParent = await req.user.save();
    super.success(res, updatedJobParent, 'Update Successful');
  } catch (e) {
    super.error(res, e);
  }
}
}


  async deleteOneJob(req, res) {
    if(req.user.approved !== true && req.user.status !== 'Approved'){
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    }else{
    try {
      const job = await req.user.remove();

      super.success(res, job, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}
}