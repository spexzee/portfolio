FROM node:20.19.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# This will fail the Docker build if there are TypeScript/build errors
RUN npm run build

# Verify that the build directory exists
RUN test -d dist || (echo "Build failed - dist directory not found" && exit 1)

CMD ["sh", "-c", "echo Build completed successfully"]
