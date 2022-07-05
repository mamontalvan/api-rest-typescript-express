import { Router } from 'express';
import { getDownloadRepo } from '../controllers/downloads.controller';
import { body, check } from 'express-validator';
import { validaIdTribu } from '../helpers/db-validators';


const router =  Router();


router.get( '/:idTribu',getDownloadRepo ); 


export default router;