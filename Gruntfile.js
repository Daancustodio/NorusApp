'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		
		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: 'webapp',
						prefix: 'app',
						src: [
							'**/*.js',
							'**/*.fragment.html',
							'**/*.fragment.json',
							'**/*.fragment.xml',
							'**/*.view.html',
							'**/*.view.json',
							'**/*.view.xml',
							'**/*.properties',
							'manifest.json',
							'!test/**'
						]
					},
					dest: 'webapp'
				},
				components: true
			}
		},
		

	});
	
	grunt.loadNpmTasks('grunt-contrib-connect');	
	grunt.loadNpmTasks('grunt-openui5');
	grunt.registerTask('build', ['openui5_preload']);
	

};
