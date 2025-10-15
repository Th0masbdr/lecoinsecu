const allQuestionsEcology = [
    {
        question: "Quelle est la part d’émissions de CO2 liée à l’usage d’Internet dans le monde ?",
        options: [
            "Environ 1 %", 
            "Environ 3 %", 
            "Environ 10 %"
        ],
        answer: ["Environ 3 %"]
    },
    {
        question: "Quel appareil est le plus énergivore au quotidien ?",
        options: [
            "Un ordinateur portable", 
            "Un smartphone", 
            "Un serveur cloud"
        ],
        answer: ["Un serveur cloud"]
    },
    {
        question: "Que signifie l’empreinte carbone d’un email ?",
        options: [
            "La quantité d’énergie utilisée pour l’envoyer et le stocker", 
            "Le nombre de mots utilisés", 
            "Le poids du fichier attaché uniquement"
        ],
        answer: ["La quantité d’énergie utilisée pour l’envoyer et le stocker"]
    },
    {
        question: "Quelle action réduit le plus l’impact environnemental de votre smartphone ?",
        options: [
            "Changer tous les ans", 
            "Prolonger sa durée de vie et le recycler correctement", 
            "Utiliser uniquement les réseaux sociaux"
        ],
        answer: ["Prolonger sa durée de vie et le recycler correctement"]
    },
    {
        question: "Quel est le geste numérique le plus écologique ?",
        options: [
            "Stocker des fichiers inutiles dans le cloud", 
            "Supprimer les emails et fichiers inutiles", 
            "Regarder des vidéos en 4K en continu"
        ],
        answer: ["Supprimer les emails et fichiers inutiles"]
    },
    {
        question: "L’empreinte carbone du streaming vidéo peut être réduite en :",
        options: [
            "Réduisant la résolution ou téléchargeant localement", 
            "Regardant plus de contenu", 
            "Augmentant le volume sonore"
        ],
        answer: ["Réduisant la résolution ou téléchargeant localement"]
    },
    {
        question: "Pourquoi le cloud n’est pas neutre pour l’environnement ?",
        options: [
            "Les serveurs consomment de l’énergie et produisent des émissions de CO2", 
            "Il ne fonctionne pas sans connexion", 
            "Il ralentit l’ordinateur"
        ],
        answer: ["Les serveurs consomment de l’énergie et produisent des émissions de CO2"]
    },
    {
        question: "Quel navigateur consomme moins d’énergie selon les études ?",
        options: [
            "Navigateur optimisé et léger", 
            "Toujours le dernier navigateur", 
            "Celui avec le plus de plugins"
        ],
        answer: ["Navigateur optimisé et léger"]
    },
    {
        question: "Que faut-il privilégier pour réduire son impact numérique au travail ?",
        options: [
            "Envoyer moins de mails et utiliser les outils collaboratifs", 
            "Augmenter le stockage dans le cloud", 
            "Changer souvent de matériel"
        ],
        answer: ["Envoyer moins de mails et utiliser les outils collaboratifs"]
    },
    {
        question: "Quelle pratique numérique est la plus responsable ?",
        options: [
            "Allumer et éteindre régulièrement ses appareils", 
            "Laisser les appareils allumés en permanence", 
            "Acheter du neuf plutôt que recycler"
        ],
        answer: ["Allumer et éteindre régulièrement ses appareils"]
    }
];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const selectedQuestions = shuffleArray(allQuestionsEcology).slice(0, 10);

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
        message = "Félicitations ! Vous êtes un vrai expert en écologie numérique 🎉";
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
