<script lang="ts">
    let searchQuery = '';
</script>

<div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Search Products</h1>
    <div class="mb-6">
        <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search products..."
            class="w-full px-4 py-2 border rounded-md"
        />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Search results will go here -->
    </div>
</div> 