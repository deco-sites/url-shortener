import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(_, ctx) {
        console.log("teste");
        const kv = await Deno.openKv();

        const { id } = ctx.params;
        const originalUrl = (await kv.get<string>([id])).value;

        const headers = new Headers();
        headers.set("location", originalUrl || '/');
        return new Response(null, {
            status: 303,
            headers,
        });
    }
};
  