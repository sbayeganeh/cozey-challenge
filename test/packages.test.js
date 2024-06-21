import assert from "assert";
import { packagesData, productsData } from "../app/data/packages.js"

describe('General', function () {

  describe('Packages', function () {
    it('Package valentine box must be present and have the right content', function () {
        assert.deepEqual(packagesData["valentine box"],
            [
                {
                  "product_id": 1,
                  "quantity": 1
                },
                {
                  "product_id": 2,
                  "quantity": 1
                },
                {
                  "product_id": 3,
                  "quantity": 1
                },
                {
                  "product_id": 4,
                  "quantity": 1
                }
              ]
        );
    });
    it('Package birthday box must be present and have the right content', function () {
      assert.deepEqual(packagesData["birthday box"],
        [
          {
            "product_id": 5,
            "quantity": 1
          },
          {
            "product_id": 6,
            "quantity": 1
          },
          {
            "product_id": 7,
            "quantity": 1
          }
        ]
      );
    });
    it('Package client gift box must be present and have the right content', function () {
      assert.deepEqual(packagesData["client gift box"],
        [
          {
            "product_id": 8,
            "quantity": 1
          },
          {
            "product_id": 9,
            "quantity": 1
          },
          {
            "product_id": 10,
            "quantity": 1
          }
        ]
      );
    });
    it('There must be 10 products for packages', function () {
      assert.deepEqual(Object.keys(productsData).length,10);
    });
    it('all products must be present in products', function () {
      assert.deepEqual(productsData,{
        1: {
          "product_name": "Red Roses Bouquet",
        },
        2: {
          "product_name": "Box of chocolates",
        },
        3: {
          "product_name": "Love card",
        },
        4: {
          "product_name": "Women’s perfume",
        },
        5: {
          "product_name": "Birthday cupcake",
        },
        6: {
          "product_name": "$100 Visa Gift Card",
        },
        7: {
          "product_name": "Birthday card",
        },
        8: {
          "product_name": "Bottle of wine",
        },
        9: {
          "product_name": "Fruit basket",
        },
        10: {
          "product_name": "Pen",
        }
      });
    });
  });
});