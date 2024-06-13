const crypto = require("crypto");
const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const HttpError = require("./HttpError");

const {
  STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY,
  STORAGE_ENDPOINT,
  STORAGE_NAME,
} = process.env;

const s3 = new S3({
  forcePathStyle: false,
  endpoint: STORAGE_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: STORAGE_ACCESS_KEY,
    secretAccessKey: STORAGE_SECRET_KEY,
  },
});

const storageUploud = async (file, folder, size) => {
  const bytes = crypto.randomBytes(16).toString("hex");
  const originalname = file?.originalname || "";
  const fileName = `${bytes}-${originalname}`;

  try {
    const buffer = size
      ? await sharp(file.buffer)
          .resize({ width: size, height: size })
          .toBuffer()
      : file.buffer;

    const params = {
      Bucket: STORAGE_NAME,
      ACL: "public-read",
      Key: `${folder}/${fileName}`,
      Body: buffer,
      ContentType: file.mimetype,
      ContentDisposition: "inline",
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return fileName;
  } catch (error) {
    throw HttpError.Upload();
  }
};

module.exports = storageUploud;
