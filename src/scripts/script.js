function toggleSlider() {
    const slider = document.querySelector('.slider');

    // Alterna a visibilidade da div slider
    if (slider.style.display === "none" || slider.style.display === "") {
        slider.style.display = "block"; // Torna a div visível
    } else {
        slider.style.display = "none"; // Torna a div invisível
    }
}

let timer, startTime, currentTaskIndex = 0;
const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');

// Função para iniciar o cronômetro
function startTimer() {
    clearInterval(timer);
    startTime = new Date();
    updateTimer();
    timer = setInterval(updateTimer, 10);
}

// Função para resetar o cronômetro
function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer').textContent = '00:00:00.00';
}

// Função para atualizar o cronômetro
function updateTimer() {
    const elapsedTime = new Date() - startTime;
    const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');

    document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Inicializa as checkboxes
resetTimer();
checkboxes.forEach(checkbox => checkbox.disabled = true); // Desabilitar todas as checkboxes inicialmente
checkboxes[0].disabled = false; // Habilitar a primeira checkbox


document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        event.preventDefault(); // Previne o comportamento padrão da tecla espaço

        // Se não houver um tempo inicial ou se a última checkbox já foi marcada
        if (!startTime || currentTaskIndex >= checkboxes.length) {
            resetTimer();
            currentTaskIndex = 0;
            checkboxes.forEach(checkbox => {
                checkbox.checked = false; // Desmarcar todas as checkboxes
                checkbox.disabled = true; // Desabilitar todas as checkboxes
            });
            checkboxes[0].disabled = false; // Habilitar a primeira checkbox novamente
        }

        startTimer();

        // Verifica se a checkbox atual pode ser marcada
        while (currentTaskIndex < checkboxes.length && checkboxes[currentTaskIndex].parentElement.style.display === "none") {
            currentTaskIndex++; // Avançar para a próxima checkbox visível
        }

        if (currentTaskIndex < checkboxes.length) {
            checkboxes[currentTaskIndex].checked = true; // Marcar a checkbox atual
            if (currentTaskIndex + 1 < checkboxes.length && checkboxes[currentTaskIndex + 1].parentElement.style.display !== "none") {
                checkboxes[currentTaskIndex + 1].disabled = false; // Habilitar a próxima checkbox visível
            }
            currentTaskIndex++; // Avançar para a próxima checkbox
        }

        // Se todas as checkboxes foram marcadas
        if (currentTaskIndex >= checkboxes.length) {
            checkboxes.forEach(checkbox => checkbox.disabled = true); // Desabilitar todas as checkboxes
        }
    }
});







// Adiciona o evento para o botão
document.querySelector('.next-serie-btn').addEventListener('click', event => {
    event.preventDefault(); // Previne o comportamento padrão do botão, se necessário
    // A lógica que você já tem para a tecla de espaço
    if (!startTime || currentTaskIndex >= checkboxes.length) {
        resetTimer();
        currentTaskIndex = 0;
        checkboxes.forEach(checkbox => {
            checkbox.checked = false; // Desmarcar todas as checkboxes
            checkbox.disabled = true; // Desabilitar todas as checkboxes
        });
        checkboxes[0].disabled = false; // Habilitar a primeira checkbox novamente
    }

    startTimer();

    // Verifica se a checkbox atual pode ser marcada
    while (currentTaskIndex < checkboxes.length && checkboxes[currentTaskIndex].parentElement.style.display === "none") {
        currentTaskIndex++; // Avançar para a próxima checkbox visível
    }

    if (currentTaskIndex < checkboxes.length) {
        checkboxes[currentTaskIndex].checked = true; // Marcar a checkbox atual
        if (currentTaskIndex + 1 < checkboxes.length && checkboxes[currentTaskIndex + 1].parentElement.style.display !== "none") {
            checkboxes[currentTaskIndex + 1].disabled = false; // Habilitar a próxima checkbox visível
        }
        currentTaskIndex++; // Avançar para a próxima checkbox
    }

    // Se todas as checkboxes foram marcadas
    if (currentTaskIndex >= checkboxes.length) {
        checkboxes.forEach(checkbox => checkbox.disabled = true); // Desabilitar todas as checkboxes
    }
});




//-----------------------------------------------------
function editSeries(taskId) {
    const numSeries = prompt("Quantas séries você deseja manter visíveis?", "4"); // Altere para 4
    const series = document.querySelectorAll(`#${taskId} input[type="checkbox"]`);

    const seriesCount = parseInt(numSeries, 10);
    if (isNaN(seriesCount) || seriesCount < 1 || seriesCount > series.length) {
        alert("Por favor, insira um número válido entre 1 e " + series.length + ".");
        return;
    }

    // Salvar no localStorage com chave única para cada tarefa
    localStorage.setItem(`visibleSeries_${taskId}`, seriesCount);

    // Mostra apenas o número de séries especificado
    series.forEach((checkbox, index) => {
        if (index < seriesCount) {
            checkbox.parentElement.style.display = "inline"; // Mostra o label
            checkbox.disabled = false; // Habilita a checkbox
        } else {
            checkbox.parentElement.style.display = "none"; // Oculta o label
            checkbox.checked = false; // Desmarca a checkbox
            checkbox.disabled = true; // Desabilita a checkbox
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.checkbox-group'); // Seleciona todos os grupos de checkbox
    tasks.forEach(task => {
        const taskId = task.id; // Obter o ID da tarefa
        const storedSeriesCount = localStorage.getItem(`visibleSeries_${taskId}`);
        const series = task.querySelectorAll('input[type="checkbox"]');

        // Se houver um valor salvo no localStorage, use-o
        if (storedSeriesCount) {
            const seriesCount = parseInt(storedSeriesCount, 10);
            series.forEach((checkbox, index) => {
                if (index < seriesCount) {
                    checkbox.parentElement.style.display = "inline"; // Mostra o label
                    checkbox.disabled = false; // Habilita a checkbox
                } else {
                    checkbox.parentElement.style.display = "none"; // Oculta o label
                    checkbox.checked = false; // Desmarca a checkbox
                    checkbox.disabled = true; // Desabilita a checkbox
                }
            });
        } else {
            // Caso contrário, inicialize com 4 como padrão
            const defaultSeriesCount = 4;
            series.forEach((checkbox, index) => {
                if (index < defaultSeriesCount) {
                    checkbox.parentElement.style.display = "inline"; // Mostra o label
                    checkbox.disabled = false; // Habilita a checkbox
                } else {
                    checkbox.parentElement.style.display = "none"; // Oculta o label
                    checkbox.checked = false; // Desmarca a checkbox
                    checkbox.disabled = true; // Desabilita a checkbox
                }
            });
        }
    });
});
//-----------------------------------------------------



// Função para editar o título de um exercício específico
function editExercise(taskId, originalTitle) {
    const task = document.getElementById(taskId);
    const title = task.querySelector('h2'); // Pega o título da tarefa

    // Solicitar novo título
    const newTitle = prompt("Digite um novo título para o exercício:", title.innerText);

    if (newTitle) {
        title.innerText = newTitle; // Atualiza o título
        // Salvar o novo título no localStorage
        localStorage.setItem(taskId, newTitle);
    }
}

// Função para resetar ao título original de cada exercício
function resetExercise(taskId, originalTitle) {
    const task = document.getElementById(taskId);

    // Restaurar o título original
    task.querySelector('h2').innerText = originalTitle;
    // Remover o título salvo no localStorage
    localStorage.removeItem(taskId);
}

// Função para carregar os títulos salvos ao carregar a página
function loadTitles() {
    // Gera automaticamente IDs no formato 'task1', 'task2', ..., 'task60'
    const taskIds = Array.from({ length: 56 }, (_, i) => `task${i + 1}`);

    taskIds.forEach(taskId => {
        const savedTitle = localStorage.getItem(taskId); // Recupera o título salvo no localStorage
        const task = document.getElementById(taskId);

        // Se o elemento existe e há um título salvo, atualiza o título no HTML
        if (task && savedTitle) {
            task.querySelector('h2').innerText = savedTitle;
        }
    });
}

// Carregar os títulos ao carregar a página
window.onload = loadTitles;

// Função para alternar a visibilidade dos botões de edição
document.querySelector('.edit-btn-main').addEventListener('click', function () {
    // Alterna a classe 'active' no botão "editar"
    this.classList.toggle('active');

    // Seleciona todos os botões com a classe 'all-btn-edit'
    const buttons = document.querySelectorAll('.all-btn-edit, .taskId-edit');


    // Alterna a visibilidade dos botões
    buttons.forEach(button => {
        button.style.display = button.style.display === 'none' ? 'inline-block' : 'none';
    });
});





































document.addEventListener("DOMContentLoaded", () => {
    // IDs das 10 task-lists
    const taskListIds = [
        "task-list-1", "task-list-2", "task-list-3", "task-list-4", "task-list-5", 
        "task-list-6", "task-list-7", "task-list-8", "task-list-9", "task-list-10"
    ];

    // Aplicar a configuração de visibilidade para cada task-list
    taskListIds.forEach(taskListId => {
        const savedCount = localStorage.getItem(`visibleTaskCount_${taskListId}`);
        const visibleCount = savedCount ? parseInt(savedCount) : 6; // Padrão: 6 tasks
        updateTaskVisibility(taskListId, visibleCount);
    });
});

// Atualiza a visibilidade das tasks dentro de uma task-list específica
function updateTaskVisibility(taskListId, count) {
    const taskList = document.getElementById(taskListId);
    if (!taskList) return;

    const tasks = taskList.querySelectorAll(".checkbox-group");
    tasks.forEach((task, index) => {
        task.style.display = index < count ? "block" : "none";
    });
}

// Função para ajustar o número de tasks visíveis em uma task-list específica
function adjustTaskCount(taskListId) {
    let newCount = parseInt(prompt("Insira o número de tasks visíveis (3 a 10):"));
    if (isNaN(newCount) || newCount < 3 || newCount > 10) {
        alert("Por favor, insira um valor válido entre 3 e 10.");
        return;
    }

    // Salva o novo valor no LocalStorage
    localStorage.setItem(`visibleTaskCount_${taskListId}`, newCount);

    // Atualiza a visibilidade das tasks
    updateTaskVisibility(taskListId, newCount);
}
