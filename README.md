## Théorie
1. FOUC signifie Flash of Unstyled Content. Il se produit lorsque le contenu d'une page s'affiche sans son style CSS pendant un bref instant, avant que le navigateur ne charge et n’applique les feuilles de style. Ce phénomène peut être dérangeant pour les utilisateurs, car il rend l'expérience visuelle confuse et peu professionnelle.
2. Techniques d'optimisation des performances pour un frontend avec React ou autres, surtout pour des pages avec un fort contenu et des données provenant d'APIs :
### Utilisation de useMemo pour l'optimisation des performances :
- **useMemo** permet de mémoriser le résultat d'une fonction complexe ou d'un calcul coûteux, afin qu’il ne soit recalculé que lorsque ses dépendances changent. C'est particulièrement utile dans les cas où un composant affiche un fort contenu ou travaille avec beaucoup de données provenant d'APIs.
- **useCallback** : Pour mémoriser des fonctions et éviter de les redéfinir, notamment lorsqu'elles sont passées comme props à des composants enfants.
