import * as eta from "https://deno.land/x/eta@v1.11.0/mod.ts";
import { NHttp, RequestEvent } from "https://deno.land/x/nhttp@0.2.4/mod.ts";
import { ViewEngine } from "../../mod.ts";

const app = new NHttp<RequestEvent & ViewEngine>();

eta.configure({
  views: `${Deno.cwd()}/views/`,
  cache: true,
});

app.use(ViewEngine.custom(eta.renderFile, {
  extname: ".eta",
}));

app.get("/hello", ({ response }) => {
  return response.view("index", {
    name: "John",
    title: "Page Title",
  });
});

app.listen(3000);
