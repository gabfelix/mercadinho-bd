const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, description, stock, price, supplierId } = req.body;
    const product = await prisma.product.create({
      data: { name, description, stock, price, supplierId },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, stock, price, supplierId } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, stock, price, supplierId },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    }
);