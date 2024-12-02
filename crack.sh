#!/bin/bash

# Define the file path
file_path="node_modules/@nuxt/ui-pro/modules/pro/index.ts"

# Define the line to be replaced
old_line="await validateLicense({ key, theme, dir: nuxt.options.rootDir })"

# Define the new line
new_line="//await validateLicense({ key, theme, dir: nuxt.options.rootDir })"

# Use sed to replace the line in the file
sed -i "s@$old_line@$new_line@" "$file_path"