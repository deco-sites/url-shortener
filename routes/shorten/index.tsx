import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
    id: string;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("uuid") || "";
    return ctx.render({ id: query });
  },
  async POST(req, _) {
    const kv = await Deno.openKv();

    const form = await req.formData();
    const url = form.get("url")?.toString();

    const uuid = crypto.randomUUID();

    await kv.set([uuid], url);
    const headers = new Headers();
    headers.set("location", `/shorten?uuid=${uuid}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Page({ data }: PageProps<Data>) {
    const { id } = data;
    const url = `http://localhost:8000/${id}`;
    return (
      <div>
        <a href={url}>link</a>
      </div>
    );
  }
