import express from 'express';
import { search } from './search';

const router = express.Router();

router.get('/search', search);

export default router;
