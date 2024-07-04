# Input Contrôlé

## But

L'intérêt est de pouvoir connaître à chaque instant la valeur de mon input.
Cas utiles:

- controller le format de la donnée (email, numéro de téléphone, ...)
- filtrer un tableau en fonction d'un input
- faire des valeurs calculer en fonction de l'input
  - Un input type number, je veux afficher le carré de l'input
- faire un appel API a chaque fois que mon input est modifier (Attention au nombre de requête faite)

## Mise en place

### 1. Créer notre variable

```tsx
import { useState } from 'react';
function MonSuperChampDeRecherche() {
  const [searchText, setSearchText] = useState('');
  return (
    <div>
      <input />
      <div>Ma recherche est : {searchText}</div>
    </div>
  );
}
```

### 2. Lié notre variable à notre input

```tsx
import { useState } from 'react';
function MonSuperChampDeRecherche() {
  const [searchText, setSearchText] = useState('');
  return (
    <div>
      <input
        {/* Je lie la valeur de mon input à celle de ma variable */}
        value={searchText}
      />
      <div>Ma recherche est : {searchText}</div>
    </div>
  );
}
```

### 3. Modifier la variable lorsque l'input change

#### Oneline

```tsx
import { useState } from 'react';
function MonSuperChampDeRecherche() {
  const [searchText, setSearchText] = useState('');
  return (
    <div>
      <input
        {/* Je lie la valeur de mon input à celle de ma variable */}
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <div>Ma recherche est : {searchText}</div>
    </div>
  );
}
```

#### Avec fonction à côté

```tsx
import { useState, ChangeEvent } from 'react';
function MonSuperChampDeRecherche() {
  const [searchText, setSearchText] = useState('');

  const handleChangeSearchTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    // On récupère la nouvelle valeur
    const newValue = event.target.value;
    // On modifie notre variable
    setSearchText(newValue);
  }

  return (
    <div>
      <input
        {/* Je lie la valeur de mon input à celle de ma variable */}
        value={searchText}
        {/* Au changement de valeur sur mon élément HTML input */}
        onChange={handleChangeSearchTextInput}
      />
      <div>Ma recherche est : {searchText}</div>
    </div>
  );
}
```
