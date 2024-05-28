import express from 'express';
var router = express.Router();

router.post('/create', async(req, res) => {
    try {
        const { email } = req.body;
        const createUserQuery = `
            INSERT INTO users (user_email, signup_date)
            SELECT DISTINCT '${email}' as email, GETDATE() as date
            FROM users
            WHERE '${email}' NOT IN
            (select user_email from users);
        `
        await req.sql.query(createUserQuery);
        res.send('success');
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
})

router.get('/myIdentity', async (req, res, next) => {
    if(req.session.isAuthenticated){
        res.json({ 
            status: 'loggedin',  
            userInfo: {
                name: req.session.account.name,
                username: req.session.account.username,
            }
        });
    } else{
        res.json({ status: 'loggedout' });
    }
});

router.get('/past-events', async(req, res) => {
    if (req.session.isAuthenticated) {
        try{
            const result = await req.sql.query(`SELECT user_id FROM users WHERE user_email = '${req.session.account.username}'`);
            const user_id = result.recordset[0].user_id;
            const resp = await req.sql.query(`SELECT * FROM events WHERE user_id = ${user_id} ORDER BY created DESC`)
            const users_meetings = resp.recordset;
            res.status(200).json(
                {
                    meetings: users_meetings, 
                    userId: user_id
                }
            );
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message });
        }
    } else {
        res.status(500).json({ status: 'not logged in'});
    }
})

export default router;