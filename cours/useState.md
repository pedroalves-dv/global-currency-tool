# useState

En react, le but est de pouvoir interagir avec l'utilisateur et donc de modifier des informations (variables) qui entraineront une mise à jour de l'affichage.

## But

Avoir une variable qui lorsqu'elle est modifier relance le rendu du composant.

## Mise en place

### Création + affichage de la donnée

```tsx
import { useState } from 'react';
function Counter() {
  // Je créer une variable d'état avec pour valeur initial 0
  // ma variable s'appele `count` et pour la modifier j'utiliserai la fonction `setCount`
  const [count, setCount] = useState(0);

  return <button type="button">{count}</button>;
}
```

### Modification de la donnée

J'ajoute un écouteur d'événement qui me permettra de réagir et de modifier ma variable

```tsx
import { useState } from 'react';
function Counter() {
  // Je créer une variable d'état avec pour valeur initial 0
  // ma variable s'appele `count` et pour la modifier j'utiliserai la fonction `setCount`
  const [count, setCount] = useState(0);

  // Lorsqu'on click sur mon bouton
  const handleClickButton = () => {
    // je met à jour ma donnée
    setCount(count + 1);
  };

  return (
    // Version oneline
    <>
      <button type="button" onClick={() => setCount(count + 1)}>
        {count}
      </button>
      <button type="button" onClick={handleClickButton}>
        {count}
      </button>
    </>
  );
}
```

## Bon à savoir

Lorsqu'une donnée est modifier avec la fonction `setQQCH` du `useState`, le composant est réexécuter ainsi que tous ses enfants.
