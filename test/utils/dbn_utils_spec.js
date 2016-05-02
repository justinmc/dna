import { List } from 'immutable';
import { expect } from 'chai';
import dbnUtils from '../../public/js/utils/dbn_utils';

describe('dbnUtils', function() {
  describe('#createStructure', function() {
    let sequence;
    let dbn;

    describe('when given invalid params', function() {
      beforeEach(function() {
        sequence = 'zxcv';
        dbn = '.((';
      });

      it('should throw an error', function () {
        const createStructureBound = dbnUtils.createStructure.bind(dbnUtils, sequence, dbn);
        expect(createStructureBound).to.throw(Error);
      });
    });

    describe('when given valid params', function() {
      beforeEach(function() {
        sequence = 'CATG';
        dbn = '.().';
      });

      it('should return an Immutable.List of same length', function() {
        const response = dbnUtils.createStructure(sequence, dbn);


        expect(response).to.be.an.instanceof(List);
        expect(response.size).to.equal(sequence.length);
      });
    });
  });
});
