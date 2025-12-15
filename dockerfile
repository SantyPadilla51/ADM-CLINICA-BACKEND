# 1. Imagen base
FROM node:20-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install --production

# 5. Copiar todo el proyecto
COPY . .

# 6. Puerto interno de la app
EXPOSE 3000

# 7. Comando de inicio
CMD ["npm", "start"]
