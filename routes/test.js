import express from 'express';

/* GET users listing. */
var router = express.Router();

/* GET users listing. */


router.get('/', async function(req, res, next) {
    const resp = await req.sql.query("SELECT * FROM users")
    const users = resp.recordsets[0]
    res.send(users)
});


export default router;
