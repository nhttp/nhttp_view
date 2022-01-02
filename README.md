## NHttp View

View template engine for [Deno](https://deno.land/)
[nhttp](https://github.com/nhttp/nhttp) based on
[nunjucks](https://mozilla.github.io/nunjucks) by default.

[Nunjucks](https://mozilla.github.io/nunjucks/) is a full featured templating
engine for javascript. It is heavily inspired by
[jinja2](http://jinja.pocoo.org/). View the docs
[here](https://mozilla.github.io/nunjucks/).

> Thanks to [nunjucks-deno](https://github.com/valtlai/nunjucks-deno) ported
> from [Nunjucks](https://mozilla.github.io/nunjucks/).

## Installation

### deno.land

```ts
import { ViewEngine } from "https://deno.land/x/nhttp_view@0.1.2/mod.ts";
```

### nest.land

```ts
import { ViewEngine } from "https://x.nest.land/nhttp_view@0.1.2/mod.ts";
```

## Usage

```ts
// server.ts
import { NHttp, RequestEvent } from "https://deno.land/x/nhttp@1.1.5/mod.ts";
import { ViewEngine } from "https://deno.land/x/nhttp_view@0.1.2/mod.ts";

const app = new NHttp<RequestEvent & ViewEngine>();

app.use(ViewEngine.init());

app.get("/hello", ({ response }) => {
  return response.view("index", {
    name: "John",
    title: "Page Title",
  });
});

app.listen(3000);
```

```html
<!-- views/index.html -->
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  <h1>hello, {{ name }}</h1>
</body>
</html>
```

## Run

```bash
deno run --allow-net --allow-read --unstable yourfile.ts
```

## Default Config

```js
...
app.use(ViewEngine.init({
    basedir: "views",
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    noCache: false,
    web: {
        useCache: false,
        async: false
    }
}));
...
```

## Custom

```js
import * as dejs from "https://deno.land/x/dejs@0.9.3/mod.ts";
import { NHttp, RequestEvent } from "https://deno.land/x/nhttp@1.1.5/mod.ts";
import { ViewEngine } from "https://deno.land/x/nhttp_view@0.1.2/mod.ts";

const app = new NHttp<RequestEvent & ViewEngine>();

app.use(ViewEngine.custom(dejs.renderFileToString, {
  basedir: `${Deno.cwd()}/views/`,
  extname: '.ejs'
}));

app.get("/hello", ({ response }) => {
  return response.view('index', {
    name: "John",
    title: "Page Title"
  });
});

app.listen(3000);
```

## License

[MIT](LICENSE)
