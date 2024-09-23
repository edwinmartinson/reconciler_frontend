export default function resolver(arg) {
  switch (arg.toLowerCase()) {
    case "pending":
      return "source";

    case "outstanding":
      return "issues";

    case "reconciled":
      return "archive";

    default:
      throw new Error("Invalid arg");
  }
}
