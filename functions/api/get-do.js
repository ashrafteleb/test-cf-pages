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

  const dObj = env.DURABLE_OBJ.get(
    env.DURABLE_OBJ.idFromString(params.get('key'))
  );
  // This isn't a real internet request, so the host is irrelevant (https://developers.cloudflare.com/workers/platform/compatibility-dates#durable-object-stubfetch-requires-a-full-url).
  const doResponse = await dObj.fetch(
    "https://do.draw.io/"
  );
  const val = await doResponse.json();

  return new Response("value from DO: " + JSON.stringify(val));
}catch(e){
  return new Response("error: " + e);
}
}