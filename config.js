'use strict';

exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/studiouso';

exports.TEST_DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/test-studiouso';

exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
