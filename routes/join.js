import express from 'express';
import dashboardRouter from './dashboard.js';

/* GET users listing. */
var router = express.Router();

/* GET users listing. */


router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  //res.send('requested meeting id: ' + id);
  // first step, check if this meeting id exists in the database
  let event = await req.models.Event.findOne({event_id: id});
  console.log(event)
  if(event){
    res.send('requested meeting id: ' + id)
  } else {
    res.send('no meeting found')
  }
});


export default router;
