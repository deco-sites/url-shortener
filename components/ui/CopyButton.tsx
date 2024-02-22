import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/copy.tsx";

export interface Props {
  textToCopy: string;
}

function CopyButton({ textToCopy }: Props) {
  return (
    <div class="p-2">
      <button
        onClick={async () => await navigator.clipboard.writeText(textToCopy)}
      >
        <IconCopy class="w-6 h-6" />
      </button>
    </div>
  );
}

export default CopyButton;
