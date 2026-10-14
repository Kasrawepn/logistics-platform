<?php
/**
 * Aydın Transport & Logistik — theme bootstrap.
 *
 * The site is hand-written: every page is a PHP template that renders the same
 * markup as the static site in website/, and the trilingual DE/EN/TR layer is
 * the site's own assets/js/i18n.js. This file loads those assets, gives the
 * JavaScript the real WordPress URLs for the six pages, and creates the five
 * inner pages once so a fresh install shows the whole site after activation.
 */

define( 'AYDIN_THEME_VERSION', '1.0.2' );

/**
 * The inner pages: WordPress slug => German title used when the page is created,
 * plus the i18n keys that set the document title and the meta description.
 */
function aydin_page_map() {
	return array(
		'services'  => array(
			'label'     => 'Leistungen',
			'title_key' => 'meta.services.title',
			'desc_key'  => 'meta.services.desc',
		),
		'about'     => array(
			'label'     => 'Über uns',
			'title_key' => 'meta.about.title',
			'desc_key'  => 'meta.about.desc',
		),
		'solutions' => array(
			'label'     => 'Lösungen',
			'title_key' => 'meta.solutions.title',
			'desc_key'  => 'meta.solutions.desc',
		),
		'fleet'     => array(
			'label'     => 'Fuhrpark',
			'title_key' => 'meta.fleet.title',
			'desc_key'  => 'meta.fleet.desc',
		),
		'contact'   => array(
			'label'     => 'Kontakt',
			'title_key' => 'meta.contact.title',
			'desc_key'  => 'meta.contact.desc',
		),
		'visa'           => array(
			'label'     => 'Visa',
			'title_key' => 'meta.visa.title',
			'desc_key'  => 'meta.visa.desc',
		),
		'visa-register'  => array(
			'label'     => 'Visum-Registrierung',
			'title_key' => 'meta.visaReg.title',
			'desc_key'  => 'meta.visaReg.desc',
		),
	);
}

/** URL of one of the site's pages, whatever permalink structure is in use. */
function aydin_page_url( $slug, $hash = '' ) {
	if ( 'home' === $slug || '' === $slug ) {
		$url = home_url( '/' );
	} else {
		$page = get_page_by_path( $slug );
		$url  = $page ? get_permalink( $page ) : home_url( '/' . $slug . '/' );
	}

	return $hash ? $url . $hash : $url;
}

/** URL of a file inside the theme's assets/ folder. */
function aydin_asset( $path ) {
	return get_theme_file_uri( 'assets/' . ltrim( $path, '/' ) );
}

/** data-page / title-key / desc-key for the template WordPress is rendering. */
function aydin_page_context() {
	$context = array(
		'page'      => 'home',
		'title_key' => 'meta.home.title',
		'desc_key'  => 'meta.home.desc',
	);

	if ( ! is_page() ) {
		return $context;
	}

	$slug = get_post_field( 'post_name', get_queried_object_id() );
	$map  = aydin_page_map();

	if ( isset( $map[ $slug ] ) ) {
		$context['page']      = $slug;
		$context['title_key'] = $map[ $slug ]['title_key'];
		$context['desc_key']  = $map[ $slug ]['desc_key'];
	}

	return $context;
}

/** Styles and scripts, in the same order the static pages load them. */
function aydin_enqueue_assets() {
	$version = AYDIN_THEME_VERSION;

	wp_enqueue_style( 'aydin-style', get_stylesheet_uri(), array(), $version );
	wp_enqueue_style( 'aydin-base', aydin_asset( 'css/base.css' ), array(), $version );
	wp_enqueue_style( 'aydin-components', aydin_asset( 'css/components.css' ), array( 'aydin-base' ), $version );
	wp_enqueue_style( 'aydin-pages', aydin_asset( 'css/pages.css' ), array( 'aydin-components' ), $version );

	wp_enqueue_script( 'aydin-i18n', aydin_asset( 'js/i18n.js' ), array(), $version, true );
	wp_enqueue_script( 'aydin-layout', aydin_asset( 'js/layout.js' ), array( 'aydin-i18n' ), $version, true );
	wp_enqueue_script( 'aydin-main', aydin_asset( 'js/main.js' ), array( 'aydin-layout' ), $version, true );
	wp_enqueue_script( 'aydin-visa-reg', aydin_asset( 'js/visa-register.js' ), array( 'aydin-main' ), $version, true );

	// Header and footer are built in JavaScript from a table of page names; hand
	// it the WordPress URLs instead of the static .html files.
	$urls = array();
	foreach ( array(
		'index.html'     => 'home',
		'services.html'  => 'services',
		'about.html'     => 'about',
		'solutions.html' => 'solutions',
		'fleet.html'     => 'fleet',
		'contact.html'   => 'contact',
		'visa.html'           => 'visa',
		'visa-register.html'  => 'visa-register',
	) as $file => $slug ) {
		$urls[ $file ] = aydin_page_url( $slug );

		foreach ( array( '#transporte', '#direktfahrten', '#express', '#kurier', '#quote' ) as $hash ) {
			$urls[ $file . $hash ] = aydin_page_url( $slug, $hash );
		}
	}

	wp_localize_script( 'aydin-layout', 'AydinSiteUrls', $urls );
}
add_action( 'wp_enqueue_scripts', 'aydin_enqueue_assets' );

function aydin_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'style', 'script' ) );
}
add_action( 'after_setup_theme', 'aydin_setup' );

/**
 * A fresh install has no pages yet. The templates render fixed markup, so the
 * only thing that matters is that the five inner pages exist under the right
 * slug — create the missing ones when the theme is activated.
 */
function aydin_create_pages() {
	// Avoid running on every page load once all pages exist.
	if ( get_option( 'aydin_pages_version' ) === AYDIN_THEME_VERSION ) {
		return;
	}

	$created = false;
	foreach ( aydin_page_map() as $slug => $page ) {
		if ( get_page_by_path( $slug ) ) {
			continue;
		}

		wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => $page['label'],
				'post_name'    => $slug,
				'post_content' => '',
			)
		);
		$created = true;
	}

	if ( $created ) {
		flush_rewrite_rules();
	}

	update_option( 'aydin_pages_version', AYDIN_THEME_VERSION );
}
add_action( 'after_switch_theme', 'aydin_create_pages' );
add_action( 'init', 'aydin_create_pages' );

/**
 * Inline the visa-registration CSS so the page is styled even if pages.css
 * fails to load on the hosting (observed on konsoleH installs where the
 * enqueued pages.css returned a cached or empty version).
 */
function aydin_inline_vr_styles() {
	if ( ! is_page( 'visa-register' ) ) {
		return;
	}
	?>
<style>
.vr-steps{display:flex;align-items:center;gap:.75rem;margin-bottom:3rem}
.vr-steps__item{display:flex;align-items:center;gap:.6rem}
.vr-steps__num{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;border:1.5px solid var(--line);font-size:.9375rem;font-weight:700;color:var(--fg-muted);transition:all .3s var(--ease-out)}
.vr-steps__item.is-active .vr-steps__num{border-color:var(--gold);background:var(--gold);color:var(--navy-900)}
.vr-steps__item.is-done .vr-steps__num{border-color:var(--gold-line);background:var(--gold-line);color:var(--navy-900)}
.vr-steps__label{font-size:.6875rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--fg-muted)}
.vr-steps__item.is-active .vr-steps__label{color:var(--navy-900)}
.vr-steps__line{flex:1;height:1px;background:var(--line);min-width:20px}
.vr-panel{display:none}
.vr-panel.is-active{display:block}
.vr-type-grid .vr-type-card{cursor:pointer;transition:border-color .25s var(--ease-out),transform .25s var(--ease-out),box-shadow .25s var(--ease-out);outline:none}
.vr-type-card:focus-visible{box-shadow:0 0 0 3px rgba(197,160,89,.35)}
.vr-type-card:hover{border-color:var(--gold-line);transform:translateY(-3px)}
.vr-type-card.is-selected{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold),0 8px 24px rgba(197,160,89,.18)}
.vr-selected-bar{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem;padding:1rem 1.25rem;border:1px solid var(--gold-line);border-radius:var(--radius);background:var(--paper);margin-bottom:2rem}
.vr-selected-bar__label{font-size:.6875rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--fg-muted)}
.vr-selected-bar__value{font-weight:700;color:var(--navy-900)}
.vr-selected-bar__change{margin-left:auto;background:none;border:none;font-size:.8125rem;font-weight:600;color:var(--gold-600);cursor:pointer;text-decoration:underline;padding:0}
.vr-selected-bar__change:hover{color:var(--gold)}
.vr-nav{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;margin-top:2rem}
.vr-review{border:1px solid var(--line);border-radius:var(--radius);padding:1.5rem;margin-bottom:1.5rem;background:var(--paper)}
.vr-review__row{display:flex;gap:1rem;padding:.6rem 0;border-bottom:1px solid var(--line);font-size:.9375rem}
.vr-review__row:last-child{border-bottom:0}
.vr-review__label{flex:0 0 10rem;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--fg-muted);padding-top:2px}
.vr-review__value{color:var(--navy-900);font-weight:500}
@media(max-width:640px){.vr-steps__label{display:none}.vr-steps__line{min-width:12px}.vr-selected-bar__change{margin-left:0;width:100%;text-align:left}.vr-review__label{flex:0 0 7rem}}
</style>
	<?php
}
add_action( 'wp_head', 'aydin_inline_vr_styles', 20 );
