// tests/agenda.spec.js
import { test, expect } from '@playwright/test';

test.describe('Agenda Application', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173');
    
    // Wait for the page to be fully loaded and Svelte to hydrate
    await page.waitForLoadState('networkidle');
    
    // Wait for the h1 to be visible (ensures component is rendered)
    await page.waitForSelector('h1', { state: 'visible' });
  });

  test.describe('Adding Tasks', () => {
    test('should add a task when clicking Add button', async ({ page }) => {
      const input = page.locator('.agenda-input');
      const addButton = page.locator('.add-button');
      
      // Ensure input is ready
      await expect(input).toBeVisible();
      await expect(addButton).toBeVisible();
      
      // Add a task
      await input.fill('Buy milk');
      await addButton.click();
      
      // Wait for the task to appear (with longer timeout)
      const taskItem = page.locator('.agenda-item').first();
      await expect(taskItem).toBeVisible({ timeout: 5000 });
      await expect(taskItem).toContainText('Buy milk');
    });

    test('should add a task when pressing Enter', async ({ page }) => {
      const input = page.locator('.agenda-input');
      
      await input.fill('Walk the dog');
      await input.press('Enter');
      
      const taskItem = page.locator('.agenda-item').first();
      await expect(taskItem).toBeVisible({ timeout: 5000 });
      await expect(taskItem).toContainText('Walk the dog');
    });

    test('should clear input after adding', async ({ page }) => {
      const input = page.locator('.agenda-input');
      const addButton = page.locator('.add-button');
      
      await input.fill('Clear this');
      await addButton.click();
      
      // Wait a bit for the reactivity to update
      await page.waitForTimeout(100);
      await expect(input).toHaveValue('');
    });

    test('should not add empty task', async ({ page }) => {
      const addButton = page.locator('.add-button');
      
      // Try to add empty task
      await addButton.click();
      
      // No tasks should be added
      const taskItems = page.locator('.agenda-item');
      await expect(taskItems).toHaveCount(0);
    });
  });

  test.describe('Multiple Tasks', () => {
    test('should add multiple tasks', async ({ page }) => {
      const input = page.locator('.agenda-input');
      const addButton = page.locator('.add-button');
      
      const tasks = ['First task', 'Second task', 'Third task'];
      
      for (const task of tasks) {
        await input.fill(task);
        await addButton.click();
        // Wait for Svelte to update the DOM
        await page.waitForTimeout(200);
      }
      
      const taskItems = page.locator('.agenda-item');
      await expect(taskItems).toHaveCount(3);
      
      // Check each task text
      for (let i = 0; i < tasks.length; i++) {
        await expect(taskItems.nth(i)).toContainText(tasks[i]);
      }
    });
  });

  test.describe('Removing Tasks', () => {
    test('should remove a task', async ({ page }) => {
      const input = page.locator('.agenda-input');
      const addButton = page.locator('.add-button');
      
      // Add two tasks
      await input.fill('Task to keep');
      await addButton.click();
      await page.waitForTimeout(200);
      
      await input.fill('Task to remove');
      await addButton.click();
      await page.waitForTimeout(200);
      
      // Verify both tasks are present
      let taskItems = page.locator('.agenda-item');
      await expect(taskItems).toHaveCount(2);
      
      // Click remove on the second task
      const removeButtons = page.locator('.remove-button');
      await removeButtons.nth(1).click();
      
      // Wait for removal
      await page.waitForTimeout(200);
      
      // Check only one task remains
      taskItems = page.locator('.agenda-item');
      await expect(taskItems).toHaveCount(1);
      await expect(taskItems.first()).toContainText('Task to keep');
    });
  });

  test.describe('Nuke Button', () => {
    test('should appear when tasks exist', async ({ page }) => {
      // Nuke button should not be visible initially
      await expect(page.locator('.nuke-button')).not.toBeVisible();
      
      // Add a task
      await page.locator('.agenda-input').fill('Test task');
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      // Nuke button should now be visible
      await expect(page.locator('.nuke-button')).toBeVisible();
    });

    test('should remove all tasks when clicked', async ({ page }) => {
      // Add some tasks
      for (let i = 0; i < 3; i++) {
        await page.locator('.agenda-input').fill(`Task ${i}`);
        await page.locator('.add-button').click();
        await page.waitForTimeout(200);
      }
      
      // Verify tasks are present
      await expect(page.locator('.agenda-item')).toHaveCount(3);
      
      // Click nuke button
      await page.locator('.nuke-button').click();
      
      // Wait for animation (900ms as in your code)
      await page.waitForTimeout(1000);
      
      // All tasks should be gone
      await expect(page.locator('.agenda-item')).toHaveCount(0);
    });

    test('should add disappearing class when clicked', async ({ page }) => {
      // Add a task first (so nuke button appears)
      await page.locator('.agenda-input').fill('Test');
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      const nukeButton = page.locator('.nuke-button');
      await expect(nukeButton).toBeVisible();
      
      // Click nuke and check for class
      await nukeButton.click();
      await expect(nukeButton).toHaveClass(/disappearing/);
    });
  });

  test.describe('Sort Button', () => {
    test('should appear when multiple tasks exist', async ({ page }) => {
      // Sort button should not be visible initially
      await expect(page.locator('.sort-button')).not.toBeVisible();
      
      // Add first task
      await page.locator('.agenda-input').fill('First');
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      // Sort button should still not be visible
      await expect(page.locator('.sort-button')).not.toBeVisible();
      
      // Add second task
      await page.locator('.agenda-input').fill('Second');
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      // Sort button should now be visible
      await expect(page.locator('.sort-button')).toBeVisible();
    });

    test('should sort tasks alphabetically', async ({ page }) => {
      // Add tasks in unsorted order
      const tasks = ['Banana', 'Apple', 'Carrot'];
      const sortedTasks = ['Apple', 'Banana', 'Carrot'];
      
      for (const task of tasks) {
        await page.locator('.agenda-input').fill(task);
        await page.locator('.add-button').click();
        await page.waitForTimeout(200);
      }
      
      // Verify all tasks are present
      await expect(page.locator('.agenda-item')).toHaveCount(3);
      
      // Click sort button
      await page.locator('.sort-button').click();
      
      // Wait for sort animation (600ms as in your code)
      await page.waitForTimeout(700);
      
      // Check if tasks are sorted
      const taskItems = page.locator('.agenda-item');
      for (let i = 0; i < sortedTasks.length; i++) {
        await expect(taskItems.nth(i)).toContainText(sortedTasks[i]);
      }
    });

    test('should add sorting class when clicked', async ({ page }) => {
      // Add two tasks
      await page.locator('.agenda-input').fill('Banana');
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      await page.locator('.agenda-input').fill('Apple');
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      const agendaList = page.locator('.agenda-list');
      
      // Click sort button
      await page.locator('.sort-button').click();
      
      // Check for sorting class
      await expect(agendaList).toHaveClass(/sorting/);
    });
  });

  test.describe('Animation Classes', () => {
    test('should add exploding class when nuking', async ({ page }) => {
      // Add a task
      await page.locator('.agenda-input').fill('Test');
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      const agendaList = page.locator('.agenda-list');
      
      // Click nuke
      await page.locator('.nuke-button').click();
      
      // Check for exploding class
      await expect(agendaList).toHaveClass(/exploding/);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle long task names', async ({ page }) => {
      const longTask = 'A'.repeat(100);
      
      await page.locator('.agenda-input').fill(longTask);
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      const taskItem = page.locator('.agenda-item').first();
      await expect(taskItem).toBeVisible();
      await expect(taskItem).toContainText(longTask);
    });

    test('should handle special characters', async ({ page }) => {
      const specialTask = '!@#$%^&*()';
      
      await page.locator('.agenda-input').fill(specialTask);
      await page.locator('.add-button').click();
      await page.waitForTimeout(200);
      
      const taskItem = page.locator('.agenda-item').first();
      await expect(taskItem).toBeVisible();
      await expect(taskItem).toContainText(specialTask);
    });
  });
});