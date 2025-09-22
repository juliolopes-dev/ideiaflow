#!/bin/bash

# Script de deploy para EasyPanel
echo "🚀 Iniciando deploy do IdeiaFlow..."

# Verificar se estamos na branch main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Erro: Deploy deve ser feito a partir da branch main"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erro: Há mudanças não commitadas"
    exit 1
fi

# Build da aplicação
echo "📦 Fazendo build da aplicação..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build da aplicação"
    exit 1
fi

# Build da imagem Docker
echo "🐳 Construindo imagem Docker..."
docker build -t ideiaflow:latest .

if [ $? -ne 0 ]; then
    echo "❌ Erro ao construir imagem Docker"
    exit 1
fi

# Tag para registry (ajuste conforme seu registry)
docker tag ideiaflow:latest registry.easypanel.io/ideiaflow:latest

# Push para registry
echo "📤 Enviando para registry..."
docker push registry.easypanel.io/ideiaflow:latest

if [ $? -ne 0 ]; then
    echo "❌ Erro ao enviar para registry"
    exit 1
fi

echo "✅ Deploy concluído com sucesso!"
echo "🌐 Aplicação disponível em: https://ideiaflow.seu-dominio.com"
