'use strict';

exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://admin:password1@ds121183.mlab.com:21183/studiouso-user';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:password1@ds121593.mlab.com:21593/studiouso-user-tests';

exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
