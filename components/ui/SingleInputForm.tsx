import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { ComponentChildren } from "preact";

// export interface Props {
//   header: Header;
//   links: Links;
//   background: Background;
//   footer?: Footer;
// }

export interface Props {
  header: Header;
  background: Background;
}

export interface Header {
  /** @description 150px x 150px image recommended */
  logo?: Logo;
  /** @format textarea */
  title?: string;
  /** @format textarea */
  description?: string;
  /**
   * @format color
   * @description color to be used in title and description
   */
  textColor: string;
}

export interface Logo {
  img?: ImageWidget;
  /** @description alternative text */
  alt?: string;
  width?: number;
  height?: number;
  /** @description external link on logo */
  link?: string;
}

// export interface Links {
//   items?: Link[];
//   style: Style;
// }

// export interface Link {
//   /** @description 20px transparent png recommended */
//   icon?: AvailableIcons;
//   label: string;
//   /** @format textarea */
//   href: string;
// }

// export interface Style {
//   /**
//    * @format color
//    * @description color to be used in link's text
//    */
//   textColor: string;
//   gradientColors: Gradient;
// }

// export interface Gradient {
//   /** @description multiple colors will create a gradient effect */
//   neutral: Neutral[];
// }

// export interface Neutral {
//   /**  @format color */
//   color: string;
// }

export interface Background {
  /** @description an image will override any background color */
  image?: ImageWidget;
  /** @format color */
  backgroundColor?: string;
}

// export interface Footer {
//   url?: string;
//   image?: ImageWidget;
//   /** @description alternative text */
//   alt?: string;
//   width?: number;
//   height?: number;
//   text?: string;
// }

function Links(props: Props) {
  // const { header, background, links } = props;
  const { header, background } = props;
  const logo = (
    <Image
      decoding="async"
      src={header.logo?.img || ""}
      alt={header.logo?.alt}
      width={header.logo?.width || 171}
      height={header.logo?.height || 60}
    />
  );

  const maybeLink = header?.logo?.link
    ? <a href={header?.logo?.link!} target="_blank">{logo}</a>
    : logo;

  // const ColorsNeutralAndHover = {
  //   color: links.style?.textColor,
  //   backgroundImage: `linear-gradient(to right, ${
  //     links.style?.gradientColors.neutral.map((color) => color.color).join(
  //       ", ",
  //     )
  //   })`,
  // };

  return (
    <BaseContainer background={background}>
      <header class="flex flex-col justify-center items-center gap-4">
        {header?.logo?.img && (
          <div class="rounded-full p-4">
            {maybeLink}
          </div>
        )}

        {header?.title && (
          <h1
            class="text-5xl font-bold text-center"
            style={{ color: header.textColor }}
          >
            {header?.title}
          </h1>
        )}

        {header?.description && (
          <p
            style={{ color: header.textColor }}
          >
            {header?.description}
          </p>
        )}
      </header>

      <main class="w-full">
        <form method="post" action="/shorten" class="flex gap-2">
          <div class="w-full">
            <p>URL</p>
            <input name="url" class="w-full border-2" />
          </div>
          <button type="submit" class="rounded-md bg-lime-600 p-2">
            Encurtar
          </button>
        </form>
      </main>

      {
        /* <footer class="flex flex-1 flex-col">
        {props.footer && (props.footer.image || props.footer.text) && (
          <div class="mt-auto">
            <a
              href={props.footer.url}
              class="text-xs flex flex-row items-center justify-center gap-1"
              target="_blank"
            >
              {props.footer.text && (
                <p
                  style={{ color: header.textColor }}
                >
                  {props.footer.text}
                </p>
              )}
              {props.footer.image && (
                <Image
                  src={props.footer.image || ""}
                  alt={props.footer.alt}
                  width={props.footer.width || 50}
                  height={props.footer.height || 20}
                />
              )}
            </a>
          </div>
        )}
      </footer> */
      }
    </BaseContainer>
  );
}

function BaseContainer(props: {
  children?: ComponentChildren;
  background?: Props["background"];
}) {
  const { image } = props?.background ?? {};
  const baseClasses = "flex justify-center w-full min-h-screen";
  const inlineStyle = image ? { background: `url(${image})` } : undefined;
  const backgroundColors = props?.background?.backgroundColor;
  const containerClasses = `${baseClasses}`;

  return (
    <div
      class={containerClasses}
      style={{
        ...inlineStyle,
        backgroundColor: backgroundColors ? backgroundColors : undefined,
      }}
    >
      <div class="flex flex-col items-center gap-12 p-10 max-w-[640px] w-full">
        {props.children}
      </div>
    </div>
  );
}

export default Links;
