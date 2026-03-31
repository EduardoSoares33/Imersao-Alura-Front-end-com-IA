// ===== DARK/LIGHT MODE FUNCTIONALITY =====

// Seleciona o botão de toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Alternar entre modo escuro e claro');
themeToggle.setAttribute('title', 'Alternar tema');

// Adiciona o botão ao body
document.body.appendChild(themeToggle);

// Verifica se há preferência salva no localStorage
const savedTheme = localStorage.getItem('theme');

// Aplica o tema salvo ou usa o padrão do sistema
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
} else if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
} else {
    // Se não há preferência salva, usa a do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }
}

// Função para alternar entre os temas
function toggleTheme() {
    const body = document.body;

    if (body.classList.contains('light-mode')) {
        // Muda para dark mode
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        // Muda para light mode
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Adiciona o event listener ao botão
themeToggle.addEventListener('click', toggleTheme);

// Adiciona suporte para mudança automática baseada na preferência do sistema
if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Função para atualizar o tema baseado na preferência do sistema
    function updateThemeFromSystem(e) {
        // Só atualiza se não há tema salvo manualmente
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
            } else {
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
            }
        }
    }

    // Adiciona listener para mudanças na preferência do sistema
    colorSchemeQuery.addEventListener('change', updateThemeFromSystem);
}

// ===== PROFILE SELECTION FUNCTIONALITY =====

// Seleciona todos os botões de perfil
const profileButtons = document.querySelectorAll('.profile button');

// Adiciona evento de clique para cada botão de perfil
profileButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Impede o comportamento padrão do formulário (se houver)
        event.preventDefault();

        // Extrai o nome do perfil do elemento figcaption
        const figcaption = button.querySelector('figcaption');
        const nomePerfil = figcaption ? figcaption.textContent : 'Desconhecido';

        // Extrai a imagem do perfil do elemento img
        const img = button.querySelector('img');
        const imagemPerfil = img ? img.src : '';

        // Armazena o perfil ativo no localStorage
        localStorage.setItem('perfilAtivoNome', nomePerfil);
        localStorage.setItem('perfilAtivoImagem', imagemPerfil);

        // Redireciona para a página de catálogo
        window.location.href = 'catalogo/catalogo.html';
    });
});
