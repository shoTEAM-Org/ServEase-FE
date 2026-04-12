# ServEase Development Best Practices

## Quick Start for New Pages

### 1. Import Required Items
```typescript
import { CSS_CLASSES, DESIGN, mergeClasses } from "../constants/design";
import { BaseButton } from "./BaseButton";
import { FormInput, FormTextarea } from "./FormInput";
import { SectionHeading } from "./SectionHeading";
```

### 2. Hero Section Template
```typescript
<section className={`bg-[${DESIGN.colors.primary}] ${CSS_CLASSES.paddingSection}`}>
  <div className={CSS_CLASSES.containerMd}>
    <SectionHeading
      title="Page Title"
      subtitle="Descriptive subtitle"
      align="center"
      color="text-white"
    />
  </div>
</section>
```

### 3. Content Section Template
```typescript
<section className={`bg-white ${CSS_CLASSES.paddingSection}`}>
  <div className={CSS_CLASSES.container}>
    <SectionHeading
      title="Section Title"
      subtitle="Optional subtitle"
      align="center"
      color="text-gray-900"
    />
    
    {/* Your content here */}
  </div>
</section>
```

### 4. Feature Grid Template
```typescript
<div className={CSS_CLASSES.gridCols3}>
  {items.map((item) => (
    <div key={item.id} className={`${CSS_CLASSES.cardBase} bg-white ${CSS_CLASSES.cardShadow}`}>
      <h3 className={CSS_CLASSES.heading4}>{item.title}</h3>
      <p className={CSS_CLASSES.bodyBase}>{item.description}</p>
    </div>
  ))}
</div>
```

---

## Do's and Don'ts

### ❌ DON'T:
```typescript
// ❌ Don't hardcode colors
className="text-[#00BF63] bg-[#f1f1f1]"

// ❌ Don't use magic numbers for spacing
<div className="p-8 gap-6">

// ❌ Don't create custom button styles
<button className="px-6 py-3 bg-green-500 hover:bg-green-600 ...">

// ❌ Don't forget accessibility
<button onClick={handleClick}>✕</button>

// ❌ Don't mix font families
<h1 style={{ fontFamily: "Poppins" }}>

// ❌ Don't duplicate validation logic
const [errors, setErrors] = useState({})
// ... repeat in every form
```

### ✅ DO:
```typescript
// ✅ Use design tokens
style={{ color: DESIGN.colors.primary, backgroundColor: DESIGN.colors.backgroundAlt }}

// ✅ Use spacing constants
<div className={`p-${DESIGN.spacing.lg} gap-${DESIGN.spacing.lg}`}>

// ✅ Use BaseButton
<BaseButton variant="primary" size="md">Click me</BaseButton>

// ✅ Add accessibility
<button onClick={handleClick} aria-label="Close dialog">✕</button>

// ✅ Use Poppins/Inter through classes
className="font-['Poppins',sans-serif]"

// ✅ Use useFormValidation hook
const form = useFormValidation(initialValues, rules);
```

---

## Common Patterns

### Form with Validation
```typescript
import { useState } from "react";
import { FormInput, FormTextarea } from "./FormInput";
import { BaseButton } from "./BaseButton";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email";
    if (!form.message.trim()) newErrors.message = "Required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      // Handle submission
      setTimeout(() => setSubmitted(false), 3000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
        required
      />
      <FormInput
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        required
      />
      <FormTextarea
        label="Message"
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        error={errors.message}
        required
      />
      <BaseButton type="submit" variant="primary" fullWidth>
        Send Message
      </BaseButton>
      {submitted && <p className="text-green-600">✓ Message sent!</p>}
    </form>
  );
};
```

### Feature Cards Grid
```typescript
const features = [
  { icon: ShieldCheck, title: "Verified", desc: "All providers are verified" },
  { icon: CalendarCheck, title: "Easy Booking", desc: "Book in seconds" },
  { icon: Star, title: "Trusted", desc: "Real reviews from real users" },
];

<div className={CSS_CLASSES.gridCols3}>
  {features.map((feature) => (
    <div key={feature.title} className={`${CSS_CLASSES.cardBase} bg-white ${CSS_CLASSES.cardShadow}`}>
      <div style={{ backgroundColor: `${DESIGN.colors.primary}20` }} className="w-16 h-16 rounded-xl flex items-center justify-center mb-4">
        <feature.icon size={32} style={{ color: DESIGN.colors.primary }} />
      </div>
      <h3 className={CSS_CLASSES.heading4}>{feature.title}</h3>
      <p className={CSS_CLASSES.bodyBase}>{feature.desc}</p>
    </div>
  ))}
</div>
```

### Responsive Image Section
```typescript
<section className={`bg-white ${CSS_CLASSES.paddingSection}`}>
  <div className={`${CSS_CLASSES.container} flex flex-col md:flex-row items-center gap-12`}>
    <div className="flex-1">
      <h2 className={CSS_CLASSES.heading2}>Title</h2>
      <p className={CSS_CLASSES.bodyBase}>Description</p>
    </div>
    <div className="flex-1">
      <ImageWithFallback src="/image.png" alt="Alt text" className="rounded-2xl shadow-lg" />
    </div>
  </div>
</section>
```

---

## Styling Checklist

When styling a new component, ensure:

- [ ] Colors come from DESIGN.colors constants
- [ ] Spacing uses CSS_CLASSES or DESIGN.spacing
- [ ] Border radius uses DESIGN.radius
- [ ] Shadows use DESIGN.shadows
- [ ] Typography follows Poppins/Inter pattern
- [ ] Responsive behavior uses Tailwind breakpoints (sm, md, lg, xl)
- [ ] Focus states are applied to interactive elements
- [ ] ARIA labels on buttons/links that need them
- [ ] Hover states provide visual feedback
- [ ] Mobile-first approach (mobile styles first, then md: for desktop)

---

## Component APIs Quick Reference

### BaseButton
```typescript
<BaseButton
  variant="primary"        // 'primary' | 'secondary' | 'outline' | 'ghost'
  size="md"               // 'sm' | 'md' | 'lg'
  icon={<Icon />}         // optional icon component
  iconPosition="left"     // 'left' | 'right'
  fullWidth={false}       // boolean
  loading={false}         // shows spinner
  disabled={false}        // disables button
  onClick={handleClick}
>
  Button Text
</BaseButton>
```

### FormInput
```typescript
<FormInput
  label="Email"           // optional label
  type="email"            // HTML input type
  placeholder="..."       // placeholder text
  value={value}           // controlled input value
  onChange={handleChange} // change handler
  error="Error message"   // error text (shows if non-empty)
  helper="Help text"      // helper text below input
  icon={<Icon />}         // optional icon
  iconPosition="left"     // 'left' | 'right'
  required={false}        // shows * on label
/>
```

### FormTextarea
```typescript
<FormTextarea
  label="Message"
  placeholder="..."
  rows={5}                // number of rows
  value={value}
  onChange={handleChange}
  error="Error message"
  helper="Help text"
  required={false}
/>
```

### SectionHeading
```typescript
<SectionHeading
  title="Main Title"      // required
  subtitle="Subtitle"     // optional
  align="center"          // 'left' | 'center' | 'right'
  color="text-white"      // 'text-white' | 'text-gray-900' | 'text-gray-700'
  maxWidth="max-w-2xl"    // max width container
/>
```

---

## Common Issues & Solutions

### Issue: Colors look different
**Solution**: Use DESIGN.colors instead of hardcoded hex or color names

### Issue: Spacing is inconsistent
**Solution**: Use CSS_CLASSES spacing constants or DESIGN.spacing values

### Issue: Button styles don't match
**Solution**: Use BaseButton with correct variant and size props

### Issue: Form validation not working
**Solution**: Ensure state updates trigger re-render and error props are passed

### Issue: Mobile layout breaks
**Solution**: Use responsive Tailwind classes (md:, lg: breakpoints)

### Issue: Component not accessible
**Solution**: Add aria-labels to buttons, aria-describedby to form errors

---

## Performance Optimization Tips

1. **Use CSS classes over inline styles**
   ```typescript
   // ❌ Slower
   style={{ color: DESIGN.colors.primary }}
   
   // ✅ Faster
   className="text-[#00BF63]"
   ```

2. **Memoize expensive components**
   ```typescript
   const MemoizedCard = memo(({ item }) => (
     <div>{item.title}</div>
   ));
   ```

3. **Use lazy loading for images**
   ```typescript
   <img loading="lazy" src="" alt="" />
   ```

4. **Avoid unnecessary re-renders**
   ```typescript
   const MemoizedList = memo(MyList);
   ```

---

## Git Commit Message Format

```
type(component): short description

- Detailed explanation of changes
- Use design system components
- Update related documentation

Related: issue-number
```

Example:
```
feat(contact-form): add validation and error handling

- Added form validation with error messages
- Replaced custom inputs with FormInput component
- Updated styling to use design system
- Added success notification

Related: #42
```

---

## Testing Guidelines

Before submitting code:

1. ✅ Component renders without errors
2. ✅ Responsive on mobile, tablet, desktop
3. ✅ Form validation works correctly
4. ✅ All interactive elements have focus states
5. ✅ ARIA labels present where needed
6. ✅ Colors meet accessibility standards
7. ✅ Build succeeds: `npm run build`
8. ✅ Dev server works: `npm run dev`

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server on port 5177

# Production
npm run build            # Build for production

# Code Quality
npm run lint             # Check code quality (if configured)

# Testing
npm run test             # Run tests (if configured)
```

---

## Resources

- [DESIGN_GUIDE.md](DESIGN_GUIDE.md) - Complete design system
- [IMPROVEMENTS.md](IMPROVEMENTS.md) - What was improved
- Component files - See JSDoc comments for detailed APIs
- Tailwind CSS docs - For any utility class questions

---

**Last Updated**: March 6, 2026
**Version**: 1.0
