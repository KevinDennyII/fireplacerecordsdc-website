export const IN_VIEW_MARGIN = "-80px 0px" as const;
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const STORE_HOURS = [
  { day: "Monday", hours: "Closed", isOpen: false, divider: false },
  { day: "Tuesday", hours: "Closed", isOpen: false, divider: false },
  { day: "Wednesday", hours: "Closed", isOpen: false, divider: false },
  { day: "Thursday", hours: "12PM – 8PM", isOpen: true, divider: true },
  { day: "Friday", hours: "12PM – 8PM", isOpen: true, divider: false },
  { day: "Saturday", hours: "12PM – 8PM", isOpen: true, divider: false },
  { day: "Sunday", hours: "12PM – 8PM", isOpen: true, divider: false },
] as const;

export const EVENTS_NOTES = [
  "Fresh event announcements are posted on Instagram first.",
  "In-store sets and showcases happen throughout the season.",
  "Check Instagram regularly for date and lineup updates.",
] as const;

export const CARRIED_FORMATS = [
  "Vinyl",
  "CDs",
  "VHS",
  "Comics",
  "Magazines",
  "Rare Media",
] as const;

export const RECORD_GRADES = [
  { grade: "NM", label: "Near Mint" },
  { grade: "EX", label: "Excellent" },
  { grade: "VG+", label: "Very Good+" },
] as const;

export const FOUNDERS = [
  {
    key: "dj-2-tone-jones",
    name: "DJ 2-Tone Jones",
    role: "Co-creator of Shaolin Jazz · US Ambassador of Hip Hop",
    href: "https://www.instagram.com/dj2tonejones/",
    handle: "@dj2tonejones",
    photoKey: "dj2tone",
    photoAlt: "DJ 2-Tone Jones standing in Fireplace Records",
  },
  {
    key: "anthony-mims",
    name: "Anthony Mims",
    role: "Philadelphia native · Hyattsville resident",
    href: null,
    handle: null,
    photoKey: "anthony",
    photoAlt: "Anthony Mims co-founder of Fireplace Records",
  },
  {
    key: "black-wilson",
    name: "Black Wilson",
    role: "Native Washingtonian · community-first",
    href: null,
    handle: null,
    photoKey: "black",
    photoAlt: "Black Wilson co-founder of Fireplace Records",
  },
  {
    key: "dj-iran",
    name: "DJ Iran",
    role: "WHUR radio · Howard University · DMV vinyl veteran",
    href: "https://www.instagram.com/dj_iran/",
    handle: "@dj_iran",
    photoKey: null,
    photoAlt: null,
  },
] as const;
