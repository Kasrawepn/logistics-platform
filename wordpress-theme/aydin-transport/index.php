<?php
/**
 * Fallback template: WordPress uses it for anything the theme has no template
 * for (a post, the blog index, a 404). The six site pages have their own files.
 */

get_header();
?>
<main id="main">
  <section class="section fallback-page">
    <div class="container container--narrow">
      <h1><?php echo esc_html( is_404() ? 'Seite nicht gefunden' : get_the_title() ); ?></h1>
      <div>
        <?php
        if ( is_404() ) {
          echo '<p><a href="' . esc_url( home_url( '/' ) ) . '">Zur Startseite</a></p>';
        } else {
          the_content();
        }
        ?>
      </div>
    </div>
  </section>
</main>
<?php
get_footer();
