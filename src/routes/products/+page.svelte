<script lang="ts">
    import { goto } from '$app/navigation';
    import ProductCard from '$lib/components/ProductCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    let searchQuery = '';

    function handleSearch(event: SubmitEvent) {
        event.preventDefault();
        applyFilters();
    }

    function applyFilters() {
        const params = new URLSearchParams();
        
        if (searchQuery) {
            params.set('search', searchQuery);
        }
        params.set('page', '1');
        
        goto(`?${params.toString()}`, { keepFocus: true });
    }

    function handlePageChange(newPage: number) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', newPage.toString());
        goto(`?${searchParams.toString()}`, { keepFocus: true });
    }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Product Catalog</h1>
    
    <div class="space-y-4 mb-6">
        <form on:submit={handleSearch}>
            <div class="flex gap-2">
                <input
                    type="search"
                    bind:value={searchQuery}
                    placeholder="Search products..."
                    class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>
        </form>
    </div>

    {#if data.products.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each data.products as product}
                <ProductCard {product} />
            {/each}
        </div>

        {#if data.pagination.totalPages >= 834}
            <p class="text-sm text-gray-600 text-center mt-4">
                Showing first 10,000 results due to API limitations
            </p>
        {/if}

        <Pagination 
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
        />
    {:else}
        <div class="text-center py-12">
            <p class="text-gray-600">No products found</p>
        </div>
    {/if}
</div> 