const allQuestionsCyber = [
    
    {
        question: "Quelle est la caractéristique d’un mot de passe sécurisé ?",
        options: [
            "Court et facile à retenir",
            "Contient des lettres, chiffres et symboles",
            "Identique pour tous les comptes"
        ],
        answer: ["Contient des lettres, chiffres et symboles"]
    },
    {
        question: "Quelle est la meilleure façon de gérer plusieurs mots de passe ?",
        options: [
            "Les écrire sur un papier",
            "Utiliser un gestionnaire de mots de passe",
            "Les mémoriser tous"
        ],
        answer: ["Utiliser un gestionnaire de mots de passe"]
    },


    {
        question: "Comment reconnaître un e-mail de phishing ?",
        options: [
            "Il provient d'une adresse inconnue et contient un lien suspect",
            "Il provient toujours de votre banque",
            "Il n’a jamais de fautes d’orthographe"
        ],
        answer: ["Il provient d'une adresse inconnue et contient un lien suspect"]
    },
    {
        question: "Que devez-vous faire si vous recevez un e-mail suspect ?",
        options: [
            "Cliquer sur le lien pour vérifier",
            "Supprimer le message ou le signaler",
            "Répondre pour demander plus d’informations"
        ],
        answer: ["Supprimer le message ou le signaler"]
    },

 
    {
        question: "Que faut-il éviter de publier sur les réseaux sociaux ?",
        options: [
            "Des photos de vacances",
            "Des informations personnelles comme votre adresse",
            "Des messages à vos amis"
        ],
        answer: ["Des informations personnelles comme votre adresse"]
    },
    {
        question: "Pourquoi limiter la visibilité de vos publications ?",
        options: [
            "Pour économiser de la batterie",
            "Pour protéger vos informations personnelles",
            "Pour avoir plus d’abonnés"
        ],
        answer: ["Pour protéger vos informations personnelles"]
    },


    {
        question: "Quel est le meilleur moyen de protéger votre smartphone ?",
        options: [
            "Ne jamais le verrouiller",
            "Installer un antivirus et activer le verrouillage",
            "Partager votre code PIN avec vos proches"
        ],
        answer: ["Installer un antivirus et activer le verrouillage"]
    },
    {
        question: "Pourquoi faut-il faire les mises à jour de vos appareils ?",
        options: [
            "Elles corrigent des failles de sécurité",
            "Elles ralentissent l’appareil",
            "Elles changent juste le design"
        ],
        answer: ["Elles corrigent des failles de sécurité"]
    },


    {
        question: "Que signifie le cadenas dans la barre d’adresse d’un site web ?",
        options: [
            "Le site est sécurisé avec HTTPS",
            "Le site est en maintenance",
            "Le site est dangereux"
        ],
        answer: ["Le site est sécurisé avec HTTPS"]
    },
    {
        question: "Quelle est la bonne pratique avant de télécharger un fichier ?",
        options: [
            "Vérifier la source du site",
            "Télécharger dès que c’est gratuit",
            "Désactiver son antivirus"
        ],
        answer: ["Vérifier la source du site"]
    }
];


function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const selectedQuestions = shuffleArray(allQuestionsCyber).slice(0, 10);

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
        message = "Félicitations ! Vous êtes un vrai expert en cybersécurité 🎉";
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
