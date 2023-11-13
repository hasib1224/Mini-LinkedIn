const Minio = require('minio')

const minioClient = new Minio.Client({
    endPoint:'host.docker.internal',
    port: 9000,
    useSSL: false,
    accessKey:'4DXMLDmf7HgQGZ77uv7Q',
    // secretKey: 'Q6i79iIv40guXaKmMoPa2WeSnTeffgfRQyr1xgnU'
    secretKey:'buOtfMKYdeaikkOqPmCZxUtncF9AfIKpQui2FV10'
});

module.exports = minioClient;