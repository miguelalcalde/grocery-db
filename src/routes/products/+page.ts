import type { PageLoad } from './$types';

interface Product {
	product_name: string | null;
	brands: string | null;
	image_url: string | null;
	nutriscore_grade?: string;
	ecoscore_grade?: string;
	quantity?: string;
	categories_tags?: string[];
	code: string;
}

interface APIResponse {
	count: number;
	page: number;
	page_size: number;
	products: Product[];
}

interface SearchParams extends Record<string, string> {
	action?: string;
	json?: string;
	page: string;
	page_size: string;
	fields: string;
	search_terms?: string;
}

export const load: PageLoad = async ({ fetch, url }) => {
	try {
		const currentPage = Number(url.searchParams.get('page')) || 1;
		const searchQuery = url.searchParams.get('search') || '';
		const pageSize = 9;

		const fields =
			'code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade,quantity,categories_tags';

		// If we're searching, use the search API
		if (searchQuery) {
			const searchParams: SearchParams = {
				action: 'process',
				json: 'true',
				page: currentPage.toString(),
				page_size: pageSize.toString(),
				fields
			};

			if (searchQuery) {
				searchParams.search_terms = searchQuery;
			}

			const response = await fetch(
				'https://world.openfoodfacts.org/cgi/search.pl?' + new URLSearchParams(searchParams)
			);

			if (!response.ok) {
				throw new Error('Failed to fetch products');
			}

			const data: APIResponse = await response.json();

			return {
				products: data.products,
				pagination: {
					currentPage,
					totalPages: Math.ceil(Number(data.count) / pageSize),
					pageSize
				}
			};
		}

		// For browsing all products, use the V2 API
		const response = await fetch(
			`https://world.openfoodfacts.org/api/v2/search?` +
				new URLSearchParams({
					fields,
					page: currentPage.toString(),
					page_size: pageSize.toString()
				})
		);

		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}

		const data: APIResponse = await response.json();

		return {
			products: data.products,
			pagination: {
				currentPage,
				totalPages: Math.ceil(Number(data.count) / pageSize),
				pageSize
			}
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			products: [],
			pagination: {
				currentPage: 1,
				totalPages: 1,
				pageSize: 24
			}
		};
	}
};
