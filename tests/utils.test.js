const expect = require ('expect');
const utils = require ('./utils.js');

it('should add two numbers', () => {
	var res = utils.add(33, 11);
	expect(res).toBe(40);
})