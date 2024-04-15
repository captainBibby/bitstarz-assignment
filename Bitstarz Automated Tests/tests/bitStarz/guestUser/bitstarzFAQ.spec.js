
import { test, expect } from '@playwright/test';
import { checkoutPage } from '../../../pages/checkout';

test('Navigate to bitstarz, sign up and search for a Game', async ({ page }) => {
  const checkout = new checkoutPage(page)

  await checkout.FAQ();
});