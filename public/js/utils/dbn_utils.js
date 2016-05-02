import { List } from 'immutable';
import Base from '../records/base';
import baseTypes from '../constants/base_types';
import baseStructures from '../constants/base_structures';

const dbnUtils = {
  /**
   * Given strings representing a sequence of pairs and DBN structure,
   * return our app's datastructure representing this information
   * @param {String} sequence
   * @param {String} dbn
   * @returns {Immutable.List}
   */
  createStructure(sequence, dbn) {
    const validationError = dbnUtils.validateSequenceAndDbn(sequence, dbn);

    if (validationError) {
      throw validationError;
    }

    // Maintain a stack of open bases to find closing matches as we go
    const openStack = [];
    let basesList = List();

    sequence.split('').forEach((baseChar, index) => {
      let pair;
      const structureChar = dbn[index];

      let base = Base({
        index,
        type: baseChar,
        structure: structureChar,
      });

      // For opens, add to openStack for later
      if (base.structure === baseStructures.PAIR_OPEN) {
        openStack.push(base);

      // For closes, grab the pair from the openStack
      } else if (base.structure === baseStructures.PAIR_CLOSE) {
        if (!openStack.length) {
          throw new Error('Mismatching open/close in structure');
        }

        pair = openStack.pop();

        // Update the pair on both bases
        pair = pair.set('pair', base);
        basesList = basesList.set(pair.index, pair);
        base = base.set('pair', pair);
      }

      basesList = basesList.push(base);
    });

    return basesList;
  },

  /**
   * Returns the error for validating both sequence and dbn, else null
   * @param {String} sequence
   * @param {String} dbn
   * @returns {Error|null}
   */
  validateSequenceAndDbn(sequence, dbn) {
    const sequenceError = dbnUtils.validateSequence(sequence);
    const dbnError = dbnUtils.validateDbn(dbn);

    if (sequenceError) {
      return sequenceError;
    }
    if (dbnError) {
      return dbnError;
    }

    if (sequence.length !== dbn.length) {
      return new Error('sequence and dbn must have the same length');
    }

    return null;
  },

  /**
   * Returns the error for validating sequence, else null
   * @param {String} sequence
   * @param {String} dbn
   * @returns {Error|null}
   */
  validateSequence(sequence) {
    if (!sequence) {
      return new Error('sequence required');
    }
    if (!sequence.length) {
      return new Error('sequence must be a nonempty string');
    }

    for (let i = 0; i < sequence.length; i++) {
      const baseType = sequence[i];

      if (baseType !== baseTypes.A &&
          baseType !== baseTypes.T &&
          baseType !== baseTypes.C &&
          baseType !== baseTypes.G &&
          baseType !== baseTypes.N) {
        return new Error(`sequence contains invalid base type ${baseType}`);
      }
    }

    return null;
  },

  /**
   * Returns the error for validating dbn, else null
   * @param {String} dbn
   * @returns {Error|null}
   */
  validateDbn(dbn) {
    if (!dbn) {
      return new Error('dbn required');
    }
    if (!dbn.length) {
      return new Error('dbn must be a nonempty string');
    }

    for (let i = 0; i < dbn.length; i++) {
      const baseStructure = dbn[i];

      if (baseStructure !== baseStructures.UNPAIRED &&
          baseStructure !== baseStructures.PAIR_OPEN &&
          baseStructure !== baseStructures.PAIR_CLOSE) {
        return new Error(`dbn contains invalid character ${baseStructure}`);
      }
    }

    return null;
  },
};

export default dbnUtils;
