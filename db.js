import sql from 'mssql'

var config = {
    user: 'admin1',
    password: process.env.AZURE_SQL_PASSWORD,
    server: 'meetme.database.windows.net',
    database: 'meetmeDB',
    options: {
        encrypt: true
    }

}

await sql.connect(config)

export default sql