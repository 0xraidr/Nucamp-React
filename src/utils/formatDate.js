export const formatDate = (date) => {
  if (!date) {
    return;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(Date.parse(date)));
};
