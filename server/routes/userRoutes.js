import express from 'express';

var router = express.Router();

router.get('/past-events', async(req, res) => {
    try{
        const { user_id } = req.body;

        // comment this out while debugging
        /*
        if(!req.session.account) {
            return res.status(401).json({ error: 'User not authenticated' })
        }
        */
        //const username = req.session.account.username;

        const result = await req.sql.query(`SELECT user_email FROM users WHERE user_id = ${user_id}`);
  
        const user = result.recordset[0];
    

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // comment this out while debugging
        /*
        if (user.email !== username) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }
        */

        // now select * from meetings where user_id = ${user_id}
        const resp = await req.sql.query(`SELECT * FROM events WHERE user_id = ${user_id} ORDER BY created DESC`)
        const users_meetings = resp.recordset[0]
        res.status(200).json(users_meetings);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
})



export default router;
