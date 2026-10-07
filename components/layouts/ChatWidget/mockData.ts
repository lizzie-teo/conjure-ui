import type { ReactNode } from 'react'

export interface MockProduct {
  name: string
  subtitle?: string
  price: number
  image?: string
  badge?: string
  badgeVariant?: 'success' | 'warning' | 'error' | 'info' | 'default'
  primaryAction?: string
  secondaryAction?: string
}

export interface MockMessage {
  id?: string
  role: 'user' | 'bot'
  text?: string
  products?: MockProduct[]
  quickReplies?: string[]
  /** Arbitrary rich content rendered below the message bubble (e.g. ComparisonTable, KeyValueList) */
  richContent?: ReactNode
  /** When set, this bot message references the earlier message with this id (triggers glow + SVG line) */
  referencedId?: string
}

export interface MockData {
  botName?: string
  avatar?: string
  messages: MockMessage[]
}

const GROCERY_MOCK: MockData = {
  botName: 'Coles Assistant',
  messages: [
    {
      id: 'msg-1',
      role: 'bot',
      text: 'Hi! What can I help you find today?',
      quickReplies: ['Recipe ideas', 'Reorder last shop', 'Find specials'],
    },
    { id: 'msg-2', role: 'user', text: 'Ingredients for pasta carbonara for 4' },
    {
      id: 'msg-3',
      role: 'bot',
      text: "Here's what I'd add to your cart:",
      products: [
        {
          name: 'Barilla Spaghetti 500g',
          subtitle: 'Pasta · Per 100g $0.50',
          price: 2.50,
          image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=200&fit=crop',
          badge: 'In stock',
          badgeVariant: 'success',
          primaryAction: 'Add to cart',
          secondaryAction: 'Swap',
        },
        {
          name: 'Free Range Eggs 12pk',
          subtitle: 'Eggs · Cage free',
          price: 7.50,
          image: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=400&h=200&fit=crop',
          badge: 'Low stock',
          badgeVariant: 'warning',
          primaryAction: 'Add to cart',
          secondaryAction: 'Swap',
        },
        {
          name: 'Pancetta 150g',
          subtitle: 'Deli · Sliced',
          price: 5.99,
          image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400&h=200&fit=crop',
          badge: 'In stock',
          badgeVariant: 'success',
          primaryAction: 'Add to cart',
          secondaryAction: 'Swap',
        },
      ],
    },
  ],
}

const PHARMACY_MOCK: MockData = {
  botName: 'Chemist Assistant',
  messages: [
    {
      id: 'msg-1',
      role: 'bot',
      text: 'Hi! How can I help you today?',
      quickReplies: ['Find medication', 'Upload eScript', 'Check interactions'],
    },
    { id: 'msg-2', role: 'user', text: "Why can't I add Sudafed to my cart?" },
    {
      id: 'msg-3',
      role: 'bot',
      text: 'Pseudoephedrine products are Schedule 3 in Australia — they require in-store pharmacist approval and cannot be purchased online. Here\'s an alternative I can add for you:',
      products: [
        {
          name: 'Dimetapp Cold & Flu PE',
          subtitle: 'OTC · Available online · 24 tablets',
          price: 14.99,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop',
          badge: 'In stock',
          badgeVariant: 'success',
          primaryAction: 'Add to cart',
          secondaryAction: 'Learn more',
        },
      ],
    },
    {
      id: 'msg-4',
      role: 'bot',
      text: 'Need more help with this?',
      quickReplies: ['Chat with pharmacist', 'Find in-store', 'Upload script'],
    },
  ],
}

export const THREAD_REF_MOCK: MockData = {
  botName: 'AI Assistant',
  messages: [
    {
      id: 'msg-1',
      role: 'bot',
      text: 'Pseudoephedrine (Sudafed) is Schedule 3 — it can only be dispensed with pharmacist supervision in-store.',
    },
    { id: 'msg-2', role: 'user', text: 'Can I get something similar online?' },
    {
      id: 'msg-3',
      role: 'bot',
      text: 'Yes — as I mentioned earlier about the Schedule 3 restriction, products without pseudoephedrine are fully available online. Here are some options.',
      referencedId: 'msg-1',
    },
  ],
}

export const VERTICAL_MOCK: Record<'grocery' | 'pharmacy', MockData> = {
  grocery: GROCERY_MOCK,
  pharmacy: PHARMACY_MOCK,
}
