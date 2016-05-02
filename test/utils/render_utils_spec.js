import { expect } from 'chai';
import { List } from 'immutable';
import dbnUtils from '../../public/js/utils/dbn_utils';
import renderUtils from '../../public/js/utils/render_utils';

describe('renderUtils', function() {
  describe('#getRenderableBases', function() {
    let basesList = List();

    describe('when given no pairs', function() {
      beforeEach(function() {
        basesList = dbnUtils.createStructure(
          'GGGGGG',
          '......'
        );
      });

      it('returns the whole list', function() {
        const result = renderUtils.getRenderableBases(basesList);

        expect(result.length).to.equal(basesList.size);
      });
    });

    /*
    describe('when given a pair at the start', function() {
      beforeEach(function() {
        basesList = dbnUtils.createStructure(
          'GGGGGG',
          '()....'
        );
      });

      it('returns that pair only', function() {
        const result = renderUtils.getRenderableBases(basesList);

        expect(result.length).to.equal(6);
      });
    });
    */

    describe('when given a pair joining the start and end', function() {
      beforeEach(function() {
        basesList = dbnUtils.createStructure(
          'GGGGGG',
          '(....)'
        );
      });

      it('returns that pair only', function() {
        const result = renderUtils.getRenderableBases(basesList);

        expect(result.length).to.equal(2);
      });
    });

    describe('when given a pair joining after the start and end', function() {
      beforeEach(function() {
        basesList = dbnUtils.createStructure(
          'GGGGGGGG',
          '.(....).'
        );
      });

      it('returns the join and all free pairs at the start and end', function() {
        const result = renderUtils.getRenderableBases(basesList);

        expect(result.length).to.equal(4);
      });
    });

    describe('when given a loop with multiple offshoots', function() {
      beforeEach(function() {
        basesList = dbnUtils.createStructure(
          'GGGGGGGGGGGGGGGGGGGGGG',
          '..(........).((..))...'
        );
      });

      it('returns the loop without the offshoots', function() {
        const result = renderUtils.getRenderableBases(basesList);

        expect(result.length).to.equal(10);
      });
    });
  });
});
