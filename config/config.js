require('dotenv').config();

CONFIG = {};

CONFIG.app = process.env.APP || 'local';
CONFIG.port = process.env.PORT || '4000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_name = process.env.DB_NAME || 'online_learning';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_pass = process.env.DB_PASS || 'root';
CONFIG.db_port = process.env.DB_DIALECT || '3306';
CONFIG.max_pool_conn = process.env.MAX_POOL_CONN || '50';
CONFIG.min_pool_conn = process.env.MIN_POOL_CONN || '0';
CONFIG.conn_idle_time = process.env.CONN_IDLE_TIME || '10000';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || '4b672a9bb8f29932aa9cd5635e5f83106a3d8c10383784812df9f8e9939f0ef1374552f9621ec9b80938f26c08b8c517224b72570cc23b575ee16f39f47599e8';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '1800000';

CONFIG.secretkey = process.env.SECRETKEY || '3c8364d102c2684e97bea1090a043954e0a2ef5dc60d02af5351d6ed3a7cf994ce71f7bc00be6a1b1dc3e3202ca61ed0fafb9e1693a60c1a14e60cc2dbd1ab74';

CONFIG.email_user = process.env.EMAIL_USER || 'rochemichealr@gmail.com';
CONFIG.email_pass = process.env.EMAIL_PASS || 'ydxb kner xhxa ggex';