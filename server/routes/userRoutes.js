import express from 'express';
var router = express.Router();

router.post('/create', async(req, res) => {
    try {
        const { email } = req.body;
        if (!validateEmail(email)) res.status(500).json({ status: 'error', error: 'email in incorrect format'});
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

function validateEmail(email) {
    var re = new RegExp(/\S+@\S+\.\S+/);
    return re.test(email);
}

router.get('/past-events', async(req, res) => {
    try{
        const { email } = req.body;

        // comment this out while debugging
        /*
        if(!req.session.account) {
            return res.status(401).json({ error: 'User not authenticated' })
        }
        */
        const result = await req.sql.query(`SELECT user_id FROM users WHERE user_email = '${email}'`);
        const user_id = result.recordset[0].user_id;

        const resp = await req.sql.query(`SELECT * FROM events WHERE user_id = ${user_id} ORDER BY created DESC`)
        const users_meetings = resp.recordset;
        res.status(200).json(users_meetings);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
})



export default router;
