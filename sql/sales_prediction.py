import pandas as pd
from sklearn.linear_model import LinearRegression
from sqlalchemy import create_engine

# Create an engine to connect to PostgreSQL using SQLAlchemy
DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/test"
engine = create_engine(DATABASE_URL)

# Query sales data from the orders table using pandas and SQLAlchemy
query = """
SELECT p.product_id, p.name, order_date::date, SUM(quantity * p.price) AS total_sales
FROM orders o
JOIN products p ON o.product_id = p.product_id
GROUP BY p.product_id, order_date::date
ORDER BY order_date::date;
"""

# Fetch data into a pandas DataFrame
df = pd.read_sql(query, engine)

# Ensure the 'order_date' is in datetime format
df["order_date"] = pd.to_datetime(df["order_date"])

# Predict sales for each product using linear regression
predictions = {}

for product_id in df["product_id"].unique():
    product_data = df[df["product_id"] == product_id].copy()

    product_data.loc[:, "days_since_start"] = (
        product_data["order_date"] - product_data["order_date"].min()
    ).dt.days

    X = product_data[["days_since_start"]]  # Training data with feature names
    y = product_data["total_sales"]

    model = LinearRegression()
    model.fit(X, y)

    # Prepare future days as a DataFrame to match feature names
    future_days = pd.DataFrame(
        [
            [i]
            for i in range(
                X["days_since_start"].max() + 1, X["days_since_start"].max() + 15
            )
        ],
        columns=["days_since_start"],  # Match column name to training data
    )

    predicted_sales = model.predict(future_days)

    predictions[f"'{product_data['name'].unique()[0]}'"] = predicted_sales

# Print predictions
product_names = df["name"].unique()
for product_name, sales in predictions.items():
    for day, sale in enumerate(sales, 1):
        print(f"Predicted sales for product {product_name} on day {day}: {sale:.2f}")
