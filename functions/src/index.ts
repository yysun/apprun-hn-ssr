import * as functions from 'firebase-functions';
import app from './server';
export const hn = functions.https.onRequest(app);
