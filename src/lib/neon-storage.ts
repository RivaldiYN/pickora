import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

export const ASSETS_BUCKET = "assets";

export async function uploadAsset(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
) {
  const command = new PutObjectCommand({
    Bucket: ASSETS_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  return await s3.send(command);
}

export async function listAssets() {
  const command = new ListObjectsV2Command({
    Bucket: ASSETS_BUCKET,
  });

  const response = await s3.send(command);
  return response.Contents || [];
}
