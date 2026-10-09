<?php
/**
 * Document head and opening markup. The visible header itself is injected by
 * assets/js/layout.js into <div data-component="header">, exactly as on the
 * static site, so the navigation stays in one place.
 */

$aydin = aydin_page_context();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#0A1A2F">
<link rel="icon" href="<?php echo esc_url( aydin_asset( 'img/favicon.svg' ) ); ?>" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<noscript><style>[data-reveal]{opacity:1;transform:none}</style></noscript>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> data-page="<?php echo esc_attr( $aydin['page'] ); ?>" data-title-key="<?php echo esc_attr( $aydin['title_key'] ); ?>" data-desc-key="<?php echo esc_attr( $aydin['desc_key'] ); ?>">
<?php wp_body_open(); ?>

<a class="skip-link" href="#main" data-i18n="common.skip">Zum Inhalt springen</a>
<div data-component="header"></div>
