import { List } from 'immutable';
import Base from '../records/base';

const dbnUtils = {
  /**
   * Given strings representing a sequence of pairs and DBN structure,
   * return our app's datastructure representing this information
   * @param {String} sequence
   * @param {String} dbn
   * @returns {Immutable.List}
   */
  createStructure(sequence, dbn) {
    if (!sequence || !dbn) {
      throw new Error('sequence and dbn params are required');
    }
    if (!sequence.length || !dbn.length) {
      throw new Error('sequence and dbn params must be nonempty strings');
    }
    if (sequence.length !== dbn.length) {
      throw new Error('sequence and dbn must have same length');
    }

    return List(sequence.split('').map((baseChar, index) => {
      const structureChar = dbn[index];

      return Base({
        type: baseChar,
        structure: structureChar,
      });
    }));
  },
};

export default dbnUtils;
