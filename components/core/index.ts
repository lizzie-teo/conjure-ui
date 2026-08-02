export { MessageBubble } from './MessageBubble/MessageBubble'
export type { MessageBubbleProps } from './MessageBubble/MessageBubble'

export { TypingIndicator } from './TypingIndicator/TypingIndicator'
export type { TypingIndicatorProps } from './TypingIndicator/TypingIndicator'

export { ChatInput } from './ChatInput/ChatInput'
export type { ChatInputProps } from './ChatInput/ChatInput'

export { QuickReplies } from './QuickReplies/QuickReplies'
export type { QuickRepliesProps } from './QuickReplies/QuickReplies'

export { MediaCard } from './MediaCard/MediaCard'
export type { MediaCardProps } from './MediaCard/MediaCard'

export { DetailList } from './DetailList/DetailList'
export type { DetailListProps, RowProps } from './DetailList/DetailList'

export { ActionStrip } from './ActionStrip/ActionStrip'
export type { ActionStripProps } from './ActionStrip/ActionStrip'

export { SummaryPanel } from './SummaryPanel/SummaryPanel'
export type { SummaryPanelProps } from './SummaryPanel/SummaryPanel'

export { SelectionGroup } from './SelectionGroup/SelectionGroup'
export type { SelectionGroupProps } from './SelectionGroup/SelectionGroup'

export { CardStrip } from './CardStrip/CardStrip'
export type { CardStripProps } from './CardStrip/CardStrip'

export { CardStack } from './CardStack/CardStack'
export type { CardStackProps } from './CardStack/CardStack'

export { ChipToCard } from './ChipToCard/ChipToCard'
export type { ChipToCardProps } from './ChipToCard/ChipToCard'

export { CartItem } from './CartItem/CartItem'
export type { CartItemProps } from './CartItem/CartItem'

export { CartSummary } from './CartSummary/CartSummary'
export type { CartSummaryProps } from './CartSummary/CartSummary'

export { OrderReview } from './OrderReview/OrderReview'
export type { OrderReviewProps } from './OrderReview/OrderReview'

export { AuthPrompt } from './AuthPrompt/AuthPrompt'
export type { AuthPromptProps } from './AuthPrompt/AuthPrompt'

export { AuthStatus } from './AuthStatus/AuthStatus'
export type { AuthStatusProps } from './AuthStatus/AuthStatus'

export { PaymentConfirmSheet } from './PaymentConfirmSheet/PaymentConfirmSheet'
export type { PaymentConfirmSheetProps, SummaryRow } from './PaymentConfirmSheet/PaymentConfirmSheet'

export { PaymentSuccess } from './PaymentSuccess/PaymentSuccess'
export type { PaymentSuccessProps, PaymentSuccessRow } from './PaymentSuccess/PaymentSuccess'

export { ApplePaySheet } from './ApplePaySheet/ApplePaySheet'
export type { ApplePaySheetProps, ApplePayCard, ApplePayContact, ApplePayShipping } from './ApplePaySheet/ApplePaySheet'

export { OrderStatusCard } from './OrderStatusCard/OrderStatusCard'
export type { OrderStatusCardProps, OrderStatusStep } from './OrderStatusCard/OrderStatusCard'

export { ReceiptSummary } from './ReceiptSummary/ReceiptSummary'
export type { ReceiptSummaryProps, ReceiptItem } from './ReceiptSummary/ReceiptSummary'

export { CompareTable } from './CompareTable/CompareTable'
export type { CompareTableProps, CompareColumn } from './CompareTable/CompareTable'

export { BundleCard } from './BundleCard/BundleCard'
export type {
  BundleCardProps,
  BundleItem,
  BundleAlternative,
  BundleBadge,
  BundleBadgeVariant,
  BundleAction,
  BundleActionContext,
  BundleMultiplier,
} from './BundleCard/BundleCard'

export {
  MediaSingle,
  MediaSwatchStrip,
  MediaCollage,
  MediaCarousel,
} from './BundleCard/media'
export type {
  MediaFrame,
  MediaSingleProps,
  MediaSwatchStripProps,
  MediaCollageProps,
  MediaCarouselProps,
} from './BundleCard/media'

// Domain bindings — vocabulary and formatting live here, never inside BundleCard.
export { RecipeCard, bindRecipe, LookCard, bindLook, ShopList, bindShopList } from './BundleCard/bindings'
export type {
  RecipeCardProps,
  RecipeCardHandlers,
  Recipe,
  RecipeIngredient,
  ScaledRecipeIngredient,
  RecipeDifficulty,
  LookCardProps,
  LookCardHandlers,
  Look,
  LookProduct,
  LookOccasion,
  LookFormat,
  LookProductType,
  ShopListProps,
  ShopListHandlers,
  ShopLine,
  ShopProduct,
  ResolvedShopLine,
} from './BundleCard/bindings'

export { SlotPicker } from './SlotPicker/SlotPicker'
export type {
  SlotPickerProps,
  SlotPickerLabels,
  PickableDate,
  PickableSlot,
  TimeOfDay,
  AvailabilityLevel,
} from './SlotPicker/SlotPicker'

