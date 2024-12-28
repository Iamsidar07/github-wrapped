const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
if (!backendUri) throw new Error("Missing BACKEND_URI");
export const config = Object.freeze({
  backendUri,
});
