import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  links: Link[];
}

interface Link {
  shortened: string;
  original: string;
}

export const handler: Handlers = {
  GET(_, ctx) {
    const linksIds = Object.keys(localStorage);
    const links = linksIds.map((id) => ({
      shortened: `${ctx.url.origin}/${id}`,
      original: localStorage.getItem(id),
    }));

    return ctx.render({ links });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { links } = data;
  return (
    <div class="w-full flex justify-center">
      <div class="flex flex-col items-center gap-3 p-10 max-w-[640px] w-full">
        <img
          width="175"
          src="https://www.inf.puc-rio.br/wordpress/wp-content/uploads/2023/05/deco-logo-1.png"
        />
        <h1>My links</h1>
        {links.map(({ shortened, original }) => (
          <div class="border-2 rounded-md p-4">
            <p>
              <b>Shortened:</b> {shortened}
            </p>
            <p>
              <b>Original:</b> {original}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
