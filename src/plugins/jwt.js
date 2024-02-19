import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { readFileSync } from 'fs';
import path from 'path';

export default fp(async function (app, opts) {
    const privateKeyPath = path.join(__dirname, '..', '..', '..', 'R6.A.05-TP-Secu1-auth', '.ssl', 'ecdsa.key');
    const publicKeyPath = path.join(__dirname, '..', '..', '..', 'R6.A.05-TP-Secu1-auth', '.ssl', 'ecdsa.pub');
    const privateKey = readFileSync(privateKeyPath);
    const publicKey = readFileSync(publicKeyPath);

    app.register(fastifyJwt, {
        secret: {
            private: privateKey,
            public: publicKey
        },
        sign: {
            algorithm: 'ES256',
            issuer: 'info.iutparis.fr'
        },
        verify: {
            algorithms: ['ES256']
        }
    });
});