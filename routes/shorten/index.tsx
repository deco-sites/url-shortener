import { Handlers, PageProps } from "$fresh/server.ts";
import CopyButton from "$store/islands/CopyButton.tsx";

interface Data {
  id: string;
  originalUrl: string;
  origin: string;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const origin = url.origin;
    const id = url.searchParams.get("uuid") || "";
    const originalUrl = url.searchParams.get("originalUrl") || "";
    return ctx.render({ id, originalUrl, origin });
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
  const { id, originalUrl, origin } = data;
  const url = `${origin}/${id}`;
  return (
    <div>
      <p>URL encurtada:</p>
      <a href={url}>{url}</a>
      <CopyButton textToCopy={url} />
      <p>URL original:</p>
      <a href={originalUrl}>{originalUrl}</a>
      <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=10x10`} alt="" title="" />
    </div>
  );
}
