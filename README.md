# hono-on-headers

Provide room for logic when Hono begins writing response headers.

## Installation

```sh
$ bun i hono-on-headers
```

## Example

```js
import { Hono } from "hono";
import onHeaders from "hono-on-headers";

function someLogic () {
    console.log("response is departing");
    // You can change status code
    this.status(203);
    // You can add new headers
    this.header("oneMoreHeader", "value");
    this.header("oneMore", "value");
    // or any other logic
}

const app = new Hono();

app.use((ctx, next) => {
    onHeaders(ctx, someLogic);
    next();
});

app.get("/", (ctx) => {
    return ctx.text("Created!", 201);
});

export default {
    port: 3000,
    fetch: app.fetch,
  };
  
```

## Notice
Manually using Hono's `New Response(...)` syntax to return your responses will override the functionality of this package. This is explained in this [comment](https://github.com/honojs/hono/issues/1526#issuecomment-1742191598). As `New Response(...)` creates an entirely new response (separated from the middleware's Context object). Hono will ignore the context object.

## Testing
This package is currently functional but not tested enough for me to not have a disclaimer put on, so until I receive enough lgtms by people using it, this disclaimer will remain on the readme.

Open an issue if anything comes up or send me a message on Discord `AC#4155`

## Elysia JS users
If you're using Elysia JS, just latch into the native Elysia `onResponse` api and provide a callback with your logic, look [here](https://github.com/elysiajs/elysia/blob/82f49cdff1b8c1de7ef7a1ecd06d6c97111a0f80/src/index.ts#L601).  

## License
[MIT](LICENSE)
