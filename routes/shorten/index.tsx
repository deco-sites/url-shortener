import { Handlers, PageProps } from "$fresh/server.ts";
import CopyButton from "$store/islands/CopyButton.tsx";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";

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
    const url = form.get("url");
    if (url) {
      const formIdSize = form.get("idSize");
      const idSize = formIdSize ? parseInt(formIdSize.toString()) : 6;
  
      const uuid = nanoid(idSize);
  
      await kv.set([uuid], url);
      localStorage.setItem(uuid, url.toString());
      const headers = new Headers();
      headers.set("location", `/shorten?uuid=${uuid}&originalUrl=${url}`);
      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      const headers = new Headers();
      headers.set("location", `/`);
      return new Response(null, {
        status: 303,
        headers,
      });
    }
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { id, originalUrl, origin } = data;
  const url = `${origin}/${id}`;
  return (
    <div class="w-full flex justify-center">
      <div class="flex flex-col items-center gap-3 p-10 max-w-[640px] w-full">
        <img width="175" src="https://www.inf.puc-rio.br/wordpress/wp-content/uploads/2023/05/deco-logo-1.png" />
        <div class="flex flex-col gap-1">
          <p class="font-bold">Shortened URL:</p>
          <div class="flex gap-1 items-center">
            <a class="text-[#2fd180] text-2xl" href={url}>{url}</a>
            <CopyButton textToCopy={url} />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <p class="font-bold">Original URL:</p>
          <a href={originalUrl}>{originalUrl}</a>
        </div>
        <div class="flex flex-col gap-1">
          <p>QR code:</p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=10x10`}
          />
        </div>
        <a class="text-[#2fd180]" href="/my-links">My links</a>
      </div>

    </div>
  );
}
