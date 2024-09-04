/**
 * Returns backend api endpoints
 * @param {"accts" | "trans" | "actions" | "manual" | "trans:stream | "state:stream" | "connect:stream"} key
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
      return endpoint + "/api/v1/trans";

    case "manual":
      return endpoint + "/api/manual";

    case "source:stream":
      return endpoint + "/api/v1/trans/source/stream";

    case "issues:stream":
      return endpoint + "/api/v1/trans/issues/stream";

    case "state:stream":
      return endpoint + "/api/state/stream";

    default:
      return endpoint;
  }
}
