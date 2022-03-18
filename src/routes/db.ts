import { Pool } from 'pg';

const connectionString = 'postgres://'; //LINK AQUI

const db = new Pool({ connectionString });
export default db;