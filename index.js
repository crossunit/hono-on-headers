module.exports = onHeaders;

function onHeaders(ctx, listener) {
  if (!ctx) {
    throw new TypeError("Ctx object is required");
  }
  if (typeof listener !== "function") {
    throw new TypeError("Listener function must be provided");
  }
  ctx.newResponse = createNewResponse(ctx.newResponse, listener);
}

function createNewResponse(prevNewResponse, listener) {
  var fired = false;
  return function (body, statusCode, headers) {
    var args = setNewResponseHeaders.apply(this, arguments);
    if (!fired) {
      fired = true;
      listener.call(this);
      if (typeof args[1] === "number" && this._status !== args[1]) {
        this.status(this._status);
        args.length = 1;
      }
    }
    return prevNewResponse.apply(this, args);
  };
}

function setNewResponseHeaders(body, statusCode, headers) {
  var length = arguments.length;
  this.status(statusCode)
  if (
    typeof headers === "object" &&
    !Array.isArray(headers) &&
    headers !== null
  ) {
    setHeaders(this, headers);
  } else if (headers) {
    throw new TypeError("Headers must be in object form");
  }
  var args = new Array(length-1);
  for (var i = 0; i < args.length; i++) {
    args[i] = arguments[i];
  }
  return args;
}

function setHeaders(ctx, headers) {
  var keys = Object.keys(headers);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (k) ctx.header(k, headers[k]);
  }
}
