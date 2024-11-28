<script lang="ts">
  import { onMount } from 'svelte';
  import { FEATURES } from '$lib/config/features';
  
  export let score: 'A' | 'B' | 'C' | 'D' | 'E';
  let tooltipVisible = false;
  let componentElement: HTMLDivElement;
  let tooltipElement: HTMLDivElement;

  const scores = ['A', 'B', 'C', 'D', 'E'] as const;
  
  function getBackgroundColor(letter: typeof scores[number]) {
    switch (letter) {
      case 'A': return 'bg-[#1e7e34]'; // Dark Green
      case 'B': return 'bg-[#97c11f]'; // Light Green
      case 'C': return 'bg-[#fecb02]'; // Yellow
      case 'D': return 'bg-[#ef8200]'; // Orange
      case 'E': return 'bg-[#e63e11]'; // Red
    }
  }

  function getTextColor(letter: typeof scores[number]) {
    return letter === 'C' ? 'text-gray-800' : 'text-white';
  }

  function updateTooltipPosition() {
    if (!componentElement || !tooltipElement) return;
    const rect = componentElement.getBoundingClientRect();
    tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
    tooltipElement.style.top = `${rect.top - 8}px`;
  }

  onMount(() => {
    if (!FEATURES.SCORE_TOOLTIPS) return;
    
    window.addEventListener('scroll', updateTooltipPosition, true);
    window.addEventListener('resize', updateTooltipPosition);
    return () => {
      window.removeEventListener('scroll', updateTooltipPosition, true);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  });

  $: if (tooltipVisible && FEATURES.SCORE_TOOLTIPS) {
    setTimeout(updateTooltipPosition, 0);
  }
</script>

<div 
  class="relative inline-block"
  bind:this={componentElement}
  on:mouseenter={() => FEATURES.SCORE_TOOLTIPS && (tooltipVisible = true)}
  on:mouseleave={() => tooltipVisible = false}
>
  <div class="inline-flex rounded-lg overflow-hidden h-10 text-sm font-bold">
    {#each scores as letter}
      <div 
        class={`
          flex items-center justify-center w-6
          ${getBackgroundColor(letter)}
          ${getTextColor(letter)}
          ${score === letter ? 'scale-110 shadow-md z-10' : 'opacity-10'}
          transition-all duration-200
        `}
      >
        {letter}
      </div>
    {/each}
  </div>
</div>

{#if tooltipVisible && FEATURES.SCORE_TOOLTIPS}
  <div
    bind:this={tooltipElement}
    class="fixed -translate-x-1/2 -translate-y-full px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-md whitespace-nowrap z-[9999] shadow-lg pointer-events-none"
  >
    <div class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900/90 rotate-45"></div>
    Nutritional quality score from A (most healthy) to E (least healthy)
  </div>
{/if} 