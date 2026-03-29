/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HOOKS EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Central export point for all custom hooks.
 * Import from '@/hooks' for clean imports.
 * 
 * @packageDocumentation
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Mouse tracking
export * from './useMousePosition';

// Media query utilities
export { useIsMobile } from './use-mobile';
export { useMediaQuery } from './useMediaQuery';
export { useScrollPosition } from './useScrollPosition';
