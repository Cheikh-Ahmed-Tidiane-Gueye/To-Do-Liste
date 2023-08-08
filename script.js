// Déclaration de la fonction ajouterTache en utilisant une fonction fléchée
const ajouterTache = () => {
  // Récupération de la valeur saisie dans le champ de texte et suppression des espaces vides au début et à la fin
  let nouvelleTache = document.getElementById('new-tache').value.trim();

  // Vérification si la valeur de la nouvelle tâche n'est pas une chaîne vide
  if (nouvelleTache !== '') {
    // Vérification si la tâche existe déjà dans la liste
    if (tacheExisteDeja(nouvelleTache)) {
      // Affichage du message d'alerte
      afficherAlerte('Cette tâche existe déjà.');
    } else {
      // Récupération de la liste des tâches
      let listeDeTache = document.getElementById('todolist');

      // Création d'un nouvel élément de liste
      let tache = document.createElement('li');
      tache.classList.add('tache'); // Ajout de la classe CSS "tache"
      
      // Attribution du contenu à l'élément de liste en utilisant la valeur de la nouvelle tâche
      tache.innerHTML = `<span class="tache-nom">${nouvelleTache}</span>` +
        `<span class="btn-group">
          <button type="button" class="rounded-3 btn btn-info" id="Modifier">Modifier <i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="rounded-3 btn btn-success btn_terminer" id="Terminer">Terminer <i class="fa-solid fa-check"></i></button>
          <button type="button" class="rounded-3 btn btn-danger" id="Supprimer">Supprimer <i class="fa-solid fa-trash"></i></button>
          <button type="button" class="rounded-3 btn btn-primary" id="Archiver"><span>Archiver</span> <i class="fa-solid fa-box-archive"></i></button>
        </span>`;

      // Ajout de la nouvelle tâche à la liste des tâches
      listeDeTache.appendChild(tache);

      // Réinitialisation du champ de saisie
      document.getElementById('new-tache').value = '';

      // Ajout d'un gestionnaire d'événements sur le bouton "Terminer" de la nouvelle tâche
      let btnTerminer = tache.querySelector('.btn_terminer');
      btnTerminer.addEventListener('click', function() {
        toggleTacheBarree(btnTerminer);
      });

      // Ajout d'un gestionnaire d'événements sur le bouton "Modifier" de la nouvelle tâche
      let btnModifier = tache.querySelector('.btn-info');
      btnModifier.addEventListener('click', modifierTache);

      // Ajout d'un gestionnaire d'événements sur le bouton "Supprimer" de la nouvelle tâche
      let btnSupprimer = tache.querySelector('.btn-danger');
      btnSupprimer.addEventListener('click', function() {
        supprimerTache(tache);
      });

      // Ajout d'un gestionnaire d'événements sur le bouton "Archiver" de la nouvelle tâche
      let btnArchiver = tache.querySelector('.btn-primary');
      btnArchiver.addEventListener('click', function() {
        archiverTache(tache);
      });
    }
  } else {
    afficherAlerte('Veuillez saisir une tâche.');
  }
};

// Récupération du bouton "Ajouter" et attachement de la fonction ajouterTache à l'événement de clic
let btnAjout = document.getElementById('ajout');
btnAjout.addEventListener('click', ajouterTache);

// Ajouter une tâche lorsque la touche "Entrée" est pressée
document.addEventListener('keydown', function(event) {
  // Vérification si la touche pressée est "Entrée"
  if (event.key === 'Enter') {
    // Appel de la fonction ajouterTache
    ajouterTache();
  }
});

// -----------------------------------------------------------------------------------------

// Fonction pour vérifier si une tâche existe déjà dans la liste
const tacheExisteDeja = (nouvelleTache) => {
  let todoList = document.getElementById('todolist');
  let tachesExistantes = todoList.getElementsByTagName('li');

  // Parcours des tâches existantes
  for (let i = 0; i < tachesExistantes.length; i++) {
    let tache = tachesExistantes[i];
    let tacheText = tache.firstChild.textContent.trim(); // Récupération du texte de la tâche existante

    // Vérification si le texte de la tâche existante correspond à la nouvelle tâche
    if (tacheText === nouvelleTache && !tache.classList.contains('tache-terminee')) {
      return true; // La tâche existe déjà
    }
  }

  return false; // La tâche n'existe pas
};

// -----------------------------------------------------------------------------------------

// Fonction pour afficher un message d'alerte si la tache existe
const afficherAlerte = (message) => {
  let alertElement = document.getElementById('alert');
  alertElement.textContent = message;
  alertElement.style.display = 'block';
  setTimeout(function() {
    alertElement.style.display = 'none';
  }, 3000);
};

// -----------------------------------------------------------------------------------------

// Fonction pour terminer ou annuler la fin d'une tâche
const toggleTacheBarree = (btn) => {
  let tache = btn.parentNode.parentNode; // Récupération de l'élément <li> parent

  if (tache.classList.contains('tache-terminee')) {
    tache.classList.remove('tache-terminee');
    btn.innerHTML = `Terminer <i class="fa-solid fa-check"></i>`;
  } else {
    tache.classList.add('tache-terminee');
    btn.textContent = 'Annuler Terminer';
  }
};

// -----------------------------------------------------------------------------------------

// Fonction pour supprimer une tâche
const supprimerTache = (tache) => {
  let todoList = document.getElementById('todolist');
  todoList.removeChild(tache);
};

// -----------------------------------------------------------------------------------------

// Fonction pour modifier une tâche
const modifierTache = (event) => {
  let tache = event.target.parentNode.parentNode;
  let tacheNomElement = tache.querySelector('.tache-nom');

  // Récupération du texte de la tâche actuelle
  let tacheActuelle = tacheNomElement.textContent.trim();

  if (tacheNomElement.firstChild.tagName === 'INPUT') {
    // Si le champ d'entrée de texte est déjà affiché, l'utilisateur veut ajouter les modifications
    let nouvelleTache = tacheNomElement.querySelector('.input-modifier').value.trim();

    // Vérification si la nouvelle tâche est vide
    if (nouvelleTache === '') {
      afficherAlerte('Veuillez saisir une tâche.');
      return;
    }

    // Remplacement du contenu de la tâche par le nom de la tâche modifiée
    tacheNomElement.textContent = nouvelleTache;

    // Suppression du bouton "Ajouter modifications"
    event.target.innerHTML = `Modifier  <i class="fa-solid fa-pen-to-square"></i>`;

    // Suppression de la classe CSS "tache-modification"
    tacheNomElement.classList.remove('tache-modification');
  } else {
    // Sinon, l'utilisateur veut modifier la tâche

    // Remplacement du contenu de la tâche par un champ d'entrée de texte
    tacheNomElement.innerHTML = `<input type="text" class="input-modifier" value="${tacheActuelle}">`;

    // Changement du texte du bouton "Modifier" en "Ajouter modifications"
    event.target.innerHTML = `Ajouter modifications  <i class="fa-solid fa-pen-to-square"></i>`;

    // Ajout de la classe CSS "tache-modification"
    tacheNomElement.classList.add('tache-modification');
  }
};

// -----------------------------------------------------------------------------------------

// Fonction pour supprimer toutes les tâches terminées
const supprimerTachesTerminees = () => {
  // Récupération de la liste des tâches
  let todoList = document.getElementById('todolist');

  // Récupération des tâches terminées dans la liste
  let tachesTerminees = todoList.getElementsByClassName('tache-terminee');

  // Parcours des tâches terminées
  while (tachesTerminees.length > 0) {
    // Sélection de la première tâche terminée dans la liste
    let tache = tachesTerminees[0];

    // Suppression de la tâche de la liste
    todoList.removeChild(tache);
  }
};

// Récupération du bouton "Supp. taches terminées" et attachement de la fonction supprimerTachesTerminees à l'événement de clic
let btnSupprimerTerminees = document.getElementById('reset');
btnSupprimerTerminees.addEventListener('click', supprimerTachesTerminees);

// -----------------------------------------------------------------------------------------

// Fonction pour archiver ou désarchiver une tâche
const archiverTache = (tache) => {
  let btnArchiver = tache.querySelector('#Archiver');
  let btnArchiverText = btnArchiver.querySelector('span');
  let btnModifier = tache.querySelector('#Modifier');
  let btnTerminer = tache.querySelector('#Terminer');
  let btnSupprimer = tache.querySelector('#Supprimer');

  if (tache.parentNode.id === 'archives') {
    // La tâche est déjà archivée, donc on la désarchive
    tache.parentNode.removeChild(tache); // Retirer la tâche de la liste des archives
    document.getElementById('todolist').appendChild(tache); // Ajouter la tâche à la liste principale
    btnArchiverText.textContent = 'Archiver'; // Changer le texte du bouton en "Archiver"
    btnModifier.style.display = 'inline-block'; // Afficher le bouton "Modifier"
    btnTerminer.style.display = 'inline-block'; // Afficher le bouton "Terminer"
    btnSupprimer.style.display = 'inline-block'; // Afficher le bouton "Supprimer"
  } else {
    // La tâche n'est pas archivée, donc on l'archive
    tache.parentNode.removeChild(tache); // Retirer la tâche de la liste principale
    document.getElementById('archives').appendChild(tache); // Ajouter la tâche à la liste des archives
    btnArchiverText.textContent = 'Désarchiver'; // Changer le texte du bouton en "Désarchiver"
    btnModifier.style.display = 'none'; // Masquer le bouton "Modifier"
    btnTerminer.style.display = 'none'; // Masquer le bouton "Terminer"
    btnSupprimer.style.display = 'none'; // Masquer le bouton "Supprimer"
  }
};
// --------------------------------------------------------------------------------------------------

// Fonction qui permet d'alterner entre la liste des taches principales et archivees

// Récupération des éléments HTML
var btnAlterner = document.getElementById('btnAlterner');
var listeArchives = document.getElementById('archives');
var listePrincipale = document.getElementById('todolist');

// Événement au clic sur le bouton
btnAlterner.addEventListener('click', basculerListes);

// Fonction pour basculer entre la liste des tâches archivées et la liste des tâches principales
function basculerListes() {
  if (listeArchives.classList.contains('d-none')) {
    listeArchives.classList.remove('d-none');
    listePrincipale.classList.add('d-none');
    btnAlterner.innerText = "Tâches principales";
  } else {
    listeArchives.classList.add('d-none');
    listePrincipale.classList.remove('d-none');
    btnAlterner.innerText = "Tâches archivées";
  }
}

// ------------------------------------------------------------------------------------------------------------

// Fonction pour filtrer les tâches en fonction de leur statut
function filtrerTaches() {
  // Récupération des éléments de case à cocher du filtre
  const checkboxTous = document.getElementById('checkbox-tous');
  const checkboxActives = document.getElementById('checkbox-actives');
  const checkboxTerminees = document.getElementById('checkbox-termines');
  
  // Récupération des tâches principales et des tâches archivées
  const tachesPrincipales = document.getElementById('todolist').querySelectorAll('.tache');
  const tachesArchivees = document.getElementById('archives').querySelectorAll('.tache');
  
  // Parcours des tâches principales
  tachesPrincipales.forEach(tache => {
    const estTerminee = tache.classList.contains('tache-terminee');
  
    // Vérification des cases à cocher pour déterminer si la tâche doit être affichée ou cachée
    if (
      (checkboxTous.checked) ||
      (checkboxActives.checked && !estTerminee) ||
      (checkboxTerminees.checked && estTerminee)
    ) {
      // Afficher la tâche en supprimant la classe 'tache-cachee'
      tache.classList.remove('tache-cachee');
    } else {
      // Cacher la tâche en ajoutant la classe 'tache-cachee'
      tache.classList.add('tache-cachee');
    }
  });
  
  // Parcours des tâches archivées
  tachesArchivees.forEach(tache => {
    const estTerminee = tache.classList.contains('tache-terminee');
  
    // Vérification des cases à cocher pour déterminer si la tâche doit être affichée ou cachée
    if (
      (checkboxTous.checked) ||
      (checkboxActives.checked && !estTerminee) ||
      (checkboxTerminees.checked && estTerminee)
    ) {
      // Afficher la tâche en supprimant la classe 'tache-cachee'
      tache.classList.remove('tache-cachee');
    } else {
      // Cacher la tâche en ajoutant la classe 'tache-cachee'
      tache.classList.add('tache-cachee');
    }
  });
}

// Récupération des éléments de case à cocher du filtre
const checkboxTous = document.getElementById('checkbox-tous');
const checkboxActives = document.getElementById('checkbox-actives');
const checkboxTerminees = document.getElementById('checkbox-termines');

// Ajout des gestionnaires d'événements pour les cases à cocher
checkboxTous.addEventListener('click', filtrerTaches);
checkboxActives.addEventListener('click', filtrerTaches);
checkboxTerminees.addEventListener('click', filtrerTaches);
