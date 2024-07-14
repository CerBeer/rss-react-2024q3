/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASEURL: string;
  readonly VITE_API_URL_SECTION: string;
  readonly VITE_API_URL_PAGE: string;
  readonly VITE_API_URL_FORMAT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
