const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = async (file) => {
  const content = fs.readFileSync(file.tempFilePath);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.name,
    Body: content
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    console.log('Success', data);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};
// run();

module.exports = {
  uploadFile
};
