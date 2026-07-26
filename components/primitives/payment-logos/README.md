# Payment Logos

SVG files are **not bundled** with this library. Download official brand assets from each
network's brand portal and place them in your app's `public/payment-logos/` directory.

## Required logos

| File path | Source |
|-----------|--------|
| `public/payment-logos/wallets/apple-pay.svg` | [Apple Pay Identity Guidelines](https://developer.apple.com/apple-pay/marketing/) |
| `public/payment-logos/wallets/google-pay.svg` | [Google Pay Brand Guidelines](https://developers.google.com/pay/api/web/guides/brand-guidelines) |
| `public/payment-logos/cards/mastercard.svg` | [Mastercard Brand Center](https://brand.mastercard.com) |
| `public/payment-logos/apm/paypal.svg` | [PayPal Logo Downloads](https://www.paypalobjects.com/webstatic/en_US/logo/pp-logo-100px.png) — see PayPal Brand Guidelines |
| `public/payment-logos/apm/alipay.svg` | [Alipay Brand Resources](https://global.alipay.com/platform/site/ihome) |

## Usage

```tsx
import { PaymentLogo } from '@lizzie-teo/conjure-ui'

<PaymentLogo src="/payment-logos/wallets/apple-pay.svg" alt="Apple Pay" size="md" />
```

Assets sourced from official brand portals are covered by each network's merchant/developer
brand licence. Do not redistribute the SVG files themselves.
