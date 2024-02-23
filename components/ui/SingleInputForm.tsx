import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { ComponentChildren } from "preact";

export interface Props {
  header: Header;
  background: Background;
  form: Form;
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

export interface Form {
  input: Input;
  button: Button;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /shorten
   */
  action?: string;
  extraField?: ExtraField;
}

export interface Input {
  /**
   * @title Input field name
   * @default url
   */
  name?: string;
  /**
   * @title Input Label
   * @default URL
   */
  label?: string;
  /**
   * @title Input Placeholder
   * @default "Paste a long URL"
   */
  placeholder?: string;
}

export interface Button {
  /**
   * @title Button background color
   * @format color
   * @default #2fd180
   */
  backgroundColor?: string;
  /**
   * @title Button text color
   * @format color
   * @default #fff
   */
  textColor?: string;
  /**
   * @title Button text
   * @default Shorten
   */
  text?: string;
}

export interface ExtraField {
  name: string;
  value: string;
}

export interface Background {
  /** @description an image will override any background color */
  image?: ImageWidget;
  /** @format color */
  backgroundColor?: string;
}

const defaultForm: Form = {
  input: { label: "URL", placeholder: "Paste a long URL", name: "url" },
  button: {
    backgroundColor: "#2fd180",
    textColor: "#fff",
    text: "Shorten",
  },
  extraField: {
    name: "idSize",
    value: "6",
  },
  action: "/shorten",
};

function Links(props: Props) {
  const { header, background, form = defaultForm } = props;
  const formAction = form.action;
  const { label, placeholder, name } = form.input;
  const {
    backgroundColor: buttonBackgroundColor,
    textColor: buttonTextColor,
    text: buttonText,
  } = form.button;
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
        <form method="post" action={formAction}>
          <p>{label}</p>
          <div class="w-full flex gap-2">
            <input
              name={name}
              class="w-full border-2 rounded-md p-1"
              placeholder={placeholder}
            />
            <input
              type="hidden"
              name={form.extraField?.name}
              value={form.extraField?.value}
            />
            <button
              type="submit"
              class="rounded-md p-2"
              style={{
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor,
              }}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </main>
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
