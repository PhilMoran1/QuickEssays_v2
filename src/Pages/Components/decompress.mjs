import pako from 'pako';

export function decompressString(compressedString) {
  try {
  const compressedBuffer = Uint8Array.from(atob(compressedString), c => c.charCodeAt(0));
  const decompressedBuffer = pako.inflate(compressedBuffer);
  const decoder = new TextDecoder();
  const result = decoder.decode(decompressedBuffer);
  console.log("successfully decompressed - ", result)
  return result;

  } catch (error) {
    console.log("couldnt decompress - ", compressedString, " due to: ", error)
  }
}
