<?php
/**
 * Test harness only — never part of the theme.
 *
 * The preview proxy terminates TLS and talks plain HTTP to the container, so
 * WordPress' is_ssl() is false and it prints http:// asset URLs. A browser
 * reaching the instance over the public https host then blocks them as mixed
 * content (the page renders unstyled with no injected header). The owner's
 * hosting serves the domain directly, so this file is mounted into the
 * throwaway test instance only — see docker-compose.test.yml.
 */

$_SERVER['HTTPS'] = 'on';
