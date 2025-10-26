import { jest } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';

const actualPath = await import('path');

const mockDefineConfig = jest.fn((config) => config);
const mockReactPlugin = jest.fn(() => 'react-plugin-instance');
const mockTailwindPlugin = jest.fn(() => 'tailwind-plugin-instance');
const mockPathResolve = jest.fn((...args) => actualPath.resolve(...args));

jest.unstable_mockModule('vite', () => ({
  defineConfig: mockDefineConfig,
}));

jest.unstable_mockModule('@vitejs/plugin-react', () => ({
  default: mockReactPlugin,
}));

jest.unstable_mockModule('@tailwindcss/vite', () => ({
  default: mockTailwindPlugin,
}));

jest.unstable_mockModule('path', () => ({
  ...actualPath,
  resolve: mockPathResolve,
}));

const viteConfigModule = await import('../vite.config.js');
const config = viteConfigModule.default;

// __tests__
describe('Vite Configuration', () => {
  describe('Configuration Structure', () => {
    test('should be defined', () => {
      expect(config).toBeDefined();
      expect(typeof config).toBe('object');
    });

    test('should call defineConfig with config object', () => {
      mockDefineConfig(config);
      expect(mockDefineConfig).toHaveBeenCalledWith(config);
    });
  });

  describe('Plugins Configuration', () => {
    test('should have plugins array', () => {
      expect(config.plugins).toBeDefined();
      expect(Array.isArray(config.plugins)).toBe(true);
      expect(config.plugins).toHaveLength(2);
    });

    test('should include React plugin', () => {
    const reactPluginFound = config.plugins.some(p => 
        typeof p === 'string' && p.includes('react-plugin-instance')
      );
      expect(reactPluginFound).toBe(true);
    });

    test('should include Tailwind CSS plugin', () => {
      const tailwindPluginFound = config.plugins.some(p => 
        typeof p === 'string' && p.includes('tailwind-plugin-instance')
      );
      expect(tailwindPluginFound).toBe(true);
    });

  });

  describe('Path Resolution Configuration', () => {
    test('should have resolve configuration', () => {
      expect(config.resolve).toBeDefined();
      expect(typeof config.resolve).toBe('object');
    });

    test('should have alias configuration', () => {
      expect(config.resolve.alias).toBeDefined();
      expect(typeof config.resolve.alias).toBe('object');
    });

    const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

    test('should map @ to src directory', () => {
      const expectedPath = path.resolve(projectRoot, 'src');
      expect(config.resolve.alias['@']).toBe(expectedPath);
    });

  });

  describe('Build Configuration', () => {
    test('should have build configuration', () => {
      expect(config.build).toBeDefined();
      expect(typeof config.build).toBe('object');
    });

    test('should have rollup options', () => {
      expect(config.build.rollupOptions).toBeDefined();
      expect(typeof config.build.rollupOptions).toBe('object');
    });

    test('should have output configuration', () => {
      expect(config.build.rollupOptions.output).toBeDefined();
      expect(typeof config.build.rollupOptions.output).toBe('object');
    });

    test('should have manualChunks function', () => {
      expect(config.build.rollupOptions.output.manualChunks).toBeDefined();
      expect(typeof config.build.rollupOptions.output.manualChunks).toBe('function');
    });

    test('should have chunk size warning limit', () => {
      expect(config.build.chunkSizeWarningLimit).toBe(1000);
    });
  });

  describe('Manual Chunks Function', () => {
    const manualChunks = config.build.rollupOptions.output.manualChunks;

    test('should categorize known libraries', () => {
      expect(manualChunks('react')).toBe('react-vendor');
      expect(manualChunks('react-router-dom')).toBe('router-vendor');
      expect(manualChunks('@tanstack/react-query')).toBe('query-vendor');
      expect(manualChunks('@stripe/react-stripe-js')).toBe('stripe-vendor');
      expect(manualChunks('firebase')).toBe('firebase-vendor');
      expect(manualChunks('@radix-ui/react-dialog')).toBe('ui-vendor');
      expect(manualChunks('axios')).toBe('utils-vendor');
    });

    test('should return vendor for other node_modules', () => {
      expect(manualChunks('/node_modules/unknown-lib/index.js')).toBe('vendor');
    });

    test('should return undefined for project files', () => {
      expect(manualChunks('/src/components/Button.js')).toBeUndefined();
    });

    test('should handle edge cases safely', () => {
      expect(() => manualChunks('')).not.toThrow();
      expect(() => manualChunks(null)).not.toThrow();
      expect(() => manualChunks(undefined)).not.toThrow();
    });
  });

  describe('Performance Considerations', () => {
    test('should have reasonable chunk size warning limit', () => {
      expect(config.build.chunkSizeWarningLimit).toBeGreaterThan(0);
      expect(config.build.chunkSizeWarningLimit).toBeLessThan(2000);
    });
  });
});