const Minio = require('minio')

const minioClient = new Minio.Client({
    endPoint:'127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'S8OMOXhcXJjd7wTC73Rd',
    secretKey: 'ivlmRiqCdQXNaUS5DKx983j8yd9aZ5NxieE3ZAAM'
});

module.exports = minioClient;