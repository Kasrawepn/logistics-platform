/* PayPal client ID.
 *
 * In the sandbox this file is served by dev-server.mjs, which injects the value
 * of the PAYPAL_CLIENT_ID environment variable (delivered outside the repo).
 * Keep the fallback empty: without a client ID the booking view offers a
 * clearly marked test payment instead of pretending to charge.
 */
window.PAYPAL_CLIENT_ID = '';
