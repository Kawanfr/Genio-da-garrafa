// Seleção dos elementos do DOM
const screens = document.querySelectorAll('.screen');
const onboardingScreen = document.getElementById('onboarding-screen');
const questionsScreen = document.getElementById('questions-screen');
const suggestionScreen = document.getElementById('suggestion-screen');

const btnOnboarding = document.getElementById('btn-onboarding');
const btnSuggest = document.getElementById('btn-suggest');
const btnLucky = document.getElementById('btn-lucky');
const btnBack = document.getElementById('btn-back');

const suggestionCard = document.getElementById('suggestion-card');
const crystalBall = document.querySelector('.crystal-ball'); // Seleciona o elemento da bola de cristal
const listScreen = document.getElementById('list-screen');
const allSuggestionsList = document.getElementById('all-suggestions-list');
const btnListAll = document.getElementById('btn-list-all');
const btnBackFromList = document.getElementById('btn-back-from-list');

// Emojis para a transição
const emojis = ['🍻', '☕', '🍸', '🍽️', '🎶', '🎉', '🍕', '📍'];
let currentEmojiIndex = 0;

// Função para trocar o emoji da bola de cristal
function changeCrystalBallEmoji() {
    crystalBall.classList.add('fade-out'); // Adiciona classe para fade-out
    setTimeout(() => {
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
        crystalBall.textContent = emojis[currentEmojiIndex];
        crystalBall.classList.remove('fade-out'); // Remove para fade-in
    }, 200); // Tempo para o fade-out
}

// Inicia a transição de emojis a cada 1 segundo
setInterval(changeCrystalBallEmoji, 1000);


// --- Banco de Dados de Sugestões ---
const suggestions = [
    // --- Agitado ---
    { name: "Noname Boteco", vibe: "Agitado", budget: "R$", description: "Cerveja gelada e petiscos em um ambiente despojado com cadeiras de praia.", horario: "Seg-Qua: 18h-00h, Qui-Sex: 18h-01h, Sáb: 17h-01h", address: "Rua dos Pinheiros, 585 - Pinheiros, São Paulo - SP" },
    { name: "Estepe Bar", vibe: "Agitado", budget: "R$", description: "Bar de esquina com mesinhas na calçada, conhecido por atrair um público jovem e descolado.", horario: "Seg-Dom: 15h-00h", address: "Rua Cunha Gago, 588 - Pinheiros, São Paulo - SP" },
    { name: "Pirajá", vibe: "Agitado", budget: "R$", description: "Famoso pelo chopp gelado e clima de boteco carioca.", horario: "Seg-Dom: 12h-00h", address: "Avenida Brigadeiro Faria Lima, 64 - Pinheiros, São Paulo - SP" },
    { name: "Pitico", vibe: "Agitado", budget: "R$", description: "Quintal descontraído com cadeiras de praia, ótimo para ir em grupo.", horario: "Ter-Sex: 16h-22h, Sáb-Dom: 14h-22h", address: "Rua Guaicuí, 61 - Pinheiros, São Paulo - SP" },
    { name: "Guilhotina Bar", vibe: "Agitado", budget: "R$", description: "Bar de coquetelaria premiado, para quem busca drinks de alta qualidade.", horario: "Ter-Sex: 18h-01h, Sáb: 17h-01h", address: "Rua Costa Carvalho, 84 - Pinheiros, São Paulo - SP" },
    { name: "Casa Natura Musical", vibe: "Agitado", budget: "R$", description: "Palco para grandes nomes e novos talentos da música brasileira.", horario: "Shows a partir das 17h (consultar agenda)", address: "Rua Artur de Azevedo, 2134 - Pinheiros, São Paulo - SP" },
    { name: "D-EDGE", vibe: "Agitado", budget: "R$", description: "Para quem quer dançar a noite toda ao som dos melhores DJs.", horario: "Sex-Sáb: 23h-06h", address: "Avenida Auro Soares de Moura Andrade, 141 - Barra Funda, São Paulo - SP" },

    // --- Tranquilo ---
    { name: "Café Habitual", vibe: "Tranquilo", budget: "R$", description: "Ambiente agradável que funciona das 8h às 18h, ótimo para um café durante o dia.", horario: "Seg-Dom: 08h-18h", address: "Rua Cônego Eugênio Leite, 1152 - Pinheiros, São Paulo - SP" },
    { name: "Por um Punhado de Dólares", vibe: "Tranquilo", budget: "R$", description: "Café com personalidade, bom Wi-Fi e preços justos. Ambiente retrô.", horario: "Seg-Sáb: 10h-22h", address: "Rua Nestor Pestana, 115 - Consolação, São Paulo - SP" },
    { name: "Feira da Benedito Calixto", vibe: "Tranquilo", budget: "R$", description: "Um passeio de sábado para caminhar e olhar antiguidades.", horario: "Sábados: 09h-19h", address: "Praça Benedito Calixto, s/n - Pinheiros, São Paulo - SP" },
    { name: "Sofá Café", vibe: "Tranquilo", budget: "R$", description: "Ambiente super aconchegante para um café especial.", horario: "Seg-Sex: 8h-18:30h, Sáb: 10h-18h", address: "Rua Bianchi Bertoldi, 130 - Pinheiros, São Paulo - SP" },
    { name: "King of The Fork (KOF)", vibe: "Tranquilo", budget: "R$", description: "Mistura de café de alta qualidade com cultura do ciclismo.", horario: "Seg-Sex: 07:30-19h, Sáb: 09h-18h", address: "Rua Artur de Azevedo, 1317 - Pinheiros, São Paulo - SP" },
    { name: "Gaarden Bar", vibe: "Tranquilo", budget: "R$", description: "Espaço aberto e cheio de plantas, com atmosfera relaxante.", horario: "Ter-Qui: 12h-00h, Sex-Sáb: 12h-01h, Dom: 12h-18h", address: "Rua Fernão Dias, 672 - Pinheiros, São Paulo - SP" },
    { name: "Frida & Mina", vibe: "Tranquilo", budget: "R$", description: "Sorvetes artesanais com ingredientes orgânicos e sazonais, sem conservantes.", horario: "Ter-Dom: 12h-20h", address: "Rua Guaicuí, 26 - Pinheiros, São Paulo - SP" },
    { name: "Albero dei Gelati", vibe: "Tranquilo", budget: "R$", description: "Gelateria italiana que usa ingredientes naturais e frescos de pequenos produtores.", horario: "Seg-Dom: 10h-23h", address: "Rua dos Pinheiros, 342 - Pinheiros, São Paulo - SP" },

    // --- Romântico ---
    { name: "Prosa e Vinho", vibe: "Romântico", budget: "R$", description: "Misto de loja e bar com vinhos acessíveis de mais de 15 países.", horario: "Seg-Qua: 12h-22h, Qui-Sex: 12h-23h, Sáb: 12h-22h", address: "Praça Dom José Gaspar, 106 - República, São Paulo - SP" },
    { name: "Jazz nos Fundos", vibe: "Romântico", budget: "R$", description: "Para casais que gostam de música, com entrada acessível.", horario: "Ter-Sáb: a partir das 19h", address: "Rua Cardeal Arcoverde, 742 - Pinheiros, São Paulo - SP" },
    { name: "Praça do Pôr do Sol", vibe: "Romântico", budget: "R$", description: "Gratuito e muito romântico para um fim de tarde.", horario: "Aberto 24h", address: "Praça Coronel Custódio Fernandes Pinheiro, 334 - Alto de Pinheiros, São Paulo - SP" },
    { name: "Chou", vibe: "Romântico", budget: "R$", description: "Quintal charmoso com luzinhas, especializado em grelhados.", horario: "Ter-Qui: 19h-23:30h, Sex: 19h-00h, Sáb: 13h-16h e 19:30h-00h", address: "Rua Mateus Grou, 345 - Pinheiros, São Paulo - SP" },
    { name: "Le Jazz Brasserie", vibe: "Romântico", budget: "R$", description: "Clássico bistrô francês com ambiente à meia-luz.", horario: "Dom-Qui: 12h-00h, Sex-Sáb: 12h-01h", address: "Rua dos Pinheiros, 254 - Pinheiros, São Paulo - SP" },
    { name: "Bottega 21", vibe: "Romântico", budget: "R$", description: "Bar de vinhos e restaurante italiano, muito acolhedor.", horario: "Seg-Sáb: 19h-01h", address: "Rua dos Pinheiros, 1308 - Pinheiros, São Paulo - SP" },
    { name: "Blue Note São Paulo", vibe: "Romântico", budget: "R$$", description: "Famoso clube de jazz com shows intimistas e ambiente sofisticado na Av. Paulista.", horario: "Shows às 20h e 22h30 (consultar agenda)", address: "Avenida Paulista, 2073 - 2º Andar - Consolação, São Paulo - SP" }
];

// Função para gerenciar a troca de telas
function showScreen(screenToShow) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
}

// Função para popular a lista de todos os estabelecimentos
function populateListScreen() {
    allSuggestionsList.innerHTML = ''; // Limpa a lista existente
    const categories = {
        'Agitado': [],
        'Tranquilo': [],
        'Romântico': []
    };

    // Agrupa as sugestões por categoria (vibe)
    suggestions.forEach(suggestion => {
        categories[suggestion.vibe].push(suggestion);
    });

    // Cria o HTML para cada categoria
    for (const category in categories) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h2');
        categoryTitle.innerText = category;
        categoryContainer.appendChild(categoryTitle);

        categories[category].forEach(suggestion => {
            const item = document.createElement('div');
            item.classList.add('list-item');
            item.innerHTML = `
                <h3>${suggestion.name} <span class="budget">${suggestion.budget}</span></h3>
                <p><small>${suggestion.horario}</small></p>
                <p><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(suggestion.address)}" target="_blank">📍 ${suggestion.address}</a></p>
            `;
            categoryContainer.appendChild(item);
        });

        allSuggestionsList.appendChild(categoryContainer);
    }
}

// Ações dos botões
btnOnboarding.addEventListener('click', () => showScreen(questionsScreen));

btnSuggest.addEventListener('click', () => {
    const selectedVibeBtn = document.querySelector('#vibe-options .selected');
    const selectedBudgetBtn = document.querySelector('#budget-options .selected');

    if (!selectedVibeBtn || !selectedBudgetBtn) {
        alert("Por favor, selecione uma vibe e um orçamento para o gênio te ajudar!");
        return;
    }

    const vibe = selectedVibeBtn.innerText;
    const budget = selectedBudgetBtn.innerText;

    const filteredSuggestions = suggestions.filter(place => place.vibe === vibe && place.budget === budget);

    const suggestionTitle = suggestionCard.querySelector('h2');
    const suggestionDescription = suggestionCard.querySelector('p');
    const suggestionHours = document.getElementById('suggestion-hours');
    const suggestionAddress = document.getElementById('suggestion-address');

    if (filteredSuggestions.length > 0) {
        const randomSuggestion = filteredSuggestions[Math.floor(Math.random() * filteredSuggestions.length)];
        suggestionTitle.innerText = randomSuggestion.name;
        suggestionDescription.innerText = randomSuggestion.description;
        suggestionHours.innerText = "Horário: " + randomSuggestion.horario;
        suggestionAddress.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(randomSuggestion.address)}" target="_blank">📍 Endereço: ${randomSuggestion.address}</a>`;
    } else {
        suggestionTitle.innerText = "Hmm, não encontrei nada!";
        suggestionDescription.innerHTML = 'Parece que o gênio não tem uma sugestão para essa combinação. Que tal <a href="#" id="link-show-all">ver todas as opções</a>?';
        suggestionHours.innerText = "";
        suggestionAddress.innerHTML = "";

        // Adiciona o listener para o link recém-criado
        document.getElementById('link-show-all').addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            showScreen(listScreen);
        });
    }

    showScreen(suggestionScreen);
    suggestionCard.style.display = 'block';
});

btnBack.addEventListener('click', () => {
    showScreen(questionsScreen);
    suggestionCard.style.display = 'none';
});

btnListAll.addEventListener('click', () => showScreen(listScreen));
btnBackFromList.addEventListener('click', () => showScreen(questionsScreen));

btnLucky.addEventListener('click', () => {
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    const suggestionTitle = suggestionCard.querySelector('h2');
    const suggestionDescription = suggestionCard.querySelector('p');
    const suggestionHours = document.getElementById('suggestion-hours');
    const suggestionAddress = document.getElementById('suggestion-address');

    suggestionTitle.innerText = randomSuggestion.name;
    suggestionDescription.innerText = randomSuggestion.description;
    suggestionHours.innerText = "Horário: " + randomSuggestion.horario;
    suggestionAddress.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(randomSuggestion.address)}" target="_blank">📍 Endereço: ${randomSuggestion.address}</a>`;

    showScreen(suggestionScreen);
    suggestionCard.style.display = 'block';
});

// Ação de seleção dos botões de perguntas
document.querySelectorAll('.question-btn').forEach(button => {
    button.addEventListener('click', () => {
        const group = button.parentElement;
        group.querySelectorAll('.question-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

// Popula a lista de estabelecimentos ao carregar a página
document.addEventListener('DOMContentLoaded', populateListScreen);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
