import { test, expect } from '@playwright/test';
import { checkoutPage } from '../../../pages/checkout';

test('Navigate to bitstarz and sign up', async ({ page }) => {
  const checkout = new checkoutPage(page)

  await checkout.navigateToBitStarz();
 
  await checkout.signUp();

});