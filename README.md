# 🧞‍♂️ Gênio da Garrafa 🔮

Um assistente simples e direto para encontrar o rolê perfeito.

## 🎯 Sobre o Projeto

O Gênio da Garrafa é uma aplicação web (PWA) pensada para resolver a eterna dúvida: "Para onde vamos hoje?". Com base em algumas perguntas simples sobre a "vibe" (clima) e o orçamento desejado, o Gênio oferece uma sugestão de lugar para ir.

Este projeto nasceu como um esboço para demonstrar uma solução rápida e divertida para a descoberta de locais, com foco inicial em uma curadoria de lugares específicos.

## ✨ Funcionalidades

*   **Seleção de "Vibe"**: Escolha entre `Tranquilo`, `Agitado` ou `Romântico`.
*   **Seleção de Orçamento**: Defina o custo do local (`💰`, `💰💰`, `💰💰💰`).
*   **Sugestão Mágica**: Receba uma sugestão baseada nas suas escolhas.
*   **Estou com Sorte**: Deixe o Gênio escolher um lugar aleatório para você.
*   **Detalhes Completos**: Visualize horários de funcionamento, promoções especiais e fotos recentes.
*   **Listar Tudo**: Veja todas as opções disponíveis, organizadas por categoria.
*   **Busca e Filtros**: Pesquise locais por nome e filtre rapidamente por promoções ativas.
*   **Feed Personalizado**: Acompanhe fotos e promoções dos locais que você segue.
*   **Mapa**: Links diretos para o endereço no Google Maps.

## ⚠️ Status do Projeto: Versão Inicial

Este é um protótipo inicial. Atualmente, as sugestões de locais estão **focadas na cidade de São Paulo, especialmente na região de Pinheiros**. A base de dados é pequena e serve como prova de conceito.

### 🚀 Roadmap

*   [ ] Expansão da base de dados para outros bairros e cidades.
*   [ ] Filtros por características (ex: Pet Friendly, Música ao Vivo).
*   [ ] Integração com APIs de mapas.
*   [ ] Sistema de avaliação de usuários.

## 🔧 Como Usar

1.  Acesse a página.
2.  Na tela de perguntas, selecione a vibe e o orçamento.
3.  Clique em "Pedir Sugestão" ou "Estou com Sorte".
4.  Para ver todas as opções, clique em "Ver Todas as Opções".

## 📂 Estrutura de Dados

As sugestões são alimentadas pelo arquivo `sugestoes.json`. Cada local possui:
*   **Vibe**: Categoria do ambiente (`Tranquilo`, `Agitado`, `Romântico`).
*   **Budget**: Faixa de preço.
*   **Posts**: Imagens simulando um feed social.
*   **Promotion**: Promoções ativas (quando houver).

## 📜 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
