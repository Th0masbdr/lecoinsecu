const allQuestionsSobriety = [
    {
        question: "Que signifie la sobriété numérique ?",
        options: [
            "Réduire l’usage excessif du numérique pour limiter l’impact environnemental", 
            "Supprimer tous les appareils électroniques", 
            "Ne jamais utiliser Internet"
        ],
        answer: ["Réduire l’usage excessif du numérique pour limiter l’impact environnemental"]
    },
    {
        question: "Quel geste contribue le plus à la sobriété numérique ?",
        options: [
            "Supprimer les emails et fichiers inutiles", 
            "Télécharger toujours les vidéos en haute définition", 
            "Acheter un nouvel appareil chaque année"
        ],
        answer: ["Supprimer les emails et fichiers inutiles"]
    },
    {
        question: "Pourquoi éteindre ses appareils lorsqu’ils ne sont pas utilisés ?",
        options: [
            "Pour économiser de l’énergie et prolonger leur durée de vie", 
            "Pour perdre des données", 
            "Pour que le réseau fonctionne moins bien"
        ],
        answer: ["Pour économiser de l’énergie et prolonger leur durée de vie"]
    },
    {
        question: "Que privilégier pour réduire l’empreinte numérique des vidéos ?",
        options: [
            "Réduire la résolution et limiter le streaming", 
            "Regarder tout en 4K", 
            "Télécharger sans limites"
        ],
        answer: ["Réduire la résolution et limiter le streaming"]
    },
    {
        question: "Comment limiter l’impact des données stockées dans le cloud ?",
        options: [
            "Supprimer les fichiers inutiles et organiser son stockage", 
            "Tout stocker sans tri", 
            "Partager tous ses fichiers publiquement"
        ],
        answer: ["Supprimer les fichiers inutiles et organiser son stockage"]
    },
    {
        question: "Quelle pratique est la plus responsable pour les emails ?",
        options: [
            "Limiter l’envoi d’emails et désabonnement des newsletters inutiles", 
            "Envoyer des emails à tout le monde", 
            "Garder tous les emails indéfiniment"
        ],
        answer: ["Limiter l’envoi d’emails et désabonnement des newsletters inutiles"]
    },
    {
        question: "Quel usage favorise la sobriété numérique sur smartphone ?",
        options: [
            "Limiter les notifications et désinstaller les applications inutiles", 
            "Installer toutes les applications possibles", 
            "Laisser les notifications actives en permanence"
        ],
        answer: ["Limiter les notifications et désinstaller les applications inutiles"]
    },
    {
        question: "Pourquoi prolonger la durée de vie d’un appareil est important ?",
        options: [
            "Pour réduire l’empreinte écologique et la consommation de ressources", 
            "Pour avoir un appareil dépassé", 
            "Pour ne plus utiliser Internet"
        ],
        answer: ["Pour réduire l’empreinte écologique et la consommation de ressources"]
    },
    {
        question: "Qu’est-ce qu’un flux numérique responsable ?",
        options: [
            "Limiter les usages excessifs et optimiser la consommation", 
            "Augmenter le téléchargement et streaming", 
            "Partager tout sur les réseaux sociaux"
        ],
        answer: ["Limiter les usages excessifs et optimiser la consommation"]
    },
    {
        question: "Quel comportement est conseillé pour la sobriété numérique au travail ?",
        options: [
            "Éteindre les ordinateurs inutilisés et limiter le stockage inutile", 
            "Laisser tous les ordinateurs allumés 24h/24", 
            "Acheter toujours du matériel neuf"
        ],
        answer: ["Éteindre les ordinateurs inutilisés et limiter le stockage inutile"]
    }
];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const selectedQuestions = shuffleArray(allQuestionsSobriety).slice(0, 10);

const questionContainer = document.querySelector('.quiz-question');
const optionsContainer = document.querySelector('.quiz-options');
const checkButton = document.querySelector('.quiz-check');
const nextButton = document.querySelector('.quiz-next');
const submitButton = document.querySelector('.quiz-submit');
const scoreContainer = document.querySelector('.quiz-score');
const scoreValue = document.querySelector('.score-value');

let currentQuestionIndex = 0;
let answered = false;
let score = 0;

function displayQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    optionsContainer.innerHTML = '';
    answered = false;

    checkButton.style.display = 'block';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';

    const progressBar = document.querySelector('.quiz-progress-bar');
    progressBar.style.width = `${(currentQuestionIndex / selectedQuestions.length) * 100}%`;

    question.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('quiz-option');
        optionElement.textContent = option;
        optionsContainer.appendChild(optionElement);

        optionElement.addEventListener('click', () => {
            if (!answered) {
                optionElement.classList.toggle('selected');
            }
        });
    });
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        const progressBar = document.querySelector('.quiz-progress-bar');
        progressBar.style.width = `${(currentQuestionIndex / selectedQuestions.length) * 100}%`;
    }
});

checkButton.addEventListener('click', () => {
    if (answered) return;

    const question = selectedQuestions[currentQuestionIndex];
    const selectedOptions = document.querySelectorAll('.quiz-option.selected');
    if (selectedOptions.length === 0) return;

    answered = true;
    checkButton.style.display = 'none';

    if (currentQuestionIndex === selectedQuestions.length - 1) {
        submitButton.style.display = 'block';
    } else {
        nextButton.style.display = 'block';
    }

    let correctAnswers = 0;

    selectedOptions.forEach(option => {
        if (question.answer.includes(option.textContent)) {
            option.classList.add('correct');
            correctAnswers++;
        } else {
            option.classList.add('incorrect');
        }
    });

    document.querySelectorAll('.quiz-option').forEach(option => {
        if (question.answer.includes(option.textContent)) {
            option.classList.add('correct');
        }
    });

    if (correctAnswers === question.answer.length) {
        score++;
    }

    const progressBar = document.querySelector('.quiz-progress-bar');
    progressBar.style.width = `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%`;
});

displayQuestion();

submitButton.addEventListener('click', () => {
    scoreContainer.style.display = 'block';
    scoreValue.textContent = `Quiz terminé ! Votre score est de ${score} sur ${selectedQuestions.length}.`;

    checkButton.style.display = 'none';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';

    let message = "";

    if (score === selectedQuestions.length) {
        message = "Félicitations ! Vous êtes un vrai expert en sobriété numérique 🎉";
    } else if (score > selectedQuestions.length / 2) {
        message = "Bien joué ! Vous avez de bonnes bases 👍";
    } else {
        message = "Attention ⚠️, révisez un peu vos connaissances !";
    }

    const finalMessage = document.createElement('div');
    finalMessage.classList.add('quiz-final-message');
    finalMessage.textContent = message;

    const existingMessage = scoreContainer.querySelector('.quiz-final-message');
    if (existingMessage) {
        existingMessage.textContent = message;
    } else {
        scoreContainer.appendChild(finalMessage);
    }
});
