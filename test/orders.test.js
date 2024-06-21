import assert from "assert";
import { orders } from "../app/data/orders.js"

describe('General', function () {

  describe('Orders', function () {
    it('All orders must have disctinct ids', function () {
        const hash = {}
        const IdsHash = {}
        for(let i = 0; i < orders.length; i++){
            hash[i+1] = true;
        }
        for(let i = 0; i < orders.length; i++){
            IdsHash[orders[i].id] = true;
        }

        assert.deepEqual(hash, IdsHash);
    });

    it('All orders must contain orders that are valid', function () {
        for(let i = 0; i < orders.length; i++){
            const order = orders[i];
            const packageIds = [1,2,3];

            order.line_items.forEach(item => {
                assert.notEqual(-1, packageIds.indexOf(item.product_id))
            })
        }
    });
    it('All orders total must include the price of all items', function () {
        for(let i = 0; i < orders.length; i++){
            const order = orders[i];
            let totalCounter = 0;

            order.line_items.forEach(item=>{
               totalCounter += item.price;
            })

            assert.equal(totalCounter, order.total)
        }
    });

    it('All orders must include valid fields', function () {
        for(let i = 0; i < orders.length; i++){
            const order = orders[i];

            assert.equal(typeof order.total, "number")
            assert.equal(typeof order.date, "string")
            assert.equal(order.date.length, 25)
            assert.equal(typeof order.address, "string")
            assert.notEqual(order.address.length, 0)
            assert.equal(typeof order.customer_name, "string")
            assert.notEqual(order.customer_name.length, 0)
            assert.equal(typeof order.customer_email, "string")
            assert.notEqual(order.customer_email.length, 0)
            assert.notEqual(order.line_items.length, 0)
        }
    });

    it('All orders must distinct line item ids', function () {
        const IdHash ={}
        for(let i = 0; i < orders.length; i++){
            const order = orders[i];

            order.line_items.forEach(item => {
                assert.equal(IdHash[item.id], undefined)
                IdHash[item.id] = true;
            })
        }
    });
  });
});