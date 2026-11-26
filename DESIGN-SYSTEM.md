# BISMILLAH COMPUTER — Design System

## Brand direction
A premium, calm, trustworthy local digital service and computer training center. Bangla-first content, with English labels only where they improve recognition.

## Color tokens
| Token | Value | Use |
|---|---|---|
| `--deep` | `#08283b` | Deep backgrounds, strong headings |
| `--brand` | `#087f6b` | Primary actions and links |
| `--brand-strong` | `#066b5a` | Hover and pressed primary actions |
| `--brand2` | `#10a889` | Secondary brand accent |
| `--pale` | `#edf8f3` | Soft green section backgrounds |
| `--surface` | `#ffffff` | Cards and navigation |
| `--page` | `#fbfdfc` | Main page background |
| `--ink` | `#102b3b` | Main text |
| `--muted` | `#637987` | Supporting text |
| `--line` | `#dce9e5` | Borders and separators |
| `--focus` | `#e5ad43` | Keyboard focus indicator |

## Typography
- Bangla: Hind Siliguri.
- English fallback: Arial / Helvetica / sans-serif.
- Headings: bold, compact line-height, deep navy-green ink.
- Body: comfortable line-height and high readability.

## Layout and components
- Content container: fluid width with a desktop maximum around 1180px.
- Cards: white surface, subtle border, rounded corners and restrained shadows.
- Buttons: solid brand green primary, white/light secondary, visible focus ring.
- Navigation: sticky header, clear active state, keyboard-visible focus.
- Responsive breakpoints currently centered around 900px, 720px and 480px.
- Motion: short transitions; respect `prefers-reduced-motion`.

## Design constraints
- Use consistent inline SVG icons instead of emoji in the page content.
- Avoid fabricated service fees, testimonials, statistics, course durations, certificates or government affiliation.
- Clearly identify the business as a private assistance center, not a government office.
- Keep the site plain HTML, CSS and JavaScript, Netlify-compatible and free of paid dependencies.

## Implementation status
Phase 2 establishes shared CSS tokens and documents the visual language. Page-by-page component and content changes belong to Phase 3 and are not part of this design-system-only change.
