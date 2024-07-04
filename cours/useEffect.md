# useEffect

C'est un hook de React qui permet d'effectuer des effets de bord.

## But

useEffect va permettre de SYNCHRONISER des données de notre composant avec l'extérieur. (API, localStorage, etc...)

## Exemple d'utilisation

Je suis sur la page de liste de produit d'un site ecommerce

### 1er rendu uniquement

```tsx
function App() {
  const [products, setProducts] = useState([]);

  // Uniquement lors du 1er rendu === tableau de dépendence à vide
  useEffect(() => {
    // Ici j'appel mon API pour récupérer une liste de produit
    fetch('https://ma-superbe-api.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));

    // Mon tableau de dépendence est vide
  }, []);

  return (
    <div>
      {/* J'affiche ma liste de produit */}
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
```

### Avec des données en dépendance

```tsx
function App() {
  const [products, setProducts] = useState([]);

  // Cette fois ci, je veux récupérer les produits en fonction de la page courante
  const [pageNumber, setPageNumber] = useState(1);

  // sera exécuter au 1er rendu et à chaque fois que pageNumber change
  useEffect(() => {
    // Ici j'appel mon API pour récupérer une liste de produit
    // Dans mon url d'api, je précise le numéro de page pour récupérer uniquement les produits de cette page
    fetch(`https://ma-superbe-api.com/products?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));

    // Je précise les données dont dépend mon useEffect
    // A chaque fois que mon numéro de page change, je veux recharger les produits
  }, [pageNumber]);

  return (
    <div>
      {/* J'affiche ma liste de produit */}
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
      <button type="button" onClick={() => setPageNumber(pageNumber + 1)}>
        page suivante
      </button>
    </div>
  );
}
```
