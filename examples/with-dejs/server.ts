import * as dejs from "https://deno.land/x/dejs@0.9.3/mod.ts";
import { NHttp, RequestEvent } from "https://deno.land/x/nhttp@0.2.4/mod.ts";
import { ViewEngine } from "../../mod.ts";

const app = new NHttp<RequestEvent & ViewEngine>();

app.use(ViewEngine.custom(dejs.renderFileToString, {
  basedir: `${Deno.cwd()}/views/`,
  extname: ".ejs",
}));

app.get("/hello", ({ response }) => {
  return response.view("index", {
    name: "John",
    title: "Page Title",
  });
});

app.listen(3000);
