# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Architecture

This is a Next.js 16.2.4 frontend for a cat hotel booking system with React 19.2.4, TypeScript, and Tailwind CSS v4.

### Project Structure

- `app/page.tsx` - Main booking page displaying available rooms with Stripe checkout
- `app/success/page.tsx` - Payment success confirmation page
- `app/layout.tsx` - Root layout with Geist font configuration

### Backend Integration

The frontend connects to a Go backend API running on `localhost:8080`:

**GET `/api/rooms`** - Fetches available rooms with id, name, description, and price

**POST `/api/create-checkout-session`** - Creates Stripe checkout session
- Body: `{ customer_name, cat_name, room_id }`
- Response: `{ url }` - Stripe checkout URL

**GET `/api/success?session_id={session_id}`** - Confirms booking after successful payment

### Payment Flow

1. User selects room and enters customer/cat names
2. Frontend calls `/api/create-checkout-session` with booking details
3. User redirects to Stripe for payment
4. After payment, Stripe redirects to `/success?session_id=xxx`
5. Success page notifies backend via `/api/success` endpoint

## Important Notes

@AGENTS.md

This Next.js version (16.2.4) has breaking changes. Read relevant guides in `node_modules/next/dist/docs/` before writing code and heed deprecation notices.

The UI uses Thai language. When adding new features, maintain consistent Thai language usage for user-facing text.
