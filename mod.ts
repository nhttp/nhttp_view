import { Handler } from "https://deno.land/x/nhttp@0.2.4/src/types.ts";
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js";

export type TViewOptions = {
  autoescape?: boolean;
  throwOnUndefined?: boolean;
  trimBlocks?: boolean;
  lstripBlocks?: boolean;
  noCache?: boolean;
  web?: {
    useCache?: boolean;
    async?: boolean;
  };
  tags?: {
    blockStart: string;
    blockEnd: string;
    variableStart: string;
    variableEnd: string;
    commentStart: string;
    commentEnd: string;
  };
  [k: string]: any;
};

export type TViewOptionsCustom = {
  basedir?: string;
  extname?: string;
};

export class ViewEngine {
  render!: (name: string, params?: Record<string, any>, ...args: any) => any;
  static init(opts: TViewOptions & TViewOptionsCustom = {}): Handler {
    opts.basedir = opts.basedir || "views";
    opts.extname = opts.extname || ".html";
    nunjucks.configure(opts.basedir, opts);
    return (rev, next) => {
      rev.render = (
        name: string,
        params?: Record<string, any>,
      ) => {
        if (name.lastIndexOf(".") === -1) {
          name = name + opts.extname;
        }
        const html = nunjucks.render(name, params);
        rev.response.type("text/html; charset=utf-8").send(html);
      };
      next();
    };
  }
  static custom(render: any, opts: TViewOptionsCustom = {}): Handler {
    opts.basedir = opts.basedir || "";
    opts.extname = opts.extname || ".html";
    return (rev, next) => {
      rev.render = async (
        name: string,
        params?: Record<string, any>,
        ...args: any
      ) => {
        name = opts.basedir + name + opts.extname;
        const html = await render(name, params, ...args);
        rev.response.type("text/html; charset=utf-8").send(html);
      };
      next();
    };
  }
}
