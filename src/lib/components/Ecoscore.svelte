<script lang="ts">
  import { onMount } from 'svelte';
  import { FEATURES } from '$lib/config/features';
  
  export let score: 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  let tooltipVisible = false;
  let componentElement: HTMLDivElement;
  let tooltipElement: HTMLDivElement;

  const scores = ['A+', 'A', 'B', 'C', 'D', 'E', 'F'] as const;
  
  function getBackgroundColor(letter: typeof scores[number]) {
    switch (letter) {
      case 'A+': return '#1B7E3D'; // Darker Green
      case 'A': return '#2D8E4D'; // Dark Green
      case 'B': return '#4BA956'; // Light Green
      case 'C': return '#FFCC00'; // Yellow
      case 'D': return '#FF9900'; // Orange
      case 'E': return '#FF4400'; // Red
      case 'F': return '#CC0000'; // Dark Red
    }
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
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 100 120" 
    fill="none"
  >
    <!-- Leaf shape with stem, tilted using transform -->
    <g transform="rotate(15, 50, 50)">
      <path
        d="
          M 50 5
          L 65 15
          C 85 25, 95 45, 95 65
          C 95 80, 85 90, 70 95
          L 50 98
          L 30 95
          C 15 90, 5 80, 5 65
          C 5 45, 15 25, 35 15
          L 50 5
          Z
          M 48 98
          L 52 98
          L 52 135
          L 48 135
          Z
        "
        fill={getBackgroundColor(score)}
        class="transition-colors duration-200"
      />
      <!-- Score text - counter-rotated to stay straight -->
      <text
        x="50"
        y="70"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="45"
        font-weight="bold"
        fill={score === 'C' ? '#333333' : 'white'}
        class="font-sans"
        transform="rotate(-15, 50, 70)"
      >
        {score}
      </text>
    </g>
  </svg>
</div>

{#if tooltipVisible && FEATURES.SCORE_TOOLTIPS}
  <div
    bind:this={tooltipElement}
    class="fixed -translate-x-1/2 -translate-y-full px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-md whitespace-nowrap z-[9999] shadow-lg pointer-events-none"
  >
    <div class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900/90 rotate-45"></div>
    Environmental impact score from A+ (lowest impact) to F (highest impact)
  </div>
{/if} 