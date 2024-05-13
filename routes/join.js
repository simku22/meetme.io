import express from 'express';

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
    if(event.is_active){
      res.send('requested meeting id: ' + id + ', joining active meeting')
      // make post request to /join/eventID with users name in the post body     
    } else{
      res.send('requested meeting id: ' + id + ', but there is no active meeting')
    }
  } else {
    res.send('no meeting found')
  }
});


export default router;
