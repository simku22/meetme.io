import express from 'express';
import dashboardRouter from './dashboard.js';

/* GET users listing. */
var router = express.Router();

/* GET users listing. */
router.use('/:id/dashboard', dashboardRouter);

router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  res.send(id);
});


export default router;
