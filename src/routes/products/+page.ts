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

export const load: PageLoad = async ({ fetch, url }) => {
	try {
		const currentPage = Number(url.searchParams.get('page')) || 1;
		const searchQuery = url.searchParams.get('search') || '';
		const pageSize = 12;

		const searchParams = {
			action: 'process',
			json: 'true',
			page: currentPage.toString(),
			page_size: pageSize.toString(),
			fields:
				'code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade,quantity,categories_tags'
		};

		if (searchQuery) {
			searchParams['search_terms'] = searchQuery;
		}

		const response = await fetch(
			'https://world.openfoodfacts.org/cgi/search.pl?' + new URLSearchParams(searchParams)
		);

		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}

		const data: APIResponse = await response.json();
		const totalPages = Math.ceil(Number(data.count) / pageSize);

		return {
			products: data.products,
			pagination: {
				currentPage,
				totalPages,
				pageSize
			}
		};
	} catch (error) {
		console.error('Error fetching products:', error);
		return {
			products: [],
			pagination: {
				currentPage: 1,
				totalPages: 1,
				pageSize: 12
			}
		};
	}
};
