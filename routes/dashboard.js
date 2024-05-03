import express from 'express';
var router = express.Router({mergeParams: true});

/* GET users listing. */
router.get('/', function(req, res, next) {
    const {id} = req.params;
  res.send('load the dashboard for ' + id);
});

export default router;