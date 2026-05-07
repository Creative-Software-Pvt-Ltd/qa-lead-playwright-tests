const { test, expect } = require('@playwright/test');
//const fs = require('fs');
require('dotenv').config();

//1. Successful login.
test('Valid Login via API', async ({ request }) => {

  const response = await request.post(
    `${process.env.API_BASE_URL}/auth/login`,
    {
        data: {
            password: "password123",
            username: "testuser"
          },
    }
  );
  expect([200]).toContain(response.status());
});

//2. Invalid login.
test('Invalid Login via API', async ({ request }) => {

    const response = await request.post(
      `${process.env.API_BASE_URL}/auth/login`,
      {
          data: {
              password: "invalidpassword",
              username: "invaliduser"
            },
      }
    );
    expect([401]).toContain(response.status());
});

//3. Fetch products.
test('Fetching Products API', async ({ request }) => {

    const response = await request.get(
      `${process.env.API_BASE_URL}/products`,
      {
          
      }
    );
    expect([200]).toContain(response.status());
    const body = await response.json();

    //console.log(body); 
  
    expect(Array.isArray(body.products)).toBeTruthy();

    expect(body.products.length).toBeGreaterThan(0);

    expect(body.products[0]).toHaveProperty('id');
    expect(body.products[0]).toHaveProperty('name');
    expect(body.products[0]).toHaveProperty('category');
    expect(body.products[0]).toHaveProperty('price');
    expect(body.products[0]).toHaveProperty('stock');
    expect(body.products[0]).toHaveProperty('image');
    expect(body.products[0]).toHaveProperty('rating');

});

  //4. Create order with a valid token.
test('Create Order with Valid token API', async ({ request }) => {

    const response1 = await request.post(
        `${process.env.API_BASE_URL}/auth/login`,
        {
            data: {
                password: "password123",
                username: "testuser"
              },
        }
      );
      expect([200]).toContain(response1.status());
      const loginBody = await response1.json();
      console.log(loginBody);
      const token = loginBody.token;

    // CREATE ORDER
  const orderResponse = await request.post(
    `${process.env.API_BASE_URL}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },

      data: {
        customer: {
          fullName: 'Nishantha Thilakawardana',
          address: '123 Test Street',
          city: 'London'
        },

        items: [
          {
            productId: 'p-1001',
            quantity: 1
          }
        ]
      }
    }
  );

  expect(orderResponse.status()).toBe(201);

  const orderBody = await orderResponse.json();

  console.log(orderBody);

});

  //5. One negative case: missing token, invalid product ID, invalid quantity, or out-of-stock product.
  test('Create Order with inValid token API', async ({ request }) => {

  const orderResponse = await request.post(
    `${process.env.API_BASE_URL}/orders`,
    {
      headers: {
        Authorization: `Bearer invalid-token`
      },

      data: {
        customer: {
          fullName: 'Nishantha Thilakawardana',
          address: '123 Test Street',
          city: 'London'
        },

        items: [
          {
            productId: 'p-1001',
            quantity: 1
          }
        ]
      }
    }
  );

  expect(orderResponse.status()).toBe(401, 403);

  const orderBody = await orderResponse.json();

  console.log(orderBody);

});

