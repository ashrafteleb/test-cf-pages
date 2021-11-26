export async function onRequest(context) {
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

  let val = await env.KV_STORE.get(params.get('key'));
  return new Response("value from KV: " + val);
}