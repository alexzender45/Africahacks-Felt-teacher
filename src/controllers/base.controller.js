export class BaseController {
  success(res, data = [], message = '', httpStatus = 200) {
    res.status(httpStatus).send({
      status: 'success',
      message,
      data
    });
  }

  error(res, error) {
    res.status(error.code || 400).send({
      status: 'error',
      message: error.message
    });
  }
}
