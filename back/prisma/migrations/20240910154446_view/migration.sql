CREATE VIEW SaleSummary AS
SELECT
    s.id AS sale_id,
    s.date AS sale_date,
    c.id AS customer_id,
    c.name AS customer_name,
    p.id AS product_id,
    p.name AS product_name,
    sp.amount AS product_amount,
    sp.price AS product_price,
    (sp.amount * sp.price) AS total_sale_price
FROM
    Sale s
JOIN
    SaleProduct sp ON s.id = sp.saleId
JOIN
    Product p ON sp.productId = p.id
JOIN
    Customer c ON s.customerId = c.id;
