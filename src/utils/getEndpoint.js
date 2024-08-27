/**
 * Returns backend api endpoints
 * @param {"accts" | "trans" | "actions" | "trans:stream | "state:stream"} key
 * @returns {string}
 */

export function getEndpoint(key) {
  const endpoint = "http://localhost:3050";

  switch (key) {
    case "accts":
      return endpoint + "/api/accts";

    case "trans":
      return endpoint + "/api/trans";

    case "actions":
      return endpoint + "/api/actions";

    case "trans:stream":
      return endpoint + "/api/trans/stream";

    case "state:stream":
      return endpoint + "/api/state/stream";

    default:
      return endpoint;
  }
}
