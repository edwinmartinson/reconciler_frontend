/**
 * Returns backend api endpoints
 * @param {"accts" | "trans" | "actions" | "manual" | "trans:stream | "state:stream" | "connect:stream" | "countdown:stream"} key
 * @returns {string}
 */
export function getEndpoint(key) {
  const endpoint = "http://localhost:3050";

  switch (key) {
    case "state:stream":
      return endpoint + "/api/state/stream";

    case "connect:stream":
      return endpoint + "/api/connect/stream";

    case "countdown:stream":
      return endpoint + "/api/countdown/stream";

    case "actions":
      return endpoint + "/api/actions";

    case "accts":
      return endpoint + "/api/accts";

    case "trans":
      return endpoint + "/api/v2/trans";

    case "trans:stream":
      return endpoint + "/api/v2/trans/stream";

    case "manual":
      return endpoint + "/api/manual";

    default:
      return endpoint;
  }
}
