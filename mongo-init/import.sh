#!/bin/bash

echo "Importing products data..."

mongoimport \
  --db furnistyle \
  --collection products \
  --jsonArray \
  --file /docker-entrypoint-initdb.d/furnistyle-products.json

echo "Import completed!"
