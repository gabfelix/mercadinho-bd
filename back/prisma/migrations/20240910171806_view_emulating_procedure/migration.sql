CREATE VIEW HighValueLowStockProducts AS
SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.amountInStock AS stock_amount,
    p.suggestedPrice AS price,
    pr.name AS provider_name
FROM
    Product p
JOIN
    Provider pr ON p.providerId = pr.id
WHERE
    p.amountInStock < 10
    AND p.suggestedPrice > 300.00;
