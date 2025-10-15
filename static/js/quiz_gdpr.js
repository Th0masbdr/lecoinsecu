const allQuestionsGDPR = [
    {
        question: "Que signifie RGPD ?",
        options: [
            "Règlement Général sur la Protection des Données",
            "Réglementation Générale des Particules Digitales",
            "Règle Générale de la Programmation des Données"
        ],
        answer: ["Règlement Général sur la Protection des Données"]
    },
    {
        question: "Quel droit permet à une personne de demander la suppression de ses données ?",
        options: [
            "Droit à l’effacement",
            "Droit à l’oubli numérique",
            "Droit à la copie"
        ],
        answer: ["Droit à l’effacement"]
    },
    {
        question: "Quel organisme veille au respect du RGPD en France ?",
        options: [
            "CNIL",
            "ANSSI",
            "Ministère de l’Économie"
        ],
        answer: ["CNIL"]
    },
    {
        question: "Quelles données sont considérées comme personnelles ?",
        options: [
            "Nom et prénom",
            "Adresse IP",
            "Les deux"
        ],
        answer: ["Les deux"]
    },
    {
        question: "Un site doit-il obtenir votre consentement avant de déposer des cookies non essentiels ?",
        options: [
            "Oui",
            "Non",
            "Seulement si le site est français"
        ],
        answer: ["Oui"]
    },
    {
        question: "Le RGPD s’applique-t-il aux entreprises situées hors de l’UE ?",
        options: [
            "Oui, si elles ciblent des résidents de l’UE",
            "Non, seulement aux entreprises européennes",
            "Oui, mais seulement pour les employés"
        ],
        answer: ["Oui, si elles ciblent des résidents de l’UE"]
    },
    {
        question: "Qu’est-ce qu’une violation de données (data breach) ?",
        options: [
            "La perte ou le vol de données personnelles",
            "La mise à jour des données d’un site",
            "La création d’un nouveau compte utilisateur"
        ],
        answer: ["La perte ou le vol de données personnelles"]
    },
    {
        question: "Quelle est la durée maximale pour notifier une violation de données à la CNIL ?",
        options: [
            "72 heures",
            "1 semaine",
            "24 heures"
        ],
        answer: ["72 heures"]
    },
    {
        question: "Le consentement d’un utilisateur doit être :",
        options: [
            "Libre, spécifique, éclairé et univoque",
            "Libre et implicite",
            "Unique et général"
        ],
        answer: ["Libre, spécifique, éclairé et univoque"]
    },
    {
        question: "Les mineurs de moins de 15 ans peuvent-ils donner leur consentement seuls en France ?",
        options: [
            "Non, le consentement doit être parental",
            "Oui, sans restriction",
            "Seulement pour les jeux en ligne"
        ],
        answer: ["Non, le consentement doit être parental"]
    }
];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const selectedQuestions = shuffleArray(allQuestionsGDPR).slice(0, 10);

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
        message = "Félicitations ! Vous êtes un vrai expert en RGPD 🎉";
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
