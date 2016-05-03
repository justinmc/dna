import baseStructures from '../constants/base_structures';
import baseTypes from '../constants/base_types';

const baseUtils = {
  /**
   * Returns true if the two bases can pair with each other
   * @param {Base} baseA
   * @param {Base} baseB
   * @param {Boolean}
   */
  ableToPair(baseA, baseB) {
    // A pairs to T and N
    if (baseA.type === baseTypes.A) {
      if (baseB.type !== baseTypes.T && baseB.type !== baseTypes.N) {
        return false;
      }
    }

    // T pairs to A and N
    if (baseA.type === baseTypes.T) {
      if (baseB.type !== baseTypes.A && baseB.type !== baseTypes.N) {
        return false;
      }
    }

    // C pairs to G and N
    if (baseA.type === baseTypes.C) {
      if (baseB.type !== baseTypes.G && baseB.type !== baseTypes.N) {
        return false;
      }
    }

    // G pairs to C and N
    if (baseA.type === baseTypes.G) {
      if (baseB.type !== baseTypes.C && baseB.type !== baseTypes.N) {
        return false;
      }
    }

    // Must both be unpaired structure
    if (baseA.structure !== baseStructures.UNPAIRED ||
        baseB.structure !== baseStructures.UNPAIRED) {
      return false;
    }

    return true;
  },

  /**
   * Return two new bases as if the given bases were paired
   * @param {Base} baseA
   * @param {Base} baseB
   * @return {Object} baseA, baseB
   */
  pair(baseA, baseB) {
    let baseAStructure;
    let baseBStructure;
    if (baseA.index < baseB.index) {
      baseAStructure = baseStructures.PAIR_OPEN;
      baseBStructure = baseStructures.PAIR_CLOSE;
    } else {
      baseAStructure = baseStructures.PAIR_CLOSE;
      baseBStructure = baseStructures.PAIR_OPEN;
    }

    let baseAPaired = baseA.set('clicked', false);
    baseAPaired = baseAPaired.set('structure', baseAStructure);

    let baseBPaired = baseB.set('clicked', false);
    baseBPaired = baseBPaired.set('structure', baseBStructure);

    baseAPaired = baseAPaired.set('pair', baseBPaired);
    baseBPaired = baseBPaired.set('pair', baseAPaired);

    return {
      baseA: baseAPaired,
      baseB: baseBPaired,
    };
  },
};

export default baseUtils;
