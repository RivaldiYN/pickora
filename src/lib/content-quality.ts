// A product page only earns indexing and ad slots once it carries a real write-up.
// Pages below the threshold stay reachable for visitors but are marked noindex,
// left out of the sitemap, and render no ad units, so Google never evaluates
// them as thin affiliate pages.
// Threshold for considering a review comprehensive.
export const MIN_REVIEW_WORDS = 150;

// Listing pages are mostly links out. They only carry an ad unit once the
// catalog has enough full reviews behind it to count as a content site.
export const MIN_REVIEWED_FOR_LISTING_ADS = 10;

export function countWords(text: string | null | undefined): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function splitLines(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);
}

export function isSubstantialReview(review: string | null | undefined): boolean {
  return countWords(review) >= MIN_REVIEW_WORDS;
}
