# ServEase Design System & Guidelines

## Overview

This document outlines the unified design system used across all ServEase web pages. All components, colors, typography, and spacing follow these guidelines to ensure consistency.

---

## Color Palette

### Primary Colors
- **Primary Green**: `#00BF63` - Main brand color for CTAs, highlights, and primary actions
- **Primary Green Hover**: `#00a855` - Used for hover states on primary buttons
- **Primary Dark**: `#008c47` - Used for active/pressed states

### Neutral Colors
- **White**: `#ffffff` - Background and text on dark surfaces
- **Background**: `#ffffff` - Main background color
- **Background Alt**: `#f1f1f1` - Secondary background, cards, sections
- **Gray 900**: `#111827` - Dark backgrounds (Footer)

### Text Colors
- **Text Primary**: `#1a1a1a` - Main body text
- **Text Secondary**: `#666666` - Secondary text, descriptions
- **Text Light**: `#999999` - Tertiary text, help text
- **Text White**: `#ffffff` - Text on dark backgrounds

### Status Colors
- **Error**: `#d4183d` - Error messages, destructive actions
- **Success**: `#00BF63` - Success messages
- **Warning**: `#ff9800` - Warning messages
- **Info**: `#2196f3` - Information

---

## Typography

### Font Families
- **Primary Font**: Poppins (Font weight: 400, 500, 600, 700)
  - Used for: Headings, button text, and prominent content
  - Weights: 400 (normal), 600 (semibold), 700 (bold)

- **Secondary Font**: Inter (Font weight: 400, 500)
  - Used for: Body text, descriptions, footer
  - Weights: 400 (normal), 500 (medium)

### Font Sizes
- **H1 (Hero)**: 48px / 3rem (desktop), 30px / 1.875rem (mobile)
- **H2 (Section)**: 36px / 2.25rem (desktop), 24px / 1.5rem (mobile)
- **H3 (Subsection)**: 24px / 1.5rem (desktop), 20px / 1.25rem (mobile)
- **H4 (Sub-heading)**: 20px / 1.25rem
- **Body Large**: 18px / 1.125rem
- **Body Base**: 16px / 1rem
- **Body Small**: 14px / 0.875rem
- **Body XS**: 12px / 0.75rem

### Line Heights
- **Tight**: 1.2 - For headings
- **Normal**: 1.5 - For body text
- **Relaxed**: 1.75 - For long-form content

---

## Spacing Scale

All spacing follows an 8px base unit for consistency:

- **XS**: 4px
- **SM**: 8px
- **MD**: 12px
- **LG**: 16px
- **XL**: 24px
- **2XL**: 32px
- **3XL**: 48px
- **4XL**: 64px

### Common Layout Spacing
- **Page Padding**: 24px (mobile), 64px (desktop)
- **Section Spacing**: 64px (mobile padding), 96px (desktop padding)
- **Component Gap**: 16-24px for flex/grid items
- **Card Padding**: 24px (small), 32px (large)

---

## Border Radius

Consistent rounded corners create visual harmony:

- **SM**: 4px - Small form inputs, badges
- **MD**: 8px - Medium components
- **LG**: 12px - Standard cards, buttons
- **XL**: 16px - Large cards, modals
- **2XL**: 20px - Extra large containers
- **3XL**: 24px - Premium containers
- **FULL**: 9999px - Circular elements, pill buttons

---

## Shadows

Three levels of elevation for depth:

- **SM**: `0 1px 2px rgba(0, 0, 0, 0.05)` - Subtle elevation
- **MD**: `0 4px 6px rgba(0, 0, 0, 0.1)` - Standard elevation
- **LG**: `0 10px 15px rgba(0, 0, 0, 0.1)` - Prominent elevation
- **XL**: `0 20px 25px rgba(0, 0, 0, 0.15)` - Maximum elevation

---

## Button Styles

### Primary Button
```
Background: #00BF63
Text Color: White
Padding: 12px 16px (small), 16px 24px (medium), 16px 32px (large)
Border Radius: 12px
Hover: Background #00a855
Focus: Ring 2px #00BF63 with 20% opacity
```

### Secondary Button
```
Background: #f1f1f1
Text Color: #1a1a1a
Padding: Same as primary
Border Radius: 12px
Hover: Background #e5e5e5
```

### Outline Button
```
Border: 2px solid #00BF63
Text Color: #00BF63
Background: Transparent
Padding: Same as primary
Hover: Background #00BF63 with 5% opacity
```

### Ghost Button
```
Background: Transparent
Text Color: #00BF63
Border: None
Hover: Background #00BF63 with 5% opacity
```

---

## Form Inputs

### Input Field
```
Border: 1px solid #e0e0e0
Background: White
Padding: 12px 16px
Border Radius: 12px
Font Size: 14px
Focus: Border #00BF63, Ring 2px #00BF63 with 20% opacity
Error: Border #d4183d, Ring #d4183d with 20% opacity
Placeholder Color: #999999
```

### Label
```
Font Family: Poppins
Font Size: 14px
Font Weight: 500
Color: #1a1a1a
Margin Bottom: 8px
```

### Error Message
```
Font Family: Poppins
Font Size: 12px
Color: #d4183d
Margin Top: 4px
```

---

## Card Components

### Standard Card
```
Background: White
Border: 1px solid #e0e0e0
Border Radius: 24px
Padding: 32px
Shadow: MD
Hover: Shadow LG (optional lift effect)
```

### Alt Card (on light background)
```
Background: #f1f1f1
Border Radius: 24px
Padding: 32px
No border
```

---

## Section Layouts

### Hero Section
```
Background: Primary Color (#00BF63)
Text Color: White
Padding: 32px (mobile), 96px (desktop)
Min Height: Auto (home), controlled by content
Pattern Overlay: 30% opacity mix-blend-overlay
```

### Content Section
```
Background: White or Alt (#f1f1f1)
Padding: 64px horizontal, 64-96px vertical
Max Width: 1280px (max-w-7xl)
```

### Feature Section
```
Display: Grid 1-3 columns based on breakpoint
Gap: 32px
Card Layout: 3 columns on desktop, 1 on mobile
```

---

## Breakpoints & Responsive Design

- **Mobile**: < 768px (up to 767px)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Common Responsive Classes
- `hidden md:flex` - Hide on mobile, show on tablet+
- `flex flex-col md:flex-row` - Column on mobile, row on desktop
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - Responsive grid
- `text-2xl md:text-4xl` - Responsive text sizes
- `px-6 md:px-16` - Responsive padding

---

## Navigation & Header

### Navbar
```
Height: 60px
Background: Primary Green (#00BF63)
Shadow: MD
Logo Height: 40px
Nav Links: Poppins 16px, spacing 32px
Mobile Menu: Full width, black background with overlay
```

### Footer
```
Background: Gray 900 (#111827)
Text Color: Text Light (#999999)
Padding: 64px horizontal, 64px vertical
Link Colors: Gray 400, hover Primary Green
Social Icons: 40x40px, gray background, hover Primary Green
```

---

## Transitions & Animations

All transitions use consistent timing:

- **Fast**: 150ms ease-in-out - Quick hover states
- **Normal**: 300ms ease-in-out - Standard interactions
- **Slow**: 500ms ease-in-out - Important state changes

### Common Transitions
- Color changes: `transition-colors duration-300`
- Transform: `transition-transform duration-300` (hover lift, scale)
- All properties: `transition-all duration-300`
- Background: `transition-all duration-300`

---

## Accessibility Guidelines

### Color Contrast
- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text (18px+)
- Primary color #00BF63 on white: ~5:1 ratio ✓

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-[#00BF63]
focus:ring-offset-2
```

### ARIA Labels
- Use `aria-labels` on icon-only buttons
- Use `aria-current="page"` on active nav links
- Use `aria-expanded` for expandable sections
- Use `aria-describedby` for form errors

### Semantic HTML
- Use `<button>` for clickable elements
- Use `<nav>` for navigation
- Use `<section>` for content sections
- Use `<footer>` for footer
- Use `<form>` for forms

---

## Component Usage Examples

### Using the Design System

```typescript
// Import design tokens
import { DESIGN, CSS_CLASSES } from "../constants/design";

// Applied in JSX
<div className={CSS_CLASSES.container}>
  <h2 className={CSS_CLASSES.heading2}>Section Title</h2>
  <p className={CSS_CLASSES.bodyBase}>Paragraph text</p>
  
  <button className={`${CSS_CLASSES.buttonBase} bg-[${DESIGN.colors.primary}]`}>
    Click Me
  </button>
</div>
```

### Form Example

```typescript
<FormInput
  label="Email"
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

### Button Variants

```typescript
<BaseButton variant="primary" size="md">Primary</BaseButton>
<BaseButton variant="secondary" size="md">Secondary</BaseButton>
<BaseButton variant="outline" size="md">Outline</BaseButton>
<BaseButton variant="ghost" size="md">Ghost</BaseButton>
```

---

## Common Patterns

### Hero Section with Image
```typescript
<section className={`bg-[${DESIGN.colors.primary}]`}>
  <div className="flex flex-col md:flex-row items-center">
    <div className="flex-1">
      <h1>Title</h1>
      <p>Description</p>
    </div>
    <div className="flex-1">
      <img alt="" src="" className="rounded-2xl shadow-lg" />
    </div>
  </div>
</section>
```

### Feature Cards Grid
```typescript
<div className={CSS_CLASSES.gridCols3}>
  {items.map((item) => (
    <div key={item.id} className={CSS_CLASSES.cardBase}>
      {/* Content */}
    </div>
  ))}
</div>
```

### Contact Form
```typescript
<form onSubmit={handleSubmit} className="space-y-6">
  <FormInput label="Name" required  />
  <FormTextarea label="Message" required />
  <BaseButton type="submit" variant="primary">Submit</BaseButton>
</form>
```

---

## Building New Pages

1. **Start with SectionHeading** for consistent section titles
2. **Use BaseButton** for all buttons
3. **Use FormInput/FormTextarea** for all form fields
4. **Import DESIGN and CSS_CLASSES** for consistent spacing and colors
5. **Follow responsive patterns** for mobile/tablet/desktop
6. **Use the color palette** - avoid hardcoded hex values
7. **Apply shadows and transitions** for depth and interactivity
8. **Test accessibility** - focus states, contrast, ARIA labels

---

## Migration Checklist for Old Code

- [ ] Replace hardcoded color `#00BF63` with `DESIGN.colors.primary`
- [ ] Replace hardcoded padding with `CSS_CLASSES` constants
- [ ] Use `BaseButton` instead of custom `<button>` elements
- [ ] Use `FormInput` instead of custom `<input>` elements
- [ ] Use `SectionHeading` for all section titles
- [ ] Update font declarations to use standard families
- [ ] Add focus/hover states to all interactive elements
- [ ] Add proper ARIA labels and descriptions
- [ ] Use responsive classes for consistent breakpoints
- [ ] Test on mobile, tablet, and desktop

---

## Version History

- **v1.0** (Current) - Initial unified design system
  - Comprehensive color palette
  - Typography system
  - Reusable component library
  - Accessibility guidelines
  - Responsive patterns

---

## Contact & Support

For questions about the design system or to suggest improvements, reach out to the development team.
