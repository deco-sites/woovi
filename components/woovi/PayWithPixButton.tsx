import { signal } from "@preact/signals";

import WooviLogo from "./WooviLogo.tsx";

export interface Props {
  /** @description value of the charge */
  value: number;
}

const loading = signal<boolean>(false);

const appId =
  "Q2xpZW50X0lkXzhlZDllYjdkLWQzYzItNGI2MC04OTdlLWFlMTM4NzlhMTM4MTpDbGllbnRfU2VjcmV0Xy91VFJ4KzJCV0svTTl2T1NNQm5NdFczVmZmWitQUHJZelVQYWxld3NpVEk9";
const pluginUrl = "https://plugin.woovi.com/v1/woovi.js";

declare global {
  interface Window {
    $woovi: unknown[];
  }
}

function PayWithPixButton({ value }: Props) {
  const handleSubmit = () => {
    loading.value = true;

    window.$woovi = window.$woovi || [];

    window.$woovi.push(["config", { appID: appId }]);

    window.$woovi.push(["pix", {
      value,
      correlationID: crypto.randomUUID(),
    }]);

    loading.value = false;
  };

  return (
    <>
      <button
        className="inline-flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transition-colors duration-150 ease-in h-[36px] w-full px-3 rounded bg-[#03d69d] font-button text-button text-default-inverse hover:bg-[#02956d] active:bg-[#02956d] active:text-default-inverse disabled:text-subdued disabled:bg-interactive-inverse focus:outline-none"
        onClick={handleSubmit}
      >
        {!loading.value
          ? (
            <>
              Pagar com Pix
              <WooviLogo color="#ffffff" width="42px" height="42px" />
            </>
          )
          : "Loading"}
      </button>
      <script src={pluginUrl} async></script>
    </>
  );
}

export default PayWithPixButton;
