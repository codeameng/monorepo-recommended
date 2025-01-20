# @codeameng/monorepo-recommended

## TODO

- [ ] Add scripts to check if files follow EditorConfig settings
- [ ] Add scripts to check if the "Icon must end with two \r" rule in .gitignore is correctly configured
- [ ] Add scripts to check if the running Node.js version matches the engines.node constraint
- [ ] Add scripts to check if the package manager being used strictly follows the packageManager restriction
- [ ] Add scripts to check if all package.json files contain required fields
- [ ] Add scripts to check if the "type" field in package.json is correctly set to "module"
- [ ] Add scripts to configure VSCode
  - [ ] use Markdown parser for .cursorrules files
- [ ] Add scripts to verify that dependencies in package.json use exact version numbers
- [ ] Add scripts to verify that tsconfig.root.json excludes workspace directories
- [ ] Add scripts to verify that @typescript/node\* version in @packages/typescript-config matches the Node.js version specified in root package.json engines.node
- [ ] Add scripts to verify that package names match their directory paths in submodules
- [ ] Add scripts to verify that all subpackage tsconfig.json files are referenced in root tsconfig.json
- [ ] Add scripts to verify that all tsconfig.json files properly extend the base configurations from @packages/typescript-config
- [ ] Add scripts to verify that JSON files comply with their respective $schema constraints
- [ ] Add scripts to verify that all strings in YAML files are properly quoted
- [ ] Add ESLint rules to verify that all dependencies used in code are properly listed in package.json
