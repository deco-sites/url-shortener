import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    GET(_, ctx) {
        // const kv = await Deno.openKv();
        const s = "a";
        return ctx.render(s);
    },
    POST(req, ctx) {
        console.log(req);
        console.log(ctx);
    //   const form = await req.formData();
    //   const email = form.get("email")?.toString();
  
    //   // Add email to list.
  
    //   // Redirect user to thank you page.
      const headers = new Headers();
      headers.set("location", "/thanks-for-subscribing");
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    },
  };