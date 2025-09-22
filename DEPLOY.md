# 🚀 Deploy do IdeiaFlow no EasyPanel

Este guia explica como fazer o deploy do IdeiaFlow em um servidor usando EasyPanel.

## 📋 Pré-requisitos

- Conta no EasyPanel
- Docker instalado (para desenvolvimento local)
- Git configurado
- Domínio configurado (opcional)

## 🛠️ Arquivos de Configuração

O projeto já inclui todos os arquivos necessários para deploy:

- `Dockerfile` - Configuração do container
- `nginx.conf` - Configuração do servidor web
- `docker-compose.yml` - Orquestração de containers
- `easypanel.json` - Configuração específica do EasyPanel
- `deploy.sh` - Script automatizado de deploy

## 🚀 Processo de Deploy

### 1. **Preparação Local**

```bash
# 1. Fazer build local para testar
npm run build

# 2. Testar container Docker localmente
docker build -t ideiaflow:test .
docker run -p 3000:80 ideiaflow:test
```

### 2. **Deploy no EasyPanel**

#### Opção A: Deploy Automático via Git

1. Faça push do código para seu repositório Git
2. No EasyPanel, crie uma nova aplicação
3. Conecte ao seu repositório
4. O EasyPanel detectará automaticamente o `easypanel.json`
5. Configure as variáveis de ambiente se necessário
6. Faça o deploy!

#### Opção B: Deploy Manual

1. Acesse o painel do EasyPanel
2. Crie uma nova aplicação
3. Selecione "Docker" como tipo
4. Faça upload dos arquivos ou conecte ao Git
5. Configure o domínio
6. Inicie o deploy

### 3. **Configurações Importantes**

#### Variáveis de Ambiente
```env
NODE_ENV=production
```

#### Recursos Recomendados
- **CPU**: 0.5 cores
- **Memória**: 512MB
- **Storage**: 1GB

#### Domínio
- Configure seu domínio no EasyPanel
- O SSL será configurado automaticamente

## 🔧 Configurações Avançadas

### Health Check
O aplicativo inclui um endpoint de health check em `/health`

### Escalabilidade
- Mínimo: 1 réplica
- Máximo: 3 réplicas (ajustável conforme necessidade)

### Cache
- Assets estáticos são cacheados por 1 ano
- Compressão gzip habilitada

## 🐛 Troubleshooting

### Problemas Comuns

1. **Build falha**
   ```bash
   # Limpar cache e reinstalar dependências
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Container não inicia**
   ```bash
   # Verificar logs do container
   docker logs <container-id>
   ```

3. **Aplicação não carrega**
   - Verificar se a porta 80 está exposta
   - Verificar configuração do Nginx
   - Verificar health check endpoint

### Logs e Monitoramento

- Acesse os logs pelo painel do EasyPanel
- Use o endpoint `/health` para monitoramento
- Configure alertas conforme necessário

## 📱 Acesso à Aplicação

Após o deploy bem-sucedido:

- **URL Principal**: `https://seu-dominio.com`
- **Tela de Login**: `https://seu-dominio.com/login`
- **Health Check**: `https://seu-dominio.com/health`

## 🔄 Atualizações

Para atualizar a aplicação:

1. Faça as alterações no código
2. Commit e push para o repositório
3. O EasyPanel fará o redeploy automaticamente

Ou use o script de deploy:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📞 Suporte

- Documentação do EasyPanel: https://easypanel.io/docs
- Issues do projeto: [GitHub Issues]
- Contato: [seu-email@exemplo.com]
