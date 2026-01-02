document.addEventListener('DOMContentLoaded', () => {
  const filterCategory = document.getElementById('filter-category');
  const filterSpirit = document.getElementById('filter-spirit');
  const searchInput = document.getElementById('search-input');
  const cocktailGrid = document.getElementById('cocktail-grid');

  // Convert HTMLCollection to array for sorting/filtering
  const cocktailCards = Array.from(cocktailGrid.children);

  // Alphabetize initially
  sortCocktailsAlphabetically();

  // Event listeners
  filterCategory.addEventListener('change', filterCocktails);
  filterSpirit.addEventListener('change', filterCocktails);
  searchInput.addEventListener('input', filterCocktails);

  function filterCocktails() {
    const categoryValue = filterCategory.value.toLowerCase();
    const spiritValue = filterSpirit.value.toLowerCase();
    const searchValue = searchInput.value.toLowerCase();

    let filtered = cocktailCards.filter(card => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category.toLowerCase();
      const spirit = card.dataset.spirit.toLowerCase();

      return (
        (categoryValue === '' || category === categoryValue) &&
        (spiritValue === '' || spirit === spiritValue) &&
        (name.includes(searchValue))
      );
    });

    // Alphabetize filtered cards
    filtered.sort((a, b) => {
      const nameA = a.dataset.name.toLowerCase();
      const nameB = b.dataset.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Clear grid and append filtered cards
    cocktailGrid.innerHTML = '';
    filtered.forEach(card => cocktailGrid.appendChild(card));
  }

  function sortCocktailsAlphabetically() {
    const sorted = cocktailCards.slice().sort((a, b) => {
      return a.dataset.name.toLowerCase().localeCompare(b.dataset.name.toLowerCase());
    });
    cocktailGrid.innerHTML = '';
    sorted.forEach(card => cocktailGrid.appendChild(card));
  }
});

