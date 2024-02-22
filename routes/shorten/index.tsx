import { Handlers, PageProps } from "$fresh/server.ts";
import CopyButton from "$store/islands/CopyButton.tsx";

interface Data {
  id: string;
  originalUrl: string;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const id = url.searchParams.get("uuid") || "";
    const originalUrl = url.searchParams.get("originalUrl") || "";
    return ctx.render({ id, originalUrl });
  },
  async POST(req, _) {
    const kv = await Deno.openKv();

    const form = await req.formData();
    const url = form.get("url")?.toString();

    const uuid = crypto.randomUUID();

    await kv.set([uuid], url);
    const headers = new Headers();
    headers.set("location", `/shorten?uuid=${uuid}&originalUrl=${url}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { id, originalUrl } = data;
  const url = `http://localhost:8000/${id}`;
  return (
    <div>
      <p>URL encurtada:</p>
      <a href={url}>{url}</a>
      <CopyButton textToCopy={url}/>
      <p>URL original:</p>
      <a href={originalUrl}>{originalUrl}</a>
    </div>
  );
}
