#!/bin/bash
# Local-preview bootstrap for drmejia.com
#
# Prerequisites:
#   1. Open Local by Flywheel and create a site named exactly "drmejia"
#      (use defaults: PHP 8.2, MySQL 8, nginx — site URL will be drmejia.local)
#   2. Run this script ONCE after the site is created.
#
# What it does:
#   - Symlinks the theme into Local's wp-content/themes
#   - Activates the theme
#   - Sets permalinks to /%postname%/
#   - Creates content pages (sobre, tamizaje, servicios, blog, contacto, faq, profesionales, legal)
#   - Assigns the matching custom template to each page
#   - Sets "Blog" as the posts page

set -euo pipefail

PROJECT_DIR="/Users/gmejia/projects/drmejia.com"
THEME_SRC="$PROJECT_DIR/theme/drmejia"
SITE_NAME="${SITE_NAME:-drgerardomejia}"
SITE_PUBLIC="/Users/gmejia/Local Sites/$SITE_NAME/app/public"
THEME_DEST="$SITE_PUBLIC/wp-content/themes/drmejia"

PHP_BIN="/Applications/Local.app/Contents/Resources/extraResources/lightning-services/php-8.2.29+0/bin/darwin-arm64/bin/php"
WP_CLI="/Applications/Local.app/Contents/Resources/extraResources/bin/wp-cli/wp-cli.phar"

# --- 1. Sanity checks ---------------------------------------------------------
if [[ ! -d "$SITE_PUBLIC" ]]; then
    echo "❌ Local site '$SITE_NAME' not found at:"
    echo "   $SITE_PUBLIC"
    echo ""
    echo "Create it first: open Local app → '+' → name it '$SITE_NAME' → Continue with defaults."
    exit 1
fi

if [[ ! -f "$PHP_BIN" ]]; then
    echo "❌ Local's bundled PHP not found at $PHP_BIN"
    exit 1
fi

if [[ ! -f "$WP_CLI" ]]; then
    echo "❌ Local's bundled wp-cli.phar not found at $WP_CLI"
    exit 1
fi

# --- 2. Symlink theme ---------------------------------------------------------
echo "→ Linking theme into Local site..."
if [[ -L "$THEME_DEST" || -e "$THEME_DEST" ]]; then
    rm -f "$THEME_DEST" 2>/dev/null || true
fi
ln -s "$THEME_SRC" "$THEME_DEST"
echo "   $THEME_DEST → $THEME_SRC"

# --- 3. Helper: run wp-cli inside the site ------------------------------------
# Local uses a Unix socket per site for MySQL — discover it from running mysqld processes.
RUN_DIR=$(ps -ax -o args= | grep "lightning-services/mysql" | grep -v grep | head -1 | sed -E 's/.*--defaults-file=(.*\/run\/[^/]+)\/conf\/mysql\/.*/\1/')
MYSQL_SOCKET="$RUN_DIR/mysql/mysqld.sock"

if [[ ! -S "$MYSQL_SOCKET" ]]; then
    echo "❌ Could not find a running MySQL socket. Is the Local site running (green dot in Local app)?"
    exit 1
fi
echo "→ Using MySQL socket: $MYSQL_SOCKET"

# Write a small require-script that overrides DB_HOST to use the Unix socket.
WP_CLI_OVERRIDE=$(mktemp -t drmejia-wpcli-override.XXXXXX.php)
trap 'rm -f "$WP_CLI_OVERRIDE"' EXIT
cat > "$WP_CLI_OVERRIDE" <<EOF
<?php
// Pre-define DB_HOST with the Unix socket so wp-config's later define() is the duplicate (silently ignored).
// Suppress E_WARNING for the inevitable duplicate-define notice from wp-config.
error_reporting(error_reporting() & ~E_WARNING);
if ( ! defined('DB_HOST') ) {
    define('DB_HOST', 'localhost:$MYSQL_SOCKET');
}
EOF

wp() {
    "$PHP_BIN" "$WP_CLI" \
        --path="$SITE_PUBLIC" \
        --skip-plugins \
        --skip-themes=twentytwentyfive,twentytwentyfour,twentytwentythree \
        --require="$WP_CLI_OVERRIDE" \
        "$@"
}

# Confirm WP is reachable
echo "→ Checking WordPress install..."
wp core is-installed || { echo "❌ WordPress not initialized. Open the site once in Local first."; exit 1; }

# --- 4. Activate theme --------------------------------------------------------
echo "→ Activating drmejia theme..."
wp theme activate drmejia

# --- 5. Permalinks ------------------------------------------------------------
echo "→ Setting permalinks..."
wp rewrite structure '/%postname%/' --hard
wp option update timezone_string 'America/Managua' || true
wp option update blogname 'Dr. Gerardo Mejía'
wp option update blogdescription 'Pediatría y genética clínica · Managua, Nicaragua'

# --- 6. Create pages ----------------------------------------------------------
# Each page: slug → page template file (without .php) → wp-admin "Page Attributes" template
declare -a PAGES=(
    "sobre|Sobre|page-sobre.php"
    "tamizaje|Tamizaje Neonatal|page-tamizaje.php"
    "servicios|Servicios|page-servicios.php"
    "contacto|Contacto|page-contacto.php"
    "faq|Preguntas Frecuentes|page-faq.php"
    "profesionales|Para Profesionales|page-profesionales.php"
    "legal|Privacidad y Términos|page-legal.php"
    "blog|Blog|"
)

for entry in "${PAGES[@]}"; do
    IFS='|' read -r slug title template <<< "$entry"
    EXISTING=$(wp post list --post_type=page --name="$slug" --field=ID 2>/dev/null || true)
    if [[ -z "$EXISTING" ]]; then
        echo "→ Creating page '/$slug/'..."
        ID=$(wp post create \
            --post_type=page \
            --post_status=publish \
            --post_name="$slug" \
            --post_title="$title" \
            --porcelain)
    else
        echo "→ Page '/$slug/' already exists (ID $EXISTING) — updating..."
        ID="$EXISTING"
    fi
    if [[ -n "$template" ]]; then
        wp post meta update "$ID" _wp_page_template "$template" >/dev/null
    fi
done

# --- 7. Set "Blog" as posts page ---------------------------------------------
BLOG_ID=$(wp post list --post_type=page --name=blog --field=ID)
if [[ -n "$BLOG_ID" ]]; then
    wp option update show_on_front 'posts'
    wp option update page_for_posts "$BLOG_ID"
    echo "→ Blog page set as posts page (ID $BLOG_ID)"
fi

# --- 8. Primary nav menu ------------------------------------------------------
if ! wp menu list --fields=name | grep -q "Primary"; then
    echo "→ Creating Primary menu..."
    wp menu create "Primary"
    for slug in sobre tamizaje servicios blog contacto; do
        ID=$(wp post list --post_type=page --name="$slug" --field=ID)
        if [[ -n "$ID" ]]; then
            wp menu item add-post Primary "$ID" >/dev/null
        fi
    done
    wp menu location assign Primary primary
fi

# --- 9. Flush ----------------------------------------------------------------
wp rewrite flush --hard >/dev/null

# --- 10. Done ----------------------------------------------------------------
SITE_URL=$(wp option get siteurl)
echo ""
echo "✅ Done."
echo ""
echo "   Open: $SITE_URL"
echo "   Admin: $SITE_URL/wp-admin"
echo ""
echo "   Pages created with templates:"
echo "     /          → front-page.php (Hero + 9 home sections)"
echo "     /sobre/    → page-sobre.php"
echo "     /tamizaje/ → page-tamizaje.php"
echo "     /servicios/→ page-servicios.php"
echo "     /contacto/ → page-contacto.php"
echo "     /faq/      → page-faq.php"
echo "     /profesionales/ → page-profesionales.php"
echo "     /legal/    → page-legal.php"
echo "     /blog/     → archive (uses archive.php)"
