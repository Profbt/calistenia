# Calistenia
App estático (HTML/CSS/JS), sem build. Para testar: `python3 -m http.server` nesta pasta e abra http://localhost:8000.
Instalar no celular / modo offline (PWA) exige HTTPS (ou localhost). Ao alterar arquivos, troque o número de versão do cache (`calis-vN`) em `sw.js`.

- **Novo exercício:** linha em `EX` (`js/data.js`) + imagens `img/<id>-start.webp` e `-peak.webp` (ou `-main.webp`, e inclua o id em `STATIC`; se for isométrico, inclua em `ISO`).
- **Vídeo próprio ou do Zanon Macedo:** `DEMO['plank']='https://youtu.be/...'` (use o link oficial; não copie o vídeo).
- **Treinos:** níveis em `LV`, focos em `FOC`, variações A/B/C em `SUB` e `SUB2`, durações (15/20/25/30 min) em `PRE`.
- **Recordes:** no descanso entre exercícios você registra as repetições; ficam em `calis_reps`. Aba Progresso tem Exportar/Importar backup.
- **Desconforto:** `STRESS` (js/data.js) lista os exercícios que sobrecarregam cada região; o botão 🔄 no treino e o card "Evitar por desconforto" usam isso.
- Histórico antigo (`calis_level`, `calis_dates`) é reaproveitado automaticamente.

## Créditos
Ilustrações e dados dos exercícios: Exercise data by RepDB (https://repdb.co), licença gratuita com atribuição (uso dentro do app; não redistribuir como dataset).
Conteúdo informativo, não é orientação médica.
