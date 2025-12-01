import { createCustomer, createCheckoutSession} from '../src/utils/paiement';
import assert from 'assert';





describe('Paiement test ', () => {

it('creates a customer and a checkout session', async () => {
    const email = "test@example.com";
    const userId = 1;

    const customer = await createCustomer(email);
    assert(customer.id, "Customer should have an ID");

    const session = await createCheckoutSession(customer.id, userId);
    assert(session.url, "Session should have a URL");

    console.log("Checkout session URL:", session.url);
  });
});
