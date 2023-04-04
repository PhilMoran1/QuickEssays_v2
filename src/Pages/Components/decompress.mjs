import pako from 'pako';

export function decompressString(compressedString) {
  try {
  const compressedBuffer = Uint8Array.from(atob(compressedString), c => c.charCodeAt(0));
  const decompressedBuffer = pako.inflate(compressedBuffer);
  const decoder = new TextDecoder();
  const result = decoder.decode(decompressedBuffer);
  return result;

  } catch (error) {
  }
}
