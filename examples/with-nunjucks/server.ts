import { NHttp, RequestEvent } from "https://deno.land/x/nhttp@0.2.4/mod.ts";
import { ViewEngine } from '../../mod.ts';

const app = new NHttp<RequestEvent & ViewEngine>();

app.use(ViewEngine.init());

app.get("/hello", ({ render }) => {
    return render('index', {
        name: "John",
        title: "Page Title"
    });
});

app.listen(3000);