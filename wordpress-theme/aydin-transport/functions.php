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

define( 'AYDIN_THEME_VERSION', '1.0.0' );

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
	}
}
add_action( 'after_switch_theme', 'aydin_create_pages' );
