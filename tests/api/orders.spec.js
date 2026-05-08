const { test, expect } = require('@playwright/test');
//const fs = require('fs');
const {customer,orderItems} = require('../../fixtures/testData');
require('dotenv').config();

//1. Successful login.
test('Valid Login via API', async ({ request }) => {

  const loginResponse = await request.post(
    `${process.env.API_BASE_URL}/auth/login`,
    {
        data: {
            password: process.env.TEST_PASSWORD,
            username: process.env.TEST_USERNAME
          },
    }
  );
  expect(loginResponse.status()).toBe(200);
});

//2. Invalid login.
test('Invalid Login via API', async ({ request }) => {

    const loginResponse = await request.post(
      `${process.env.API_BASE_URL}/auth/login`,
      {
          data: {
              password: "invalidpassword",
              username: "invaliduser"
            },
      }
    );
    expect(loginResponse.status()).toBe(401);
});

//3. Fetch products.
test('Fetching Products API', async ({ request }) => {

    const productResponse = await request.get(
      `${process.env.API_BASE_URL}/products`,
      {
          
      }
    );
    //expect([200]).toContain(productResponse.status());
    expect(productResponse.status()).toBe(200);
    const body = await productResponse.json();
  
    expect(Array.isArray(body.products)).toBeTruthy();

    expect(body.products.length).toBeGreaterThan(0);

    body.products.forEach(product => {

        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('stock');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('rating');
      
      });

});

  //4. Create order with a valid token.
test('Create Order with Valid token API', async ({ request }) => {

    const loginResponse = await request.post(
        `${process.env.API_BASE_URL}/auth/login`,
        {
            data: {
                password: process.env.TEST_PASSWORD,
                username: process.env.TEST_USERNAME
              },
        }
      );
      expect(loginResponse.status()).toBe(200);
      const loginBody = await loginResponse.json();
      console.log(JSON.stringify(loginBody, null, 2));
      const token = loginBody.token;

    // CREATE ORDER
  const orderResponse = await request.post(
    `${process.env.API_BASE_URL}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },

      data: {
        customer,
        items: orderItems
      }
    }
  );

  expect(orderResponse.status()).toBe(201);
  const orderBody = await orderResponse.json();

  expect(orderBody.order.id).toMatch(/^ORD-/);

  expect(orderBody.order.status).toBe('CONFIRMED');

  console.log("Body when Valid token", JSON.stringify(orderBody, null, 2));

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
        customer,
        items: orderItems
      }
    }
  );

  expect(orderResponse.status()).toBe(401);

  const orderBody = await orderResponse.json();

  console.log("Body when Invalid token", JSON.stringify(orderBody, null, 2));

});

