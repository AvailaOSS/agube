# Node build
FROM node:16.14.2 AS nodebuilder

WORKDIR /availa-agube

# GIT ARGS
ARG GITLAB_AUTH_TOKEN

# https://docs.gitlab.com/ee/user/packages/npm_registry/
# Set URL for your scoped packages.
# For example package with name `@foo/bar` will use this URL for download
RUN npm config set @availa:registry https://gitlab.com/api/v4/projects/23378318/packages/npm/

# Add the token for the scoped packages URL. Replace 23378318
# with the project where your package is located.
RUN npm config set -- '//gitlab.com/api/v4/projects/23378318/packages/npm/:_authToken' "$GITLAB_AUTH_TOKEN"

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy code
COPY . .

# Build
RUN npm run package-publish
