// Seleção dos elementos do DOM
const screens = document.querySelectorAll('.screen');
const onboardingScreen = document.getElementById('onboarding-screen');
const questionsScreen = document.getElementById('questions-screen');
const suggestionScreen = document.getElementById('suggestion-screen');
const feedScreen = document.getElementById('feed-screen');
const feedbackScreen = document.getElementById('feedback-screen');


const btnOnboarding = document.getElementById('btn-onboarding');
const btnSuggest = document.getElementById('btn-suggest');
const btnLucky = document.getElementById('btn-lucky');
const btnBack = document.getElementById('btn-back');

const suggestionCard = document.getElementById('suggestion-card');
const crystalBalls = document.querySelectorAll('.crystal-ball'); // Seleciona TODOS os elementos da bola de cristal
const listScreen = document.getElementById('list-screen');
const allSuggestionsList = document.getElementById('all-suggestions-list');
const btnListAll = document.getElementById('btn-list-all');
const btnBackFromList = document.getElementById('btn-back-from-list');
const btnBackFromListHeader = document.getElementById('btn-back-from-list-header');
const btnFeed = document.getElementById('btn-feed');
const btnBackFromFeed = document.getElementById('btn-back-from-feed');
const btnEvaluate = document.getElementById('btn-evaluate');
const btnShare = document.getElementById('btn-share');
const btnSubmitFeedback = document.getElementById('btn-submit-feedback');
const btnCancelFeedback = document.getElementById('btn-cancel-feedback');
const searchInput = document.getElementById('search-input');
const btnFilterPromo = document.getElementById('btn-filter-promo');


// Emojis para a transição
const emojis = ['🍻', '☕', '🍸', '🍽️', '🎶', '🎉', '🍕', '📍', '🍔', '🍷', '🍦', '🌮', '🍜', '🍰', '🕺', '🎷'];
let currentEmojiIndex = 0;

// Função para trocar o emoji da bola de cristal
function changeCrystalBallEmoji() {
    // Itera sobre todas as bolas de cristal encontradas
    crystalBalls.forEach(ball => {
        ball.classList.add('fade-out'); // Adiciona classe para fade-out
        setTimeout(() => {
            // O cálculo do índice é feito apenas uma vez
            const nextEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
            ball.textContent = emojis[nextEmojiIndex];
            ball.classList.remove('fade-out'); // Remove para fade-in
        }, 200); // Tempo para o fade-out
    });
    currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length; // Atualiza o índice para a próxima rodada
}

// Inicia a transição de emojis a cada 1 segundo
setInterval(changeCrystalBallEmoji, 1000);

// --- Banco de Dados de Sugestões (Carregado do JSON) ---
let suggestions = [];

// --- Variável para guardar a sugestão atual ---
let currentSuggestion = null;

// --- Gerenciamento de "Seguindo" (Follows) ---
const FOLLOW_KEY = 'followed_establishments';
const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;

function getFollowed() {
    const followed = JSON.parse(localStorage.getItem(FOLLOW_KEY)) || {};
    const now = new Date().getTime();
    // Filtra os follows que expiraram
    const validFollows = {};
    for (const id in followed) {
        if (now < followed[id].expiresAt) {
            validFollows[id] = followed[id];
        }
    }
    localStorage.setItem(FOLLOW_KEY, JSON.stringify(validFollows));
    return validFollows;
}

function toggleFollow(establishmentId) {
    const followed = getFollowed();
    if (followed[establishmentId]) {
        delete followed[establishmentId]; // Deixar de seguir
    } else {
        followed[establishmentId] = { expiresAt: new Date().getTime() + TWENTY_FOUR_HOURS_IN_MS }; // Seguir
    }
    localStorage.setItem(FOLLOW_KEY, JSON.stringify(followed));
}

// --- Gerenciamento de "Curtidas" (Likes) ---
const LIKED_POSTS_KEY = 'liked_posts';

function getLikedPosts() {
    return JSON.parse(localStorage.getItem(LIKED_POSTS_KEY)) || [];
}

function toggleLike(postId) {
    let likedPosts = getLikedPosts();
    if (likedPosts.includes(postId)) {
        likedPosts = likedPosts.filter(id => id !== postId); // Descurtir
    } else {
        likedPosts.push(postId); // Curtir
    }
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(likedPosts));
}

// --- Sistema de Toast (Notificações) ---
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    
    container.appendChild(toast);

    // Pequeno delay para permitir a transição CSS
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Função para gerenciar a troca de telas
function showScreen(screenToShow) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
}

// Estado do filtro de promoções
let isPromoFilterActive = false;

// Função para popular a lista de todos os estabelecimentos
function populateListScreen(suggestionsData, filterText = '') {
    const followed = getFollowed();
    allSuggestionsList.innerHTML = ''; // Limpa a lista existente
    const categories = {
        'Agitado': [],
        'Tranquilo': [],
        'Romântico': []
    };

    const term = filterText.toLowerCase();

    // Agrupa as sugestões por categoria (vibe)
    suggestionsData.forEach(suggestion => {
        // Filtra por texto
        const matchesText = suggestion.name.toLowerCase().includes(term) || 
                            suggestion.address.toLowerCase().includes(term) ||
                            suggestion.description.toLowerCase().includes(term);
        
        // Filtra por promoção (se o botão estiver ativo)
        const matchesPromo = isPromoFilterActive ? !!suggestion.promotion : true;

        if (matchesText && matchesPromo) {
            categories[suggestion.vibe].push(suggestion);
        }
    });

    // Cria o HTML para cada categoria
    for (const category in categories) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h2');
        // Se a categoria estiver vazia devido ao filtro, não mostramos o título
        if (categories[category].length === 0) continue;
        categoryTitle.innerText = category;
        categoryContainer.appendChild(categoryTitle);

        categories[category].forEach(suggestion => {
            const item = document.createElement('div');
            item.classList.add('list-item');
            const isFollowing = !!followed[suggestion.id];
            const promotionHTML = suggestion.promotion ? `<div class="promotion-banner">🎉 ${suggestion.promotion}</div>` : '';
            item.innerHTML = `
                <h3>
                    ${suggestion.name}
                    <button class="btn-follow ${isFollowing ? 'following' : ''}" data-id="${suggestion.id}">
                        ${isFollowing ? 'Seguindo 🌟' : 'Seguir 24h'}
                    </button>
                </h3>
                <p><small>${suggestion.horario}</small></p>
                <p><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(suggestion.address)}" target="_blank">📍 ${suggestion.address}</a></p>
                ${promotionHTML}
            `;
            categoryContainer.appendChild(item);
        });

        allSuggestionsList.appendChild(categoryContainer);
    }

    if (allSuggestionsList.innerHTML === '') {
        allSuggestionsList.innerHTML = '<p style="text-align:center; color: white; margin-top: 20px;">Nenhum local encontrado com esse termo.</p>';
    }

    // Adiciona o listener para os botões de seguir
    allSuggestionsList.querySelectorAll('.btn-follow').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            toggleFollow(id);
            // Atualiza a aparência do botão sem recarregar a tela inteira
            const isFollowing = e.target.classList.toggle('following');
            e.target.textContent = isFollowing ? 'Seguindo 🌟' : 'Seguir 24h';
            if (isFollowing) showToast('Você está seguindo este local por 24h!');
        });
    });
}

// Função para popular a tela de Feed
function populateFeedScreen() {
    const feedContent = document.getElementById('feed-content');
    feedContent.innerHTML = ''; // Limpa o feed

    const likedPosts = getLikedPosts();
    const followed = getFollowed();
    const followedIds = Object.keys(followed);

    if (followedIds.length === 0) {
        feedContent.innerHTML = '<p style="text-align: center; color: #666;">Você ainda não está seguindo nenhum estabelecimento. Vá para "Ver Todas as Opções" e siga alguns para ver os posts aqui!</p>';
        return;
    }

    const posts = [];
    suggestions.forEach(establishment => {
        if (followedIds.includes(establishment.id.toString())) {
            if (establishment.posts && establishment.posts.length > 0) {
                establishment.posts.forEach(post => {
                    posts.push({ ...post, establishmentName: establishment.name, type: 'post' });
                });
            }
            if (establishment.promotion) {
                // Usa a data do último post para misturar a promoção no feed, evitando que fiquem todas no topo
                let promoTimestamp = new Date().toISOString();
                if (establishment.posts && establishment.posts.length > 0) {
                    const latestPost = establishment.posts.reduce((a, b) => new Date(a.timestamp) > new Date(b.timestamp) ? a : b);
                    promoTimestamp = latestPost.timestamp;
                }

                posts.push({
                    type: 'promotion',
                    establishmentName: establishment.name,
                    caption: establishment.promotion,
                    timestamp: promoTimestamp
                });
            }
        }
    });

    // Ordena os posts pelo mais recente (simulado pelo timestamp)
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (posts.length === 0) {
        feedContent.innerHTML = '<p style="text-align: center; color: #666;">Nenhum post novo dos estabelecimentos que você segue.</p>';
        return;
    }

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';

        if (post.type === 'promotion') {
            postCard.innerHTML = `
                <div class="post-header">
                    <h3>${post.establishmentName}</h3>
                </div>
                <div style="padding: 30px 20px; text-align: center; background: linear-gradient(135deg, #ffc107 0%, #ffca2c 100%);">
                    <div style="font-size: 3em; margin-bottom: 10px;">🎉</div>
                    <h2 style="color: #333; margin: 0; font-size: 1.3em; font-weight: bold;">${post.caption}</h2>
                </div>
                <div class="post-caption">
                    <p><strong>Promoção Especial!</strong> Aproveite enquanto dura.</p>
                </div>
            `;
        } else {
            const isLiked = likedPosts.includes(post.postId);
            postCard.innerHTML = `
                <div class="post-header">
                    <h3>${post.establishmentName}</h3>
                </div>
                <img src="${post.url}" alt="Post de ${post.establishmentName}" class="post-image">
                <div class="post-actions">
                    <button class="post-like-btn ${isLiked ? 'liked' : ''}" data-post-id="${post.postId}">❤️</button>
                </div>
                <div class="post-caption">
                    <p>${post.caption}</p>
                </div>
            `;
        }
        feedContent.appendChild(postCard);
    });

    // Adiciona listeners para os botões de like
    feedContent.querySelectorAll('.post-like-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = parseInt(e.target.dataset.postId, 10);
            if (!postId) return;

            // Salva o estado da curtida
            toggleLike(postId);

            // Atualiza a aparência do botão
            e.target.classList.toggle('liked');
        });
    });
}

// Ações dos botões
btnOnboarding.addEventListener('click', () => showScreen(questionsScreen));

btnFeed.addEventListener('click', () => {
    populateFeedScreen();
    showScreen(feedScreen);
});

btnBackFromFeed.addEventListener('click', () => showScreen(questionsScreen));

// Função auxiliar para criar um atraso (promessa)
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

btnSuggest.addEventListener('click', async () => {
    const selectedVibeBtn = document.querySelector('#vibe-options .selected');
    const selectedBudgetBtn = document.querySelector('#budget-options .selected');

    if (!selectedVibeBtn || !selectedBudgetBtn) {
        showToast("Por favor, selecione uma vibe e um orçamento!");
        return;
    }

    // Efeito de "Pensando"
    const originalText = btnSuggest.innerText;
    btnSuggest.innerText = "🔮 Consultando os astros...";
    btnSuggest.disabled = true;

    await wait(1500); // Espera 1.5 segundos para dar suspense

    const vibe = selectedVibeBtn.dataset.value;
    const budget = selectedBudgetBtn.dataset.value;

    const filteredSuggestions = suggestions.filter(place => place.vibe === vibe && place.budget === budget);

    const suggestionTitle = suggestionCard.querySelector('h2');
    const suggestionDescription = suggestionCard.querySelector('p');
    const suggestionHours = document.getElementById('suggestion-hours');
    const suggestionAddress = document.getElementById('suggestion-address');
    const suggestionPromotion = document.getElementById('suggestion-promotion');

    if (filteredSuggestions.length > 0) {
        const randomSuggestion = filteredSuggestions[Math.floor(Math.random() * filteredSuggestions.length)];
        currentSuggestion = randomSuggestion; // Guarda a sugestão atual
        suggestionTitle.innerText = randomSuggestion.name;
        suggestionDescription.innerText = randomSuggestion.description;
        suggestionHours.innerText = "Horário: " + randomSuggestion.horario;
        suggestionAddress.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(randomSuggestion.address)}" target="_blank">📍 Endereço: ${randomSuggestion.address}</a>`;

        if (randomSuggestion.promotion) {
            suggestionPromotion.innerHTML = `<div class="promotion-banner">🎉 ${randomSuggestion.promotion}</div>`;
        } else {
            suggestionPromotion.innerHTML = '';
        }
    } else {
        currentSuggestion = null; // Limpa a sugestão atual
        suggestionTitle.innerText = "Hmm, não encontrei nada!";
        suggestionDescription.innerHTML = 'Parece que o gênio não tem uma sugestão para essa combinação. Que tal <a href="#" id="link-show-all">ver todas as opções</a>?';
        suggestionHours.innerText = "";
        suggestionAddress.innerHTML = "";
        suggestionPromotion.innerHTML = '';

        // Adiciona o listener para o link recém-criado
        document.getElementById('link-show-all').addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            showScreen(listScreen);
        });
    }

    // Restaura o botão
    btnSuggest.innerText = originalText;
    btnSuggest.disabled = false;

    showScreen(suggestionScreen);
    suggestionCard.style.display = 'block';
});

btnBack.addEventListener('click', () => {
    showScreen(questionsScreen);
    suggestionCard.style.display = 'none';
});

btnListAll.addEventListener('click', () => {
    // Repopula a lista para garantir que os botões de seguir estejam atualizados
    populateListScreen(suggestions);
    searchInput.value = ''; // Limpa a busca ao abrir
    showScreen(listScreen);
});
btnBackFromList.addEventListener('click', () => showScreen(questionsScreen));
btnBackFromListHeader.addEventListener('click', () => showScreen(questionsScreen));

btnLucky.addEventListener('click', async () => {
    // Efeito de "Pensando"
    const originalText = btnLucky.innerText;
    btnLucky.innerText = "🎲 Embaralhando...";
    btnLucky.disabled = true;

    await wait(1500); // Espera 1.5 segundos

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    currentSuggestion = randomSuggestion; // Guarda a sugestão atual

    const suggestionTitle = suggestionCard.querySelector('h2');
    const suggestionDescription = suggestionCard.querySelector('p');
    const suggestionHours = document.getElementById('suggestion-hours');
    const suggestionAddress = document.getElementById('suggestion-address');
    const suggestionPromotion = document.getElementById('suggestion-promotion');

    suggestionTitle.innerText = randomSuggestion.name;
    suggestionDescription.innerText = randomSuggestion.description;
    suggestionHours.innerText = "Horário: " + randomSuggestion.horario;
    suggestionAddress.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(randomSuggestion.address)}" target="_blank">📍 Endereço: ${randomSuggestion.address}</a>`;

    if (randomSuggestion.promotion) {
        suggestionPromotion.innerHTML = `<div class="promotion-banner">🎉 ${randomSuggestion.promotion}</div>`;
    } else {
        suggestionPromotion.innerHTML = '';
    }

    // Restaura o botão
    btnLucky.innerText = originalText;
    btnLucky.disabled = false;

    showScreen(suggestionScreen);
    suggestionCard.style.display = 'block';
});

btnEvaluate.addEventListener('click', () => {
    if (!currentSuggestion) return;

    document.getElementById('feedback-establishment-name').innerText = currentSuggestion.name;
    // Limpa qualquer seleção anterior
    document.querySelectorAll('#feedback-options .question-btn').forEach(btn => btn.classList.remove('selected'));
    showScreen(feedbackScreen);
});

btnCancelFeedback.addEventListener('click', () => {
    showScreen(suggestionScreen);
});

btnSubmitFeedback.addEventListener('click', () => {
    const selectedFeedback = document.querySelector('#feedback-options .selected');
    if (!selectedFeedback) {
        alert('Por favor, selecione uma opção para o ambiente.');
        return;
    }
    // Por enquanto, apenas mostramos um alerta. No futuro, isso enviaria os dados para um servidor.
    showToast(`Obrigado! Feedback enviado: ${selectedFeedback.innerText}`);
    showScreen(suggestionScreen);
});

btnShare.addEventListener('click', async () => {
    if (!currentSuggestion) return;

    const shareData = {
        title: 'Sugestão do Gênio da Garrafa',
        text: `Bora pro ${currentSuggestion.name}? A vibe é ${currentSuggestion.vibe} e o orçamento é ${currentSuggestion.budget}. \n\n📍 Endereço: ${currentSuggestion.address}`,
        url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentSuggestion.address)}`
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback para navegadores que não suportam Web Share API (Desktop)
            const textToCopy = `${shareData.text}\n${shareData.url}`;
            await navigator.clipboard.writeText(textToCopy);
            showToast('Sugestão copiada para a área de transferência!');
        }
    } catch (err) {
        console.error('Erro ao compartilhar:', err);
    }
});

// Listener para a barra de busca
searchInput.addEventListener('input', (e) => {
    populateListScreen(suggestions, e.target.value);
});

// Listener para o botão de filtro de promoções
btnFilterPromo.addEventListener('click', () => {
    isPromoFilterActive = !isPromoFilterActive;
    btnFilterPromo.classList.toggle('active');
    populateListScreen(suggestions, searchInput.value);
});

// Ação de seleção dos botões de perguntas
document.querySelectorAll('.question-btn').forEach(button => {
    button.addEventListener('click', () => {
        const group = button.parentElement;
        
        // Remove seleção visual e semântica dos irmãos
        group.querySelectorAll('.question-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.setAttribute('aria-pressed', 'false');
        });

        // Adiciona seleção ao clicado
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
    });
});

// Carrega os dados do JSON e inicializa a aplicação
async function initializeApp() {
    try {
        const response = await fetch('sugestoes.json');
        suggestions = await response.json();
        // Popula a lista principal na inicialização
        populateListScreen(suggestions);
    } catch (error) {
        console.error('Falha ao carregar as sugestões:', error);
        allSuggestionsList.innerHTML = '<p style="color: red; text-align: center;">Não foi possível carregar as sugestões. Tente novamente mais tarde.</p>';
    }
}

// Inicia a aplicação
document.addEventListener('DOMContentLoaded', initializeApp);

// --- Registro do Service Worker (PWA) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(error => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}
