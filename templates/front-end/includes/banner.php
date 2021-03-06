<?php
/**
 * Template and variables for banner messages
 * This template the banner messages only
 *
 * @package WP Message Inserter Plugin
 */

$check_session          = isset( $message['meta'][ $prefix . 'check_session' ] ) ? $message['meta'][ $prefix . 'check_session' ][0] : '';
$session_count_check    = isset( $message['meta'][ $prefix . 'number_of_sessions' ] ) ? $message['meta'][ $prefix . 'number_of_sessions' ][0] : '';
$session_count_operator = isset( $message['meta'][ $prefix . 'operator_session' ] ) ? $message['meta'][ $prefix . 'operator_session' ][0] : '';

?>

<?php if ( 0 < count( $screen_sizes ) ) : ?>
	<aside class="o-site-message-container wp-message-inserter-message <?php echo $wp_classes; ?> wp-message-inserter-message-<?php echo $slug; ?> wp-message-inserter-message-region-<?php echo $region; ?> wp-message-inserter-message-id-<?php echo $id; ?> wp-message-inserter-message-<?php echo $type; ?> wp-message-inserter-message-<?php echo $message_counter; ?><?php echo ( 'on' === $check_session ) ? ' check-session-message' : ''; ?>"<?php echo ( 0 !== $close_time_days ) ? ' data-close-time-days="' . $close_time_days . '"' : ''; ?><?php echo ( 0 !== $close_time_hours ) ? ' data-close-time-hours="' . $close_time_hours . '"' : ''; ?><?php echo $session_data_attributes; ?>>
		<?php foreach ( $screen_sizes as $key => $screen_size ) : ?>

			<?php
			// Banner BG Setup
			$bgcolor     = isset( $screen_size[ $prefix . 'banner_bgcolor' ] ) ? 'linear-gradient(
				' . $screen_size[ $prefix . 'banner_bgcolor' ] . ',
				' . $screen_size[ $prefix . 'banner_bgcolor' ] . '
			)' : '';
			$banner_bg   = isset( $screen_size[ $prefix . 'banner_bgimage' ] ) ? 'background: ' . $bgcolor . ', url(' . $screen_size[ $prefix . 'banner_bgimage' ] . ') center center no-repeat; background-size: cover;' : 'background: ' . $bgcolor . ';';
			$banner_text = isset( $screen_size[ $prefix . 'banner_textcolor' ] ) ? 'color: ' . $screen_size[ $prefix . 'banner_textcolor' ] . ';' : '';

			$banner_size           = '';
			$banner_max_width      = isset( $screen_size[ $prefix . 'banner_max_width' ] ) ? $screen_size[ $prefix . 'banner_max_width' ] : 'page';
			$banner_max_width_text = isset( $screen_size[ $prefix . 'banner_max_width_text' ] ) ? $screen_size[ $prefix . 'banner_max_width_text' ] : '';
			$banner_max_width_unit = isset( $screen_size[ $prefix . 'banner_max_width_unit' ] ) ? $screen_size[ $prefix . 'banner_max_width_unit' ] : '';
			if ( 'page' !== $banner_max_width && 'custom' !== $banner_max_width ) {
				$banner_size = 'max-width:' . $banner_max_width;
			} elseif ( '' !== $banner_max_width_text && '' !== $banner_max_width_unit ) {
				$banner_size = 'max-width:' . $banner_max_width_text . $banner_max_width_unit;
			}

			$banner_style = $banner_bg . $banner_text . $banner_size . ';';

			// session data attributes
			$session_data_attributes = '';
			if ( '' !== $check_session && '' !== $session_count_check && '' !== $session_count_operator ) {
				$session_data_attributes = ' data-session-count-to-check="' . $session_count_check . '" data-session-count-operator="' . $session_count_operator . '"';
			}

			?>

			<div class="m-wp-insert-message-item m-wp-insert-message-item-<?php echo $key; ?> m-wp-insert-message-item-<?php echo $type; ?><?php echo ( 'page' === $banner_max_width ) ? ' banner-width-page' : ''; ?>" style="<?php echo $banner_style; ?>">

				<?php if ( 'dualcol' === $screen_size[ $prefix . 'banner_layout' ] ) : ?>
					<!-- Dual Col -->
					<div class="dual-wrap <?php echo ( isset( $screen_size[ $prefix . 'banner_flip_columns' ] ) && 'on' === $screen_size[ $prefix . 'banner_flip_columns' ] ) ? 'flip' : ''; ?>">
						<?php require( 'banner/icon.php' ); ?>
						<div class="col">
							<?php require( 'banner/text.php' ); ?>
							<?php if ( 'form' === $screen_size[ $prefix . 'cta_type' ] ) : ?>
								<?php require( 'banner/cta-form.php' ); ?>
							<?php endif; ?>
						</div>
						<div class="col">
							<?php if ( 'button' === $screen_size[ $prefix . 'cta_type' ] ) : ?>
								<?php require( 'banner/cta-button.php' ); ?>
							<?php endif; ?>
							<?php require( 'banner/disclaimer.php' ); ?>
						</div>
					</div>
				<?php endif; ?>

				<?php if ( 'stacked' === $screen_size[ $prefix . 'banner_layout' ] ) : ?>
					<!-- Stacked Banner -->
					<div class="stack-wrap">
						<?php require( 'banner/text.php' ); ?>
						<?php if ( 'button' === $screen_size[ $prefix . 'cta_type' ] ) : ?>
							<?php require( 'banner/cta-button.php' ); ?>
						<?php endif; ?>
						<?php require( 'banner/disclaimer.php' ); ?>
						<?php if ( 'form' === $screen_size[ $prefix . 'cta_type' ] ) : ?>
							<?php require( 'banner/cta-form.php' ); ?>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</aside>
<?php endif; ?>
