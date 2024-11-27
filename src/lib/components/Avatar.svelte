<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    let isDropdownOpen = false;
    let isLoggedIn = false; // This should later be connected to your auth state
    
    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }
    
    function handleLogInOut() {
        // To be implemented with actual auth
        isLoggedIn = !isLoggedIn;
        dispatch('authAction', { action: isLoggedIn ? 'login' : 'logout' });
        isDropdownOpen = false;
    }
</script>

<div class="relative">
    <button 
        class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
        on:click={toggleDropdown}
    >
        <span class="text-xl">👤</span>
    </button>
    
    {#if isDropdownOpen}
        <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                on:click={handleLogInOut}
            >
                {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
            
            <a
                href="/account"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                on:click={() => isDropdownOpen = false}
            >
                Account
            </a>
        </div>
    {/if}
</div> 