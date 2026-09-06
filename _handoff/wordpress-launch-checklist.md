# WordPress launch checklist — doctorgerardomejia.com

Operational readiness checklist after Hostinger MCP audit/harden (2026-07-24).

**Install:** `29700466` · **User:** `u228577048` · **Domain:** `doctorgerardomejia.com`

---

## 1. Audited state (post-harden)

| Item | Value |
|---|---|
| WP core | **7.0.2** (no updates available; no reported vulns) |
| PHP | **8.3.30** |
| Site language | `es_CO` (consider `es_NI` / `es_ES` in wp-admin if preferred) |
| Website | Enabled (Hostinger addon vhost) |
| Active theme | **drmejia** `0.1.0` (custom) |
| LiteSpeed Cache | Installed + active |
| Memcached object cache | Active |
| Maintenance mode | Off |
| Hostinger AI `llmstxt` | **Enabled** |
| Hostinger AI `web2agent` | Left **disabled** (not required for launch) |
| WooCommerce | Not installed (correct) |
| HTTPS / homepage | Loads `200` over HTTPS; LiteSpeed caching |

### Active plugins (lean stack)

| Plugin | Role | Notes |
|---|---|---|
| Wordfence Security `8.2.2` | Security | Configure in wp-admin |
| Rank Math SEO `1.0.274.1` | SEO + schema | Configure Physician / MedicalBusiness |
| Contact Form 7 `6.1.6` | Contact form | Wire email + shortcode |
| Flamingo `2.6.3` | CF7 message store | Pairs with CF7 |
| LiteSpeed Cache `7.8.1` | Page cache | Keep on |
| Hostinger Tools `3.0.72` | Hosting tooling | Keep |
| Hostinger AI / Easy Onboarding / Reach / AI Provider | Hostinger defaults | Optional; do not stack more AI SEO tools |

### Inactive themes (leave as fallbacks)

`hostinger-ai-theme`, `twentytwentyfive`, `twentytwentyfour`, `twentytwentythree`

---

## 2. Changes applied via MCP

- Validated install (healthy)
- Confirmed core/plugins/themes already current (no core/plugin/theme updates needed)
- Installed + activated: **Wordfence**, **Rank Math SEO**, **Contact Form 7**, **Flamingo**
- Enabled Hostinger **`llmstxt`**
- Left **`web2agent`** off
- Confirmed LiteSpeed + Memcached already on; purged LiteSpeed cache after plugin changes
- Did **not** switch themes; **drmejia** remains active
- Did **not** reinstall WordPress or delete the install
- Did **not** install WooCommerce, page builders, Polylang, or a backup plugin

---

## 3. Security posture

**Good now**
- Current WP 7.0.2 on PHP 8.3
- Wordfence active (needs setup wizard)
- LiteSpeed + Memcached on
- No WooCommerce attack surface
- HTTPS serving with `upgrade-insecure-requests`

**Finish in wp-admin**
1. Complete Wordfence wizard (firewall learning mode → enabled; email alerts to practice inbox)
2. Enable 2FA for all admin users
3. Confirm strong unique admin passwords; remove unused admin accounts
4. Discourage search engines until content is launch-ready (`Settings → Reading`), then allow indexing
5. Keep plugins lean; update Wordfence/Rank Math/CF7 promptly when updates appear

**Skipped on purpose**
- Extra security suites (Solid Security / iThemes) — avoid overlap with Wordfence
- Really Simple SSL — Hostinger already serves HTTPS
- Dedicated backup plugin — use Hostinger hPanel backups (verify schedule below)

---

## 4. Required wp-admin finish steps (priority order)

### A. Accounts & basics
- [ ] Confirm admin email / practice email in **Settings → General**
- [ ] Set timezone to Nicaragua (`America/Managua`)
- [ ] Permalinks: **Post name** (`/%postname%/`) — save once
- [ ] Create Editor/Author accounts as needed; avoid sharing the main admin login

### B. Content structure (MCP cannot do this)
- [ ] Create pages: Home (static front), Sobre, Servicios, Tamizaje / Cariotipo, Contacto, FAQ, Profesionales, Blog, Legal/Privacidad
- [ ] **Settings → Reading:** static front page + posts page
- [ ] Menus: primary header + footer (theme locations in `drmejia`)
- [ ] Privacy Policy page assigned under **Settings → Privacy**
- [ ] Legal copy: privacidad, términos, cookies (see `_handoff/pages-spec.md`)

### C. Contact form
- [ ] CF7: set **To** email from `_handoff/assets-needed.md` (email destino)
- [ ] Spanish labels; include consent checkbox if storing PHI-adjacent inquiries
- [ ] Embed CF7 shortcode on Contacto (+ optional home CTA)
- [ ] Send a test submission; confirm inbox + Flamingo entry
- [ ] Optional later: Akismet or CF7 reCAPTCHA/Turnstile if spam appears

### D. SEO (Rank Math)
- [ ] Run Rank Math setup wizard (connect Search Console when ready)
- [ ] Local SEO / schema: **Physician** + **MedicalBusiness** (Nicaragua, pediatrics/genetics)
- [ ] Site title / meta description in Spanish
- [ ] XML sitemap enabled; submit in Google Search Console
- [ ] OG defaults once photo/logo assets exist
- [ ] Do **not** install a second SEO plugin (no Yoast / AIOSEO alongside Rank Math)

### E. Contact & practice data (from assets-needed)
- [ ] WhatsApp number (+505…) in theme Customizer / helpers (replace placeholders)
- [ ] Phone, address, hours, Maps embed
- [ ] Professional photo + clinic photos in Media Library; set featured/hero images

### F. Performance & SSL
- [ ] Confirm padlock / HTTPS on all key URLs
- [ ] LiteSpeed: leave enabled; purge after major content publishes
- [ ] Avoid installing extra cache plugins

### G. Backups & Hostinger
- [ ] In hPanel: verify automatic backups exist and restore point is recent
- [ ] Note restore procedure before large content imports
- [ ] After theme deploys: purge LiteSpeed (and Hostinger cache if used)

### H. Phase 2 (do not block launch)
- [ ] Polylang ES/EN — only when bilingual content is ready
- [ ] Remaining `drmejia` section templates / content
- [ ] `web2agent` — leave off unless you explicitly want Hostinger agent tooling
- [ ] Google Site Kit / analytics — add when measurement IDs are ready

---

## 5. What MCP cannot do

Hostinger WordPress MCP can install/activate/update plugins, toggle cache/AI options, and update core — **not**:

- Edit pages, menus, widgets, or theme Customizer content
- Configure Wordfence / Rank Math / CF7 settings UIs
- Upload media or set featured images
- Create users beyond what already exists / manage roles in detail
- Write legal copy or medical content
- DNS/email mailbox setup beyond hosting APIs already used

Those steps must be finished in **wp-admin** (and hPanel for backups/DNS).

---

## 6. Quick verify after wp-admin work

1. Homepage + Contacto load over HTTPS  
2. Form test email received  
3. Rank Math schema validates (Rich Results / schema tester)  
4. Wordfence scan completes without critical issues  
5. Mobile nav + WhatsApp float work on phone  
6. Search engines allowed only when content is launch-ready  
