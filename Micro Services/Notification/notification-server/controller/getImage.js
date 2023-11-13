const minioClient = require('../minio/minioConfig');


const getImageFromMinio = (imageId) => {
    return new Promise((resolve, reject) => {
        minioClient.getObject('linkedin-post', imageId, (err, dataStream) => {
            if (err) {
                // Handle any error when fetching the image from MinIO
                reject(err);
            } else {
                const chunks = [];
                dataStream.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                dataStream.on('end', () => {
                    // Concatenate the binary chunks and resolve with the image data
                    const imageData = Buffer.concat(chunks);
                    resolve(imageData);
                });

                dataStream.on('error', (err) => {
                    reject(err);
                });
            }
        });
    });
};

module.exports = getImageFromMinio