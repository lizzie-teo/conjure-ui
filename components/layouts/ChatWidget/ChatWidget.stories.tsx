import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ChatWidget } from './ChatWidget'
import { THREAD_REF_MOCK } from './mockData'
import { CompareTable } from '../../core/CompareTable/CompareTable'
import { DetailList } from '../../core/DetailList/DetailList'
import { RecipeCard } from '../../core/BundleCard/bindings'

const meta = {
  title: 'Layouts/ChatWidget',
  component: ChatWidget,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[380px] md:w-[420px] h-[600px]">
        <Story />
      </div>
    ),
  ],
  args: { vertical: 'grocery' },
} satisfies Meta<typeof ChatWidget>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MobileFullscreen: Story = {
  name: 'Mobile fullscreen',
  args: { vertical: 'grocery', className: 'rounded-none border-0 shadow-none' },
  decorators: [
    (Story) => (
      <div className="h-dvh w-full">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const Grocery: Story = {
  name: 'Grocery (Coles)',
  args: { vertical: 'grocery' },
}

export const Pharmacy: Story = {
  name: 'Pharmacy (Chemist)',
  args: { vertical: 'pharmacy' },
}

export const ThreadReferenceGlow: Story = {
  name: 'Thread reference glow (ambient)',
  args: { mockData: THREAD_REF_MOCK },
}

export const RichContentCompareTable: Story = {
  name: 'Rich content — CompareTable (insurance)',
  args: {
    mockData: {
      botName: 'Insurance Assistant',
      messages: [
        {
          role: 'user',
          text: 'Should I get Comprehensive or Third Party for my 2019 Mazda 3?',
        },
        {
          role: 'bot',
          text: "Based on your car's value, Comprehensive saves you money in most claim scenarios. Here's the breakdown:",
          richContent: (
            <CompareTable
              columns={[
                {
                  id: 'comp',
                  label: 'Comprehensive',
                  price: 980,
                  currency: 'AUD',
                  attributes: {
                    excess: '$695',
                    theft: true,
                    flood: true,
                    hail: true,
                    thirdPartyDamage: true,
                  },
                },
                {
                  id: 'tpp',
                  label: 'Third Party',
                  price: 420,
                  currency: 'AUD',
                  attributes: {
                    excess: '$500',
                    theft: false,
                    flood: false,
                    hail: false,
                    thirdPartyDamage: true,
                  },
                },
              ]}
              attributeLabels={{
                excess: 'Excess',
                theft: 'Theft cover',
                flood: 'Flood damage',
                hail: 'Hail damage',
                thirdPartyDamage: "Other people's cars",
              }}
            />
          ),
          quickReplies: ['Get a quote', 'See full policy details', 'Ask something else'],
        },
      ],
    },
  },
}

export const RichContentDetailList: Story = {
  name: 'Rich content — DetailList (recipe ingredients)',
  args: {
    mockData: {
      botName: 'Recipe Assistant',
      messages: [
        { role: 'user', text: 'What do I need for pasta carbonara for 4?' },
        {
          role: 'bot',
          text: 'Here are the ingredients:',
          richContent: (
            <div className="rounded-[var(--radius)] border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
              <DetailList>
                <DetailList.Row label="Spaghetti" value="400 g" />
                <DetailList.Row label="Pancetta or guanciale" value="200 g" />
                <DetailList.Row label="Eggs (whole)" value="2" />
                <DetailList.Row label="Egg yolks" value="4" />
                <DetailList.Row label="Pecorino Romano, grated" value="80 g" />
                <DetailList.Row label="Parmesan, grated" value="40 g" />
                <DetailList.Row label="Black pepper, freshly ground" value="to taste" />
                <DetailList.Row label="Salt (pasta water)" value="generous pinch" />
              </DetailList>
            </div>
          ),
          quickReplies: ['Add all to cart', 'Show steps', 'Adjust servings'],
        },
      ],
    },
  },
}

export const RichContentRecipeCard: Story = {
  name: 'Rich content — RecipeCard (grocery)',
  decorators: [
    (Story) => (
      <div className="w-[380px] md:w-[420px] h-[780px]">
        <Story />
      </div>
    ),
  ],
  args: {
    mockData: {
      botName: 'Coles Assistant',
      messages: [
        { role: 'user', text: 'Ingredients for pasta carbonara for 4?' },
        {
          role: 'bot',
          text: "Here's the recipe. Tap ingredients to deselect any you already have, then add the rest to your cart:",
          richContent: (
            <RecipeCard
              recipe={{
                id: 'carbonara',
                name: 'Pasta Carbonara',
                prepTime: '25 min',
                difficulty: 'easy',
                defaultServings: 4,
                image:
                  'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=400&fit=crop',
                imageAlt: 'Pasta carbonara in a bowl',
                ingredients: [
                  { id: 'pasta', name: 'Spaghetti', quantity: 100, unit: 'g' },
                  { id: 'pancetta', name: 'Pancetta', quantity: 50, unit: 'g' },
                  { id: 'eggs', name: 'Eggs (whole)', quantity: 1, unit: 'whole' },
                  { id: 'yolks', name: 'Egg yolks', quantity: 1, unit: 'whole' },
                  { id: 'pecorino', name: 'Pecorino Romano, grated', quantity: 20, unit: 'g' },
                  { id: 'parmesan', name: 'Parmesan, grated', quantity: 10, unit: 'g' },
                ],
              }}
            />
          ),
        },
      ],
    },
  },
}

export const CustomMockData: Story = {
  name: 'Custom mock data',
  args: {
    mockData: {
      botName: 'Brand Assistant',
      messages: [
        {
          role: 'bot',
          text: 'Hi! Swap out this mockData with your own content.',
          quickReplies: ['Option A', 'Option B', 'Option C'],
        },
        { role: 'user', text: 'Option A' },
        {
          role: 'bot',
          text: 'Great choice. Here are some products:',
          products: [
            {
              name: 'Your Product Name',
              subtitle: 'Category · Details',
              price: 29.99,
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop',
              badge: 'In stock',
              badgeVariant: 'success',
              primaryAction: 'Add to cart',
              secondaryAction: 'View',
            },
          ],
        },
      ],
    },
  },
}
