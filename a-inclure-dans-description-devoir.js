
// SCRIPT POUR LA DESCRIPTION DE CHAQUE DEVOIR/ATTESTATION

document.addEventListener("DOMContentLoaded", function() {

    // Créer un nouveau style
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
@keyframes heartbeat {
0% {
    transform: scale(1);
    font-weight: normal;
    color: black;
}
50% {
    transform: scale(1.1);
    font-weight: bold;
    color: red;
}
100% {
    transform: scale(1);
    font-weight: normal;
    color: black;
}
}

.heartbeat {
display: inline-block;
animation: heartbeat 1s infinite;
}
`;
    // Ajouter le style à l'élément head
    document.head.appendChild(style);



    // Transformation des spans      
    var spans = document.querySelectorAll('.automatic-completion-conditions span.font-weight-normal');
    // Parcourir tous les spans
    spans.forEach(span => {
        // En fonction du texte de chaque span
        switch (span.textContent.trim()) {
            case "Remettre un travail":
                // Modifier le texte
                span.textContent = "Remettre une attestation";
                break;
            case "Recevoir une note":
                // Modifier le texte
                //span.textContent = "Attendre l'avis de la scolarité";
                span.parentNode.style.display = 'none';
                break;
            case "Obtenir une note minimale de réussite":
                // Trouver l'élément précédent et modifier son texte
                let previousSibling;
                try {
                    previousSibling = span.previousSibling.previousSibling;
                    previousSibling.textContent = "";
                } catch (e) {
                    console.log(e);
                }
                // En fonction de la classe du parent
                if (span.parentNode.classList.contains('alert-danger') &&
                    span) {
                    // Modifier le texte
                    //span.textContent = "Attestion non-conforme";
                    span.textContent = "Points non (encore) acquis";
                    //span.textContent = "";
                    //span.parentNode.style.display = "none";
                } else if (span.parentNode.classList.contains('alert-success')) {
                    // Modifier le texte
                    //span.textContent = "Attestion prise en compte";
                    span.textContent = "Points acquis";
                    //span.textContent = "";
                    //span.parentNode.style.display = "none";
                } else {
                    // Si le parent n'a pas de classe spécifique, effacer le texte
                    span.textContent = "Points parcours";
                    try {
                        previousSibling.textContent = "";
                    } catch (e) {
                        console.log(e);
                    }
                }
                break;
        }
    }); // FIN - Transformation des spans

    // Transformation-masquage des tr du tableau
    var rows = document.querySelectorAll('tr');
    // Parcourir toutes les lignes du tableau
    rows.forEach(row => {
        // Chercher l'élément 'th' dans chaque ligne
        let header = row.querySelector('th');
        let lastcol = row.querySelector('td');
        // si un 'td' est trouvé
        if (lastcol) {
            switch (lastcol.textContent.trim()) {
                case "Aucun devoir n'a encore été remis":
                    lastcol.textContent = "Aucun document n'a encore été remis";
                    break;
                case "Brouillon (non remis)":
                    // Modifier le texte et attirer l'attention de l'utilisateur par un effet
                    lastcol.textContent = "Attention : Brouillon (non remis pour l'instant). Cliquez sur 'Envoyer le document'";
                    lastcol.classList.add('heartbeat');
                    break;

            }
        }
        // Si un 'th' est trouvé
        if (header) {
            // En fonction de son texte
            switch (header.textContent.trim()) {
                case 'Note':
                    // Si le 'td' contient uniquement du texte, supprimer la ligne
                    if (lastcol && (lastcol.nodeType === Node.TEXT_NODE)) {
                        row.style.display = 'none';
                    }
                    // Si le 'td' contient un 'div', supprimer le texte à côté du 'div' et supprime le texte dans le th
                    else if (lastcol && lastcol.querySelector('div')) {
                        lastcol.childNodes.forEach(node => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                node.textContent = '';
                                header.textContent = ''; // supprime le th (qui contient "Note")
                            }
                        });
                    }
                    break;
                case "Statut de l'évaluation":
                    // Masquer la ligne
                    row.style.display = 'none';
                    break;
                case "Statut des travaux remis":
                    // Modifier le texte
                    header.textContent = "Statut du document remis";
                    break;
            }
        }
    }); // FIN - Transformation-masquage des tr du tableau

    // Transformation-masquage des h4
    var h4s = document.querySelectorAll('h4');
    // Parcourir tous les h4
    h4s.forEach(h4 => {
        // Si le texte du h4 est "Répartition des notes"
        if (h4.textContent.trim() === "Répartition des notes") {
            // Supprimer le h4
            h4.remove();
        }
    }); // FIN - Transformation-masquage des h4

    // Transformation-masquage des h3
    var h3s = document.querySelectorAll('h3');
    // Parcourir tous les h3
    h3s.forEach(h3 => {
        // Si le texte du h3 est "Répartition des notes"
        if (h3.textContent.trim() === "Ajouter un travail") {
            // Modifier le texte le h3
            h3.textContent = "Ajouter un document";
        }
    }); // FIN - Transformation-masquage des h3

    // Transformation des boutons 
    var buttons = Array.from(document.querySelectorAll('button')); // Convert NodeList to Array
    buttons.forEach(button => {
        switch (button.textContent.trim()) {
            case 'Ajouter un travail':
                button.textContent = 'Ajouter un document';
                break;
            case 'Envoyer le devoir':
                button.textContent = 'Envoyer le document';
                break;
            case 'Modifier le travail':
                button.textContent = 'Modifier le document';
                break;
            case 'Supprimer travail remis':
                button.textContent = 'Supprimer le document remis';
                break;
            case 'Ajouter une tentative basée sur le travail remis précédemment':
                button.style.display = 'none';
                break;
            case 'Ajouter une tentative':
                button.textContent = 'Ajouter une nouvelle attestation';
                break;
                // ajoutez plus de cas au besoin
        }
    }); // FIN - Transformation du bouton

    // Suppression de picto info
    var element = document.querySelector('i[title="Aide sur Ajouter une tentative basée sur le travail remis précédemment"]');

    if (element) {
        element.remove();
    } // FIN - Suppression de picto info

}); // FIN - Fonction callback
