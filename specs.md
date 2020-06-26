Site d'organisation de tournois


Le projet vise à créer un site permettant aux utilisateurs d'organiser et de participer à leurs propres tournois.
Que ce soit pour mesurer le talent de sportifs, de jeux vidéos ou autres jeux de reflexion, tout tournoi demande une organisation.
L'idée d'un site qui permet d'organiser ses tournois pourrait satisfaire de nombreux types d'utilisateurs.
Il remplirait plusieurs besoin :
- donner de la visibilité à son tournoi
- faciliter les organisateurs, en leur donnant des outils pour organiser leur tournoi plus simplement (outils graphiques, seeding etc)
- gerer les inscriptions avec un systeme d'authentification (il faudra être connecté pour participer)
- stocker et traiter les données des resultats de tournois plus simplement.
Il existe déjà des applications de ce genre (challonge étant le plus connu et le plus utilisé).
Mais il est toujours possible de se demarquer en ajoutant differentes fonctionnalités.
Il existe de nombreuses alternatives, notamment des sites qui rajoutent leur propre plateforme de paiement pour les tournois.

L'application aura à terme pour but d'être utilisable n'importe où (chez soi, sur un lieu de tournoi, depuis le mobile d'un participant ...)

Les fonctionnalités du MVP :
avoir 3 roles d'utilisateurs : admin, organisateur et participant
possibilité de s'inscrire avec un mail.
en tant qu'organisateur, possibilité de créer un tournoi.
en tant que participant possibilité de participer à un tournoi.
au minimum 3 types de tournois : round robin, single elimination et double elimination bracket
Avoir une representation graphique des tournois dynamiques.
Specifications :

front :
-> page d'accueil avec inscription/login, onglets pour differentes rubriques.
-> composants permettant de representer les arbres de tournoi.

En temps qu'admin : possibilité de voir tout le contenu (liste complete membres/tournois, tournois privés).
possibilité de modifier, supprimer des tournois, des membres etc.

En tant que membre : 
possibilité de créer un tournoi.
de rejoindre un tournoi.
être notifié quand un tournoi commence, quand son match commence etc...
possibilité d'être notifié par mail.


API :
RESTFUL
avec swagger
le role organisateur a accès à toutes les requetes de gestion de données du tournoi qu'il organise.
le role participant peut avoir accès aux requetes put pour les matchs qu'il a en cours.

Les données representants les arbres de tournois devront être serialisables (exportable en fichier)


1 - Pitcher son projet
Presentation (les besoins etc)

2 - La typologie des utilisateurs (visiteurs anonymes, qui se connectent/s'inscrivent)
ex : ce qui s'affiche pour quel utilisateur (mdp oublié, s'inscrire, participer à un chat)
faire une matrice de role

3 -liste des fonctionnalités
(pour les complexes, faire un mockup/wireframe par ex)


Pour la BDD, lister les entités, dictionnaire de données.
UML
quel systeme de bdd utiliser

