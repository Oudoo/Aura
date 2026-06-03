# Agent Handoff Document

**To the Next Agent:**
You are taking over the Aura UI/UX refinement phase. The user has requested two specific, critical changes to the recently implemented features. Please read this document carefully and execute the fixes.

---

## Task 1: Fix Visual Mess in "The Chaos vs. The Clarity" Slider
**File to Edit:** `src/components/LegacyVsAuraSlider.tsx`

**The Problem:**
The "Before" (Legacy) and "After" (Aura) layers both contain content that is perfectly horizontally centered (e.g., the `Cpu` icon, the `ServerCrash` icons, and the absolute positioned `<h3>` text "FRAGMENTED SILOS" / "UNIFIED INTELLIGENCE").
Because the CSS `clip-path: inset(0 X% 0 0)` cuts the foreground layer dynamically based on the slider position, when the slider is near 50%, it cuts right through the centered text and icons. This results in the left half of the foreground text overlapping bizarrely with the right half of the background text, creating a visually illegible "mess" of overlapping red and cyan letters.

**Required Solution:**
You need to redesign the layout of the layers inside `LegacyVsAuraSlider.tsx` so the content doesn't perfectly clash at the 50% centerline.
*   **Text Labels:** Move the `<h3>` labels away from the center. For example, pin "Fragmented Silos" to the `bottom-10 left-10` (text-left) and "Unified Intelligence" to the `bottom-10 right-10` (text-right).
*   **Icon Layout:** Instead of a single centered `Cpu` block and a centered cluster of `ServerCrash` icons, create a true full-width pattern. Spread the legacy servers across the entire width of the container, and spread the Aura network nodes across the entire width. This way, the slider actually "reveals" the transformation as it sweeps across the screen, rather than just slicing a single centered object in half.

---

## Task 2: Redesign the "Instant Diagnosis Hub"
**File to Edit:** `src/components/HeroDiagnosisForm.tsx` (and potentially `src/app/page.tsx` where it is rendered)

**The Problem:**
The current implementation is a large, glassmorphic contact form requiring Name, Company, Email, and a Textarea. This contradicts the user's explicit design requirement.

**The Requirement:**
The user wants this to look and function like a sleek, inline **Search Bar**. 
It must be a single horizontal row containing:
1.  **A Dropdown (Select):** To select a specific Aura product or category (e.g., "Aura Core", "Aura HR", "Aura AI Analytics").
2.  **A Free Text Input:** A standard text input for the user to type their query or bottleneck.
3.  **A Search Lens Icon Button:** A submit button utilizing the `<Search />` icon from `lucide-react`.

**Action Implementation:**
When the user clicks the search lens icon, it must trigger an action. Adapt the existing Server Action (`submitAuditForm` from `@/app/audit/actions`) and the WhatsApp webhook ping (`/api/webhooks/whatsapp`) to fire using the data from the Dropdown and the Free Text input. 
Ensure the UI provides feedback (like a loading spinner replacing the lens icon, or a success toast) when the action is fired.

---

## Summary of Execution Steps
1.  Read this handoff document.
2.  Refactor `src/components/LegacyVsAuraSlider.tsx` to fix the centered `clip-path` overlapping issues.
3.  Rewrite `src/components/HeroDiagnosisForm.tsx` from a multi-input form into a sleek, horizontal search bar with a dropdown, text input, and search lens icon.
4.  Verify the search bar correctly fires the webhook and database actions.
5.  Report back to the user with the completed changes.
