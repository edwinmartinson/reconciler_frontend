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

    case "currency":
      return endpoint + "/api/accts/currency";

    case "trans":
      return endpoint + "/api/v2/trans";

    case "trans:stream":
      return endpoint + "/api/v2/trans/stream";

    case "manual":
      return endpoint + "/api/manual";

    case "ints":
      return endpoint + "/api/ints";

    default:
      return endpoint;
  }
}
