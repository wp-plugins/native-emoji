<?php
/*
* Plugin Name: Native Emoji */__( 'Native Emoji', 'nep_native_emoji' ); /*
* Plugin URI: https://wordpress.org/plugins/native-emoji/
* Description: This is not just a plugin, this is the plugin for use <strong>emoji</strong> in a native way. When activated you will see a new button in your wordpress editor, from there you will be able to include more than 1,000 emojis in to your post, pages, etc. Native Emoji is translation ready for all spanish versions and supports any custom post type.
* Version: 1.0
* Author: Davabuu Designs
* Author URI: http://davabuu.com
* Text Domain: nep_native_emoji
*/

// Localize The Plugn
add_action( 'plugins_loaded', 'nep_localize_plugin' );
function nep_localize_plugin() {
	load_plugin_textdomain( 'nep_native_emoji', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
}

// Register CSS and JS files
wp_register_style( 'nep_native-emoji',  plugins_url('/css/style.css',__FILE__), false, '1.0', 'all' );
wp_register_script( 'nep_native-emoji', plugins_url('/js/script.js',__FILE__), false, '1.0', true );

// Define Plugin Class
class WP_nep_Native_Emoji{

  	// Constructor
	function __construct() {
		add_action( "wp_head", array( $this, 'nep_emoji_localize_tinymce_javascript' ));
		wp_enqueue_style( 'nep_native-emoji' );
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'nep_native-emoji' );
		
		// Add the actions to the hooks
		foreach ( array('post.php','post-new.php') as $hook ) {
			add_action( "admin_head-$hook", array( $this, 'nep_emoji_localize_tinymce_javascript' ));
			//wp_enqueue_style( 'nep_native-emoji' );
			//wp_enqueue_script( 'jquery' );
			//wp_enqueue_script( 'nep_native-emoji' );
		}
		// Add the filters to the editor
		add_action( 'admin_notices', array( $this, 'nep_emoji_activation_msg' ));
		
		add_filter( 'teeny_mce_buttons', array( $this, 'nep_emoji_register_buttons' ));
		//add_filter( 'teeny_mce_plugins', array( $this, 'nep_emoji_register_tinymce_javascript' ));
		
		add_filter( 'mce_buttons', array( $this, 'nep_emoji_register_buttons' ));
		add_filter( 'mce_external_plugins', array( $this, 'nep_emoji_register_tinymce_javascript' ));
		//add_filter( 'teeny_mce_plugins', array( $this, 'nep_emoji_register_tinymce_javascript' ));
		// Register activation and desactivation hook
		register_activation_hook( __FILE__, array( $this, 'nep_emoji_install' ) );
		register_deactivation_hook( __FILE__, array( $this, 'nep_emoji_uninstall' ) );
	}		
	
	// Register plugin button				
	function nep_emoji_register_buttons($buttons) {
	   array_push($buttons, 'separator', 'nep_native_emoji');
	   return $buttons;
	}
	
	// Register tinymce pluglin
	function nep_emoji_register_tinymce_javascript($plugin_array) {
	   $plugin_array['nep_native_emoji'] = plugins_url('/js/tinymce-plugin.js',__FILE__);
	   return $plugin_array;
	}
	
	// Localize tinymce js plugin
	function nep_emoji_localize_tinymce_javascript() {
		global $locale;
		$plugin_url = plugins_url( '/', __FILE__ );?>
        <!-- TinyMCE Native Emoji Plugin -->
		<script type='text/javascript'>
        var nep_emoji_plugin = {
            'nep_url': '<?php echo $plugin_url; ?>',
			'nep_emoji_name': '<?php _e('Native Emoji', 'nep_native_emoji');?>',
			'nep_emoji_people': '<?php _e('People', 'nep_native_emoji');?>',
			'nep_emoji_nature': '<?php _e('Nature', 'nep_native_emoji');?>',
			'nep_emoji_food_drink': '<?php _e('Food & Drink', 'nep_native_emoji');?>',
			'nep_emoji_celebration': '<?php _e('Celebration', 'nep_native_emoji');?>',
			'nep_emoji_activity': '<?php _e('Activity', 'nep_native_emoji');?>',
			'nep_emoji_travel_places' : '<?php _e('Travel & Places', 'nep_native_emoji');?>',
			'nep_emoji_objects_symbols' : '<?php _e('Objects & Symbols', 'nep_native_emoji');?>'
        };
        </script>
        <!-- TinyMCE Native Emoji Plugin -->
        <?php
	}
	
	
	function nep_emoji_activation_msg() {	
		if(is_plugin_active('native-emoji/index.php') && !get_option('nep_native_emoji_active')){
			add_option( 'nep_native_emoji_active', 'true' );
			echo '<div id="message" class="updated notice is-dismissible"><p>'.__('Thanks for installing Emoji Native Plugin, before using you may want to read the ', 'native_emoji').' <a href="http://native-emoji.davabuu.com">'.__('manual', 'native_emoji').'</a>.</p><button type="button" class="notice-dismiss"><span class="screen-reader-text">'.__('Discard this notice', 'native_emoji').'</span></button></div>';
		}
	}

    function nep_emoji_install() {
		
    }
	
    function nep_emoji_uninstall() {
		delete_option( 'nep_native_emoji_active' );
    }

}

new WP_nep_Native_Emoji();