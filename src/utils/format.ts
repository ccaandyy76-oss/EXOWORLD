export const formatDays = (days: number) =>
  days > 730 ? `${days.toLocaleString("en-US")} Earth days (about ${(days / 365.25).toFixed(1)} years)` : `${days} Earth days`;

export const formatHours = (hours: number) =>
  hours < 48 ? `${hours} hours` : `${(hours / 24).toFixed(1)} Earth days`;
