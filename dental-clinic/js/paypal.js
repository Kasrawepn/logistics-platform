/* PayPal checkout.
 * The client ID is served by the dev server from PAYPAL_CLIENT_ID
 * (see /config.js). Without it the booking view offers a clearly marked
 * test payment so the flow stays usable.
 */

export function paypalClientId() {
  return String(window.PAYPAL_CLIENT_ID || '').trim();
}

export function paypalConfigured() {
  return paypalClientId().length > 0;
}

let sdkPromise = null;

function loadSdk() {
  if (window.paypal) return Promise.resolve(window.paypal);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById('paypal-sdk');
    const script = existing || document.createElement('script');
    const params = new URLSearchParams({
      'client-id': paypalClientId(),
      currency: 'EUR',
      intent: 'capture',
      components: 'buttons',
    });

    script.id = 'paypal-sdk';
    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
    script.async = true;
    script.onload = () => {
      if (window.paypal) resolve(window.paypal);
      else reject(new Error('PayPal SDK could not be initialised'));
    };
    script.onerror = () => {
      sdkPromise = null;
      reject(new Error('PayPal SDK failed to load'));
    };

    if (!existing) document.head.appendChild(script);
  });

  return sdkPromise;
}

export async function renderPaypalButtons(container, { amount, currency, description, onApproved, onFailed }) {
  const paypal = await loadSdk();
  container.innerHTML = '';

  const buttons = paypal.Buttons({
    style: { layout: 'vertical', shape: 'pill', color: 'gold', label: 'paypal', height: 48 },
    createOrder: (_data, actions) =>
      actions.order.create({
        purchase_units: [
          {
            description,
            amount: { value: Number(amount).toFixed(2), currency_code: currency },
          },
        ],
      }),
    onApprove: async (_data, actions) => {
      const order = await actions.order.capture();
      onApproved({ id: order.id, status: order.status });
    },
    onError: (error) => onFailed(error),
  });

  await buttons.render(container);
  return buttons;
}
