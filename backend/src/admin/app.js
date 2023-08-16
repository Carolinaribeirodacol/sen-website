import ckeditor5Dll from "ckeditor5/build/ckeditor5-dll.js";
import ckeditor5MrkdownDll from "@ckeditor/ckeditor5-markdown-gfm/build/markdown-gfm.js";

const config = {
  locales: [
    'pt-BR',
  ],
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
