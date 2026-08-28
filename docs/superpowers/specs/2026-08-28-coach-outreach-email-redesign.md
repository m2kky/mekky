# Coach Outreach Email Redesign

## Purpose

Redesign the second coach-outreach wave so every email feels like a short founder-to-founder note rather than a sales template. The email must establish that Muhammed studied the recipient, identify one commercially useful observation, show one relevant proof point, and offer a low-pressure next step.

The redesign also fixes the broken project images in the first wave and adds a recognizable personal signature with Muhammed's portrait.

## Approved Direction

Use a **Personal Founder Email**: concise copy, restrained visual design, one relevant project image, Muhammed's portrait in the signature, and a soft call to action.

Do not use a newsletter-style hero, multiple stacked project cards, a generic feature inventory, or CID image attachments.

## Audience And Wave Scope

The test version goes only to `Contact@muhammedmekky.com`.

After Muhammed visually confirms the test in his inbox, prepare individual delivery for these ten previously reviewed public professional contacts:

1. Marwa Mokhtar Ibrahim
2. Noha Radwan
3. Nermeen Edrees Abdel Moneim
4. Inas Ghanem
5. Chaima Tayssir
6. Fatma Abdelrahman Kheir
7. Omayma Rashed
8. Marwa Agha
9. Ahmed Adel
10. Hussein F. Salama

No recipient is sent the same opening, observation, relevance paragraph, or subject line as another recipient.

## Message Architecture

Each message is 120–170 words before the footer and follows this order:

1. **Human opening:** address the recipient by their preferred professional name.
2. **Specific evidence:** one concise fact about their work, credentials, audience, method, or programs from the reviewed public source.
3. **Commercial observation:** identify one gap between the strength of their work and the way a prospective client currently discovers, understands, or books it. Phrase this as an observation, not criticism.
4. **Relevant proof:** reference one comparable coach platform and at most two capabilities that directly relate to the recipient's model.
5. **Low-pressure invitation:** offer to show the proposed client journey or idea. Do not ask for a buying decision.
6. **Proof link:** one project image linked to the corresponding portfolio page.
7. **Personal signature:** Muhammed's portrait, name, positioning, website, and reply address.
8. **Secondary CTA:** a discreet discovery-call link below the primary proof link.
9. **Opt-out:** a short professional line allowing the recipient to decline follow-up.

## Copy Rules

- Write in clear professional English because the reviewed professional profiles use English and target regional or international audiences.
- Sound observant, calm, and commercially literate.
- Avoid exaggerated praise, fake familiarity, urgency, scarcity, and generic compliments.
- Never use the phrase “I am not proposing a generic website.”
- Never dump the full feature set. Mention no more than two relevant capabilities in the body.
- Do not claim the recipient has no website unless a sufficiently broad check confirms it. Prefer “I could not find a clear path...” or describe the observed directory/social-first journey.
- Do not claim business results that are not supported by evidence.
- Use a soft CTA such as “If that observation resonates, I’d be happy to show you the client journey I have in mind.”
- Subject lines should be four to seven words, specific to the recipient, and avoid “proposal,” “website,” “offer,” and promotional punctuation.

## Personalization Fields

Each recipient record contains:

- `name`
- `email`
- `subject`
- `evidence`
- `observation`
- `proofProject`
- `proofSentence`
- `primaryLinkLabel`

The renderer owns shared structure only. Recipient-specific content stays in data so the message can be audited before delivery.

## Visual Design

Use a 600px maximum-width white email with generous spacing and dark text on a warm neutral page background.

The body should resemble a carefully formatted personal email, not a marketing landing page:

- No top navigation or promotional masthead.
- No large brand headline.
- One project image at 16:9 with a short text link underneath.
- Muhammed's portrait appears as a 64–72px circular image in the signature.
- One dark primary link/button is permitted for the relevant project.
- The discovery-call link is secondary and text-based or visually quieter.
- All meaningful content remains understandable when images are disabled.

## Hosted Image Strategy

Use absolute HTTPS image URLs hosted on `muhammedmekky.com`; do not use CID attachments.

Approved assets:

- Muhammed portrait: `https://muhammedmekky.com/images/hero.png`
- Ahmed Rammah: `https://muhammedmekky.com/images/projects/ahmed-rammah.webp`
- Coach Hossam Ibrahim: `https://muhammedmekky.com/images/projects/coach-hossam-ibrahim.webp`
- Mahmoud Bravo: `https://muhammedmekky.com/images/projects/mahmoud-bravo.webp`

Before the test send, request each asset and require a successful HTTP response with an image content type. Every image receives descriptive alt text and fixed display dimensions to prevent layout shifts.

## Links

- Portfolio: `https://muhammedmekky.com/portfolio`
- Discovery call: `https://muhammedmekky.com/book/discovery-call`
- Sender and reply-to: `Muhammed Mekky <contact@muhammedmekky.com>`

Project images link to the corresponding project detail page when one exists. Otherwise they link to the portfolio page.

## Delivery Safety

- Preserve separate delivery per recipient; never use CC or BCC for the wave.
- Use a new campaign tag and idempotency-key version so the new test cannot collide with the first wave.
- Maintain an HTML and plain-text version.
- Keep the existing simple opt-out and `List-Unsubscribe` header.
- Do not include image attachments.
- The default command remains a dry run.
- A test-send mode sends only to `Contact@muhammedmekky.com` and clearly prefixes the subject with `[TEST]`.
- Production-wave mode remains unavailable until Muhammed confirms the inbox rendering and copy of the test email.

## Test And Review Flow

1. Validate all hosted asset URLs and public links.
2. Render every recipient email locally and validate required fields, word count, unique subjects, and forbidden phrases.
3. Generate a local HTML preview for one representative A-tier recipient.
4. Inspect the preview at desktop and mobile widths.
5. Send one `[TEST]` email to `Contact@muhammedmekky.com` through the verified Resend domain.
6. Confirm the Resend event reaches at least `sent`, while recognizing that inbox rendering must be checked by Muhammed.
7. Pause for Muhammed's explicit visual approval.
8. Only then enable and execute the ten-recipient production wave.

## Error Handling

- Stop the wave on malformed recipient data, a failed image validation, a non-verified sender domain, or an unsuccessful API response.
- Log recipient address, Resend message ID, and latest delivery event without printing the API key.
- Do not automatically retry `failed`, `bounced`, `suppressed`, or `complained` recipients.
- Rate-limit status checks and treat `sent` as accepted for delivery, not delivered.

## Success Criteria

- The test email displays Muhammed's portrait and the selected project image in the recipient inbox.
- The message reads naturally without images and contains no broken-image cards.
- The copy is 120–170 words before footer content.
- Each production recipient has a unique evidence sentence, observation, proof mapping, and subject.
- The email contains no generic feature inventory and no unsupported claims.
- Production delivery cannot happen before Muhammed approves the inbox test.

## Out Of Scope

- Follow-up sequence automation
- Open or click tracking analysis
- WhatsApp or LinkedIn outreach
- Re-sending or changing the already delivered first wave
- Building a general-purpose campaign manager
