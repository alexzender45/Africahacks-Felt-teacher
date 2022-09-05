"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobController = void 0;

var _ = require(".");

var _job = _interopRequireDefault(require("../../model/job.indexSchool"));

var _handleErrors = require("../../utils/handleErrors");

var _sch = _interopRequireDefault(require("../../model/sch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JobController extends _.BaseController {
  constructor() {
    super();
  }

  async createJob(req, res) {
    if (req.user.role !== 'school') {
      return res.status(401).json({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      const author = req.user._id;
      const data = req.body;

      try {
        const newJob = new _job.default(data);
        const job = await newJob.save();
        const finduser = await _sch.default.findById(author);
        finduser.jobs.push(job);
        await finduser.save();
        job.owner.push(author);
        await job.save();
        return res.status(201).json({
          job
        });
      } catch (e) {
        super.error(e);
      }
    }
  }

  async readAllJob(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      try {
        const job = await _job.default.find({});
        super.success(res, job || [], 'Successfully Retrieved all jobs.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async deleteAllJob(req, res) {
    try {
      await _job.default.deleteMany({});
      super.success(res, [], 'Delete Successful.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async fetchOneJob(req, res, next) {
    try {
      const job = await _job.default.findById(req.params._id);

      if (!job) {
        return res.status(400).send({
          error: 'Job does not exist'
        });
      }

      if (job) return res.status(200).send(job);
    } catch (e) {
      super.error(res, e);
    }
  }

  async updateJob(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      try {
        const updates = Object.keys(req.body);
        const allowedUpdates = [' neededTeacher', 'shortNoteAboutTeacherYouWant'];
        const isValidUpdate = updates.every(update => {
          return allowedUpdates.includes(update);
        });

        if (!isValidUpdate) {
          (0, _handleErrors.throwError)(400, 'Invalid Field.');
        }

        const jobUpdate = req.body;
        updates.map(update => {
          req.user[update] = jobUpdate[update];
        });
        const updatedJob = await req.user.save();
        super.success(res, updatedJob, 'Update Successful');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async deleteOneJob(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      try {
        const job = await req.user.remove();
        super.success(res, job, 'Delete Successful');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

}

exports.JobController = JobController;
//# sourceMappingURL=jobSchool.controller.js.map