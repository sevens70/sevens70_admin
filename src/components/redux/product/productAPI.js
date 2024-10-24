const BASE_URL = "http://localhost:8080"; // Define your base URL

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    resolve({ data: { products: data } });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    console.log("12345", product);
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products?${queryString}`);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/categories`);
    const data = await response.json();
    resolve({ data });
  });
}
export function createSubCategories(payload) {
  return new Promise(async (resolve) => {
    console.log("12345", payload);
    const response = await fetch(`${BASE_URL}/categories/add-subcategory`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/brands`);
    const data = await response.json();
    resolve({ data });
  });
}
