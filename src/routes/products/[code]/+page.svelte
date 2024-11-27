<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
    const { product } = data;

    function formatTag(tag: string): string {
        return tag.replace(/^(en|fr):/, '').split('-').join(' ');
    }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
    <a href="/products" class="text-blue-600 hover:underline mb-6 inline-block">← Back to Products</a>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <!-- Images Section -->
            <div class="space-y-4">
                {#if product.image_url}
                    <img 
                        src={product.image_url} 
                        alt={product.product_name || 'Product image'} 
                        class="w-full rounded-lg"
                    />
                    <div class="grid grid-cols-3 gap-4">
                        {#if product.image_ingredients_url}
                            <img 
                                src={product.image_ingredients_url} 
                                alt="Ingredients" 
                                class="w-full rounded-lg cursor-pointer hover:opacity-75"
                            />
                        {/if}
                        {#if product.image_nutrition_url}
                            <img 
                                src={product.image_nutrition_url} 
                                alt="Nutrition facts" 
                                class="w-full rounded-lg cursor-pointer hover:opacity-75"
                            />
                        {/if}
                    </div>
                {:else}
                    <div class="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-lg">
                        <span class="text-gray-400">No image available</span>
                    </div>
                {/if}
            </div>

            <!-- Product Info Section -->
            <div class="space-y-6">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">
                        {product.product_name || 'Unknown Product'}
                    </h1>
                    <p class="text-xl text-gray-600 mt-2">{product.brands || 'Unknown Brand'}</p>
                    {#if product.quantity}
                        <p class="text-gray-500 mt-1">{product.quantity}</p>
                    {/if}
                </div>

                <!-- Scores -->
                <div class="flex gap-4">
                    {#if product.nutriscore_grade}
                        <div class="text-center">
                            <div class="text-2xl font-bold bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center">
                                {product.nutriscore_grade.toUpperCase()}
                            </div>
                            <span class="text-sm text-gray-600 mt-1">Nutri-Score</span>
                        </div>
                    {/if}
                    {#if product.ecoscore_grade}
                        <div class="text-center">
                            <div class="text-2xl font-bold bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center">
                                {product.ecoscore_grade.toUpperCase()}
                            </div>
                            <span class="text-sm text-gray-600 mt-1">Eco-Score</span>
                        </div>
                    {/if}
                </div>

                <!-- Serving Size -->
                {#if product.serving_size}
                    <div>
                        <h2 class="font-semibold text-gray-900">Serving Size</h2>
                        <p class="text-gray-600">{product.serving_size}</p>
                    </div>
                {/if}

                <!-- Allergens -->
                {#if product.allergens_tags && product.allergens_tags.length > 0}
                    <div>
                        <h2 class="font-semibold text-gray-900">Allergens</h2>
                        <div class="flex flex-wrap gap-2 mt-2">
                            {#each product.allergens_tags as allergen}
                                <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                    {formatTag(allergen)}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Additional Information -->
        <div class="border-t border-gray-200 p-8 space-y-8">
            <!-- Ingredients -->
            {#if product.ingredients_text}
                <div>
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                    <p class="text-gray-600 leading-relaxed">{product.ingredients_text}</p>
                </div>
            {/if}

            <!-- Nutrition Facts -->
            {#if product.nutriments}
                <div>
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">Nutrition Facts (per 100g)</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {#if product.nutriments.energy_100g !== undefined}
                            <div class="bg-gray-50 p-4 rounded-lg text-center">
                                <div class="font-semibold text-gray-900">{product.nutriments.energy_100g}kcal</div>
                                <div class="text-sm text-gray-600">Energy</div>
                            </div>
                        {/if}
                        {#if product.nutriments.proteins_100g !== undefined}
                            <div class="bg-gray-50 p-4 rounded-lg text-center">
                                <div class="font-semibold text-gray-900">{product.nutriments.proteins_100g}g</div>
                                <div class="text-sm text-gray-600">Proteins</div>
                            </div>
                        {/if}
                        {#if product.nutriments.carbohydrates_100g !== undefined}
                            <div class="bg-gray-50 p-4 rounded-lg text-center">
                                <div class="font-semibold text-gray-900">{product.nutriments.carbohydrates_100g}g</div>
                                <div class="text-sm text-gray-600">Carbs</div>
                            </div>
                        {/if}
                        {#if product.nutriments.fat_100g !== undefined}
                            <div class="bg-gray-50 p-4 rounded-lg text-center">
                                <div class="font-semibold text-gray-900">{product.nutriments.fat_100g}g</div>
                                <div class="text-sm text-gray-600">Fat</div>
                            </div>
                        {/if}
                        {#if product.nutriments.fiber_100g !== undefined}
                            <div class="bg-gray-50 p-4 rounded-lg text-center">
                                <div class="font-semibold text-gray-900">{product.nutriments.fiber_100g}g</div>
                                <div class="text-sm text-gray-600">Fiber</div>
                            </div>
                        {/if}
                        {#if product.nutriments.salt_100g !== undefined}
                            <div class="bg-gray-50 p-4 rounded-lg text-center">
                                <div class="font-semibold text-gray-900">{product.nutriments.salt_100g}g</div>
                                <div class="text-sm text-gray-600">Salt</div>
                            </div>
                        {/if}
                    </div>
                </div>
            {/if}

            <!-- Additional Tags -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                {#if product.categories_tags && product.categories_tags.length > 0}
                    <div>
                        <h3 class="font-semibold text-gray-900 mb-2">Categories</h3>
                        <div class="flex flex-wrap gap-2">
                            {#each product.categories_tags.slice(0, 5) as category}
                                <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                                    {formatTag(category)}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/if}

                {#if product.labels_tags && product.labels_tags.length > 0}
                    <div>
                        <h3 class="font-semibold text-gray-900 mb-2">Labels</h3>
                        <div class="flex flex-wrap gap-2">
                            {#each product.labels_tags.slice(0, 5) as label}
                                <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm">
                                    {formatTag(label)}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/if}

                {#if product.stores_tags && product.stores_tags.length > 0}
                    <div>
                        <h3 class="font-semibold text-gray-900 mb-2">Available at</h3>
                        <div class="flex flex-wrap gap-2">
                            {#each product.stores_tags as store}
                                <span class="px-2 py-1 bg-green-50 text-green-600 rounded text-sm">
                                    {formatTag(store)}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div> 