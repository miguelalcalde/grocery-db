<script lang="ts">
    import Avatar from './Avatar.svelte';
    
    let isMenuOpen = false;
</script>

<nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <a href="/" class="flex-shrink-0 flex items-center">
                    <span class="text-xl font-bold">GroceryDB</span>
                </a>
                
                <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a href="/products" class="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md">
                        Products
                    </a>
                    <a href="/categories" class="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md">
                        Categories
                    </a>
                    <a href="/search" class="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md">
                        Search
                    </a>
                </div>
            </div>
            
            <div class="flex items-center">
                <Avatar />
            </div>
        </div>
    </div>
</nav> 