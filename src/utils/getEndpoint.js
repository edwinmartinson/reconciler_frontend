/**
 * Returns backend api endpoints
 * @param {"accts" | "trans" | "actions" | "trans:stream | "state:stream" | "connect:stream"} key
 * @returns {string}
 */

export function getEndpoint(key) {
  const endpoint = "http://localhost:3050";

  switch (key) {
    case "connect:stream":
      return endpoint + "/api/connect/stream";

    case "countdown:stream":
      return endpoint + "/api/countdown/stream";

    case "actions":
      return endpoint + "/api/actions";

    case "accts":
      return endpoint + "/api/accts";

    case "trans":
      return endpoint + "/api/trans";

    case "source:stream":
      return endpoint + "/api/trans/source/stream";

    case "issues:stream":
      return endpoint + "/api/trans/issues/stream";

    case "state:stream":
      return endpoint + "/api/state/stream";

    default:
      return endpoint;
  }
}
