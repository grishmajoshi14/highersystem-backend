// createTables.js
// const pool = require("../config/postgres");

// const createTables = async () => {
//     try {
//         // Define SQL queries to create the tables
//         const createSignupTableQuery = `
//             CREATE TABLE IF NOT EXISTS signup (
//                 id SERIAL PRIMARY KEY,
//                 g_id VARCHAR(255),
//                 firstName VARCHAR(100) NOT NULL,
//                 lastName VARCHAR(100) NOT NULL,
//                 email VARCHAR(100) NOT NULL,
//                 phoneNumber BIGINT NOT NULL,
//                 password VARCHAR(100) NOT NULL,
//                 date TIMESTAMP DEFAULT NOW()
//             );
//         `;
        
//         const createServiceRequestsTableQuery = `
//             CREATE TABLE IF NOT EXISTS ServiceRequests (
//                 id SERIAL PRIMARY KEY,
//                 service_name VARCHAR(255) NOT NULL,
//                 full_name VARCHAR(255) NOT NULL,
//                 email VARCHAR(255) NOT NULL,
//                 phone_no VARCHAR(20) NOT NULL,
//                 query TEXT NOT NULL,
//                 status VARCHAR(50) DEFAULT 'created',
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//             );
//         `;
        
//         // Get a client from the pool
//         const client = await pool.connect();

//         // Execute the SQL queries
//         await client.query(createSignupTableQuery);
//         await client.query(createServiceRequestsTableQuery);
        
//         console.log("Tables created successfully.");
        
//         // Release the client back to the pool
//         client.release();
//     } catch (error) {
//         console.error("Error creating tables:", error);
//     }
// };

// createTables();


const pool = require("../config/postgres");

const createTables = async () => {
    try {
        const createSignupTableQuery = `
            CREATE TABLE IF NOT EXISTS signup (
                id SERIAL PRIMARY KEY,
                g_id VARCHAR(255),
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phoneNumber BIGINT NOT NULL,
                password VARCHAR(100) NOT NULL,
                date TIMESTAMP DEFAULT NOW()
            );
        `;
        
        const createServiceRequestsTableQuery = `
            CREATE TABLE IF NOT EXISTS ServiceRequests (
                id SERIAL PRIMARY KEY,
                service_name VARCHAR(255) NOT NULL,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone_no VARCHAR(20) NOT NULL,
                query TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'created',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const createUpdateTriggerQuery = `
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ language 'plpgsql';

            CREATE TRIGGER update_service_requests_updated_at
            BEFORE UPDATE ON ServiceRequests
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        `;

        const client = await pool.connect();

        await client.query(createSignupTableQuery);
        await client.query(createServiceRequestsTableQuery);
        await client.query(createUpdateTriggerQuery);

        console.log("Tables created successfully.");

        client.release();
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};

createTables();
