<script lang="ts">
    export let product: {
        product_name: string | null;
        brands: string | null;
        image_url: string | null;
        nutriscore_grade?: string;
        ecoscore_grade?: string;
        quantity?: string;
        categories_tags?: string[];
        code: string;
    };
</script>

<a 
    href="/products/{product.code}"
    class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
>
    <div class="relative aspect-square">
        {#if product.image_url}
            <img 
                src={product.image_url} 
                alt={product.product_name || 'Product image'}
                class="w-full h-full object-cover"
            />
        {:else}
            <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-400">No image available</span>
            </div>
        {/if}
    </div>
    
    <div class="p-4">
        <h3 class="font-semibold text-lg mb-1 text-gray-900 line-clamp-2">
            {product.product_name || 'Unknown Product'}
        </h3>
        <p class="text-sm text-gray-600 mb-2">
            {product.brands || 'Unknown Brand'}
        </p>
        
        {#if product.quantity}
            <p class="text-sm text-gray-500 mb-2">{product.quantity}</p>
        {/if}

        <div class="flex gap-2 mb-2">
            {#if product.nutriscore_grade}
                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Nutri-Score: {product.nutriscore_grade.toUpperCase()}
                </span>
            {/if}
            {#if product.ecoscore_grade}
                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Eco-Score: {product.ecoscore_grade.toUpperCase()}
                </span>
            {/if}
        </div>

        {#if product.categories_tags && product.categories_tags.length > 0}
            <div class="flex flex-wrap gap-1">
                {#each product.categories_tags.slice(0, 2) as category}
                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {category.replace('en:', '')}
                    </span>
                {/each}
            </div>
        {/if}
    </div>
</a> 