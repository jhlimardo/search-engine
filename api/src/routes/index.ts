import { Router } from 'express';
const router = Router();
import {getMoviesApi, getMovies, getMovieById} from '../controllers/moviesController'

router.get('/api', getMoviesApi);
router.get('/', getMovies);
router.get('/:id', getMovieById);


export default router;


