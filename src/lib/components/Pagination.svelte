<script lang="ts">
    export let currentPage: number;
    export let totalPages: number;
    export let onPageChange: (page: number) => void;

    function getPageNumbers() {
        const pages: (number | string)[] = [];
        
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Always show first page
        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        // Show pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        // Always show last page
        pages.push(totalPages);

        return pages;
    }
</script>

<div class="flex justify-center items-center gap-2 mt-8">
    <button
        class="px-3 py-2 rounded-lg border {currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50'}"
        on:click={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
    >
        Previous
    </button>

    <div class="hidden sm:flex gap-2">
        {#each getPageNumbers() as page}
            {#if typeof page === 'string'}
                <span class="px-3 py-2">...</span>
            {:else}
                <button
                    class="px-3 py-2 rounded-lg border {currentPage === page ? 'bg-blue-50 text-blue-600 border-blue-200' : 'hover:bg-gray-50'}"
                    on:click={() => onPageChange(page)}
                >
                    {page}
                </button>
            {/if}
        {/each}
    </div>

    <div class="sm:hidden">
        <span class="px-3 py-2">Page {currentPage} of {totalPages}</span>
    </div>

    <button
        class="px-3 py-2 rounded-lg border {currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50'}"
        on:click={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
    >
        Next
    </button>
</div> 