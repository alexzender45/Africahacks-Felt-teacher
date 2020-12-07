import { config as dotConfig } from 'dotenv';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import path from 'path';

import Teacher from '../model/teacher.model';
import { throwError } from '../utils/handleErrors';

dotConfig();

export async function authenticate(req, res, next) {
  try {
    const jwtPayload = decodeJwtToken(req);
    const user = await getUserPayload(jwtPayload);

    req.token = jwtPayload.token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({
      error: {
        message: e.message
      }
    });
  }
}

export function decodeJwtToken(req) {
  const requestHeaderAuthorization = req.headers.authorization;

  if (!requestHeaderAuthorization) {
    throwError(401, 'Authentication Failed. Please login');
  }

  const [authBearer, token] = requestHeaderAuthorization.split(' ');

  if (authBearer !== 'Bearer') {
    throw new Error('Authentication Failed');
  }

  const jwtPayload = jwt.verify(token, process.env.JWT_SECRETE_KEY);

  jwtPayload.token = token;

  return jwtPayload;
}

export function getUserPayload(payload) {
  const user = userPayload(Teacher, payload);

  return user;
}

export async function userPayload(userModel, payload) {
  const user = await userModel.findOne({
    _id: payload._id,
    'tokens.token': payload.token
  });

  if (!user) {
    throwError(401, 'Access denied. Please login or create an account');
  }

  return user;
}

export function permit(users) {
  return (req, res, next) => {
    const isAuthorized = users.includes(req.user.role);

    if (!isAuthorized) {
      return res.status(403).send({
        error: {
          message: 'Unauthorized Access. Contact the admin.'
        }
      });
    }

    next();
  };
}

