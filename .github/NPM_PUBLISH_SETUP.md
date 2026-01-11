# NPM Publish Setup Guide

This guide explains how to set up automatic publishing to npm when creating GitHub releases.

## Prerequisites

1. **npm Account**: You need an npm account with publish permissions for `@minifsm/core`
2. **GitHub Repository Access**: Admin access to configure repository secrets

## Setup Steps

### 1. Generate npm Access Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Navigate to your account settings → **Access Tokens**
3. Click **Generate New Token** → **Classic Token**
4. Select **Automation** type (recommended for CI/CD)
5. Copy the generated token (you won't be able to see it again)

### 2. Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste the npm token you generated
6. Click **Add secret**

### 3. Creating a Release

To publish a new version to npm:

1. **Tag Format**: Use semantic versioning tags (with or without 'v' prefix)
   - Valid examples: `v1.2.3`, `1.2.3`, `v2.0.0-beta.1`, `1.0.0-rc.2`

2. **Create Release on GitHub**:
   ```bash
   # Example: Create and push a tag
   git tag v1.2.3
   git push origin v1.2.3
   ```

   Then go to GitHub → Releases → Create a new release, or use GitHub CLI:
   ```bash
   gh release create v1.2.3 --title "v1.2.3" --notes "Release notes here"
   ```

3. **Automated Process**:
   - The workflow validates the tag format
   - Runs tests and linter
   - Builds the package
   - Updates package.json version to match the tag
   - Publishes to npm with provenance (enhanced security)

## Workflow Features

✅ **Automatic version management**: Tag becomes the npm version
✅ **Provenance**: Enhanced supply chain security with npm provenance
✅ **Quality checks**: Linter and tests run before publishing
✅ **Validation**: Tag format validation prevents accidental publishes
✅ **Public access**: Configured for scoped public packages

## Troubleshooting

### Publish fails with 403 error
- Verify the npm token has publish permissions
- Check that the token is correctly set in GitHub Secrets
- Ensure you have publish rights for `@minifsm/core`

### Version already exists
- npm doesn't allow republishing existing versions
- Use a new version tag

### Tests or linter fail
- Fix the issues locally first
- The workflow requires all checks to pass before publishing

## Security Notes

- The `NPM_TOKEN` should be kept secret and never committed to code
- Use **Automation** tokens (not **Publish** tokens) for better security
- Provenance is enabled, providing cryptographic proof of where packages were built
- The workflow has minimal permissions following principle of least privilege
