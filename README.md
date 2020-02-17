# Bienvenue sur le Traductioniseur !

![image](https://zupimages.net/up/20/08/qt9f.png)

---

Suivez les étapes suivante afin d'installer ce programme sur votre machine :

## 1 - CLONER LE REPO
- Clonez le repo sur votre machine
- Allez dans le nouveau dossier
- Dans votre console, entrez la ligne de commande suivante : `npm i`

## 2 - CREER UN FICHIER .env
- Comme précédemment, entrez la ligne de commande suivante : `touch .env`
- Dans le nouveau fichier .env créé, copiez-collez les informations suivantes :
```
BASIC_URL = http://localhost"
MONGO_URI = "mongodb://localhost/"
MONGO_COLLECTION = "verbs"
PORT = 5001
VERB_NUMBER = 500
```
## 3 - CREER UNE CLE DE COMPTE DE SERVICE GOOGLE
### Si vous n'avez pas accès à la google translate api : 
rendez-vous sur cette page et suivez les instructions jusqu'à avoir fini : "Utiliser le fichier de clé de compte de service dans votre environnement"
https://cloud.google.com/translate/docs/advanced/setup-advanced

### Si vous avez déjà une clé de compte de service google:
allez directement à cette étape :
https://cloud.google.com/translate/docs/advanced/setup-advanced#use_the_service_account_key_file_in_your_environment

## 4 - INTEGRER LE PATH DE VOTRE KEY DANS LE .ENV
Recopiez la ligne suivante dans votre .env tout en remplaçant [PATH] par le chemin vers le fichier de votre clé google :
GOOGLE_APPLICATION_CREDENTIALS="[PATH]"

## 5 - INSERER 500 VERBES DE LA LISTE DANS VOTRE DB
Vous pouvez maintenant insérer 500 verbes aléatoires dans la database mongodb de votre localhost en utilsant la commande suivante : `npm run seeds`

## 6 - DEMARRER LE SERVEUR
Vous pouvez démarrer le serveur en entrant la ligne de commande suivante : `npm run server`
Le lien vers le site devrait apparaître dans la console du serveur, cliquez dessus et amusez-vous <3

---

### HISTOIRE DU PROJET

Je n'ai pas encore travaillé avec beaucoup d'api complexes, j'ai décidé d'utiliser l'api de google translate afin d'avoir une idée de l'utilisation de google cloud.

J'ai décidé de m'adapter au format de données que j'ai reçu, je n'ai pas modifié le fichier texte pour pouvoir traiter les données.

J'ai réalisé des APIHandler afin de faciliter l'utilisation des fonctions asyncrones.

---

### FEATURES

#### Random DB :
Les verbes insérés dans la database sont aléatoirement choisis parmi la liste de milliers de verbes.

#### Smart querying :
Tant que la page n'est pas rafraichie, le même verbe ne sera pas utilisé 2 fois.

#### Choix de langue :
Si vous ne conaissez pas la traduction en anglais, vous pouvez toujours choisir parmi 3 autres langues (espagnol, allemand, italien).

#### Responsive :
Cette application est 100% responsive.

---

### TEMPS DE REALISATION

Ayant été réalisé en une semaine par petits morceaux, il est difficile d'estimer le temps de réalisation de ce projet, mais il devrait se situer à facilement 1 jour et demi de travail plein.

---

### DIFFICULTES

J'ai d'abord créé ma fonction randomNumber() dans le frontend et je passais le résultat dans le back-end pour l'utiliser comme custom_id lorsque je trouvais un verbe dans la db. Malheureusement le fait de checker le tableau de custom_id déjà utilisés dans le front-end aurait amené à faire des calls dans la db jusqu'à avoir un verbe encore non-utilisé (le temps deviendrait proportionnellement grand à mesure que le nombre de verbe disponilbe diminuerait).

J'ai été bloqué pendant un bon moment car je passais le mauvais argument à ma translate api (ex: je passais "english" au lieu de "en"), l'api google translate a été difficile a appréhander, surtout son utilisation sur une machine locale.

Le fait d'utiliser html au lieu d'hbs a été déroutante, sachant que les données ne peuvent être passées par le front en chargeant la page, il a fallu faire la discussion front-back intégralement avec axios.

Les petites erreurs en cours de route m'ont fait perdre le plus de temps, mais le besoin d'arrêter d'installer des features alors que le projet réponds aux attentes est aussi très exigeant :)

---

### FUTUR

Créer une condition `if(translatedVerb === verb)` lors de la recherche du randomVerb qui rechercherait un nouveau randomVerb car dans la liste de verbes, beaucoup ne sont pas traduits par google translate (au risque d'exclure les verbes qui s'écrivent de la même manière dans les 2 langues).

Changer le fait d'avoir 2 requêtes au serveur par verbe, je pense que le mieux serait de créer une route qui permettrait de faire les 2 d'un coup, j'ai séparé les routes afin de pouvoir avoir la traduction dynamique du verbe en fonction de la langue choisie.

Ajout de bonus type révéler un caractère aléatoire sur l'indice, envoyer un audio sample avec la sonorité dans la langue, etc.

Ajout de musique, styling, animations, etc.

---

Made with Love by PH <3
