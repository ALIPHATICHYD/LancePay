# LancePay 💸

**Instant international payments for Nigerian freelancers — powered by x402 and stablecoins.**

LancePay enables freelancers to receive payments from global clients in minutes, not days, with fees under 1%. Blockchain complexity is completely abstracted — users see invoices, balances, and bank withdrawals, nothing else.

## ✨ Features

- **Invoice Creation** — Generate shareable payment links for clients
- **Instant Settlement** — Payments settle via USDC on Base network in seconds
- **Bank Withdrawals** — Convert to NGN and withdraw to any Nigerian bank
- **Zero Crypto UX** — Users never see wallets, gas fees, or blockchain jargon
- **Embedded Wallets** — Privy-powered wallets created automatically on signup

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4
- **Auth & Wallets:** Privy
- **Database:** Neon (PostgreSQL) + Prisma ORM
- **Blockchain:** Base (L2), Viem, Solana Kit
- **Payments:** x402 Protocol, USDC

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or Neon account)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lancepay.git
cd lancepay

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
├── app/              # Next.js app router pages & API routes
├── components/       # Reusable UI components
├── lib/              # Utilities, configs, and helpers
├── hooks/            # Custom React hooks
├── prisma/           # Database schema and migrations
├── docs/             # Additional documentation
└── public/           # Static assets
```

## 🔧 Environment Variables

```env
DATABASE_URL=          # PostgreSQL connection string
PRIVY_APP_ID=          # Privy application ID
PRIVY_APP_SECRET=      # Privy app secret
NEXT_PUBLIC_PRIVY_APP_ID=  # Privy client-side ID
```

See `.env.example` for the full list.

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma database UI |

## 📖 Documentation

Detailed technical documentation, including system architecture, API reference, and x402 integration guide, is available in [`what-I-am-building.md`](./what-I-am-building.md) and the [`docs/`](./docs/) folder.

## 📄 License

This project is proprietary. All rights reserved.

---

Built with ❤️ for Nigerian freelancers.
