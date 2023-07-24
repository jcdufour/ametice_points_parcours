// (contient code javascript développé par JC Dufour pour modifier les libellés et apparences de certains éléments
document.addEventListener("DOMContentLoaded", function() {

    // Transformation des div DEVOIR
    var divs = document.querySelectorAll("div.text-uppercase.small");
    divs.forEach(div => {
        switch (div.textContent.trim().toUpperCase()) {
            case "DEVOIR":
                // Modifier le texte
                div.textContent = "attestation";
                break;
        }
    }); //Transformation des div DEVOIR

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

}); // FIN - Fonction callback