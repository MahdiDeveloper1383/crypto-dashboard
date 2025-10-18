 export const getCurrencySymbol = (cur: string) => {
    switch (cur) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
      case "jpy":
        return "¥";
      default:
        return "$";
    }
  };