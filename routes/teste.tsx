import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
    id: string;
}

export const handler: Handlers = {
  GET(req, ctx) {
    // const kv = await Deno.openKv();
    console.log(ctx.url);
    const s = "a";
    return ctx.render(s);
  },
  async POST(req, _) {
    const kv = await Deno.openKv();

    const form = await req.formData();
    const url = form.get("url")?.toString();

    
    const uuid = crypto.randomUUID();

    await kv.set([uuid], url)
    //   // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/shorten");
    return new Response(null, {
      status: 200, // See Other
      headers,
    });
  },
};

export default function Page({ data }: PageProps<Data>) {
    const { id } = data;
    return (
      <div>
        {id}
      </div>
    );
  }
