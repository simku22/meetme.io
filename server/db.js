import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

var config = {
    user: 'admin1',
    password: process.env.AZURE_SQL_PASSWORD,
    server: 'meetme.database.windows.net',
    database: 'meetmeDB',
    options: {
        encrypt: true
    }
}

await sql.connect(config).then(console.log('connected to meetmeDB'))

export default sql