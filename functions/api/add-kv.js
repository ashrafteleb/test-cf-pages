export async function onRequest(context) {
  try{
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    pathParams, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  let url = new URL(request.url);
  let params = url.searchParams;

  env.KV_STORE.put(params.get('key'), params.get('val'));
  return new Response("value added to KV");
} catch(e) {
  return new Response("error: " + e);
}
}