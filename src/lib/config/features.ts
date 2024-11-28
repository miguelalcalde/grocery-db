export const FEATURES = {
	SCORE_TOOLTIPS: false // Set to true to enable tooltips on Nutriscore and Ecoscore
} as const;

// Type helper for feature flags
export type FeatureFlag = keyof typeof FEATURES;
