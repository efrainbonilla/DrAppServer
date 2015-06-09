.PHONY: build

build:
	@NODE_ENV=production ../ng-admin/node_modules/webpack/bin/webpack.js -p --optimize-minimize=false --optimize-occurence-order --optimize-dedupe --progress
	@echo "Files build/custom.min.css and build/custom.min.js updated (with minification)"
