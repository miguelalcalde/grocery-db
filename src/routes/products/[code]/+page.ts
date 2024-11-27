import type { PageLoad } from './$types';

interface ProductDetails extends Record<string, any> {
	code: string;
	product_name: string | null;
	brands: string | null;
	image_url: string | null;
	image_front_url: string | null;
	image_ingredients_url: string | null;
	image_nutrition_url: string | null;
	nutriscore_grade?: string;
	ecoscore_grade?: string;
	quantity?: string;
	categories_tags?: string[];
	ingredients_text?: string;
	allergens_tags?: string[];
	nutriments?: {
		energy_100g?: number;
		proteins_100g?: number;
		carbohydrates_100g?: number;
		fat_100g?: number;
		fiber_100g?: number;
		salt_100g?: number;
	};
	stores_tags?: string[];
	countries_tags?: string[];
	labels_tags?: string[];
	serving_size?: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${params.code}`);

		if (!response.ok) {
			throw new Error('Product not found');
		}

		const data = await response.json();
		const product: ProductDetails = data.product;

		return {
			product
		};
	} catch (error) {
		console.error('Error fetching product:', error);
		throw error;
	}
};
