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

    return List(sequence.split('').map((baseChar, index) => {
      const structureChar = dbn[index];

      return Base({
        type: baseChar,
        structure: structureChar,
      });
    }));
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
