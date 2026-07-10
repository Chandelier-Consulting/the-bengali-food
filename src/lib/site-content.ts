export type SiteSettings = {
  businessName: string; locationLabel: string; orderUrl: string; ratingText: string; footerDescription: string;
  home: { eyebrow: string; title: string; description: string; featuredEyebrow: string; featuredTitle: string; featuredDescription: string; gatheringEyebrow: string; gatheringTitle: string; gatheringDescription: string };
  about: { eyebrow: string; title: string; description: string };
  order: { eyebrow: string; title: string; description: string };
  catering: { eyebrow: string; title: string; description: string };
  images: Record<string, string>;
};
