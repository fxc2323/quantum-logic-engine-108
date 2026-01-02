class QuantumLogicEngine {
  constructor() {
    this.states = new Map();
  }

  initializeQubit(id) {
    this.states.set(id, { alpha: 1, beta: 0 });
    console.log(`Qubit ${id} initialized to state |0>`);
  }

  applyHadamard(id) {
    const state = this.states.get(id);
    if (!state) return;
    const invSqrt2 = 1 / Math.sqrt(2);
    const newAlpha = invSqrt2 * (state.alpha + state.beta);
    const newBeta = invSqrt2 * (state.alpha - state.beta);
    this.states.set(id, { alpha: newAlpha, beta: newBeta });
  }

  measure(id) {
    const state = this.states.get(id);
    if (!state) return null;
    const prob0 = Math.pow(Math.abs(state.alpha), 2);
    const result = Math.random() < prob0 ? 0 : 1;
    this.states.set(id, result === 0 ? { alpha: 1, beta: 0 } : { alpha: 0, beta: 1 });
    return result;
  }
}

const engine = new QuantumLogicEngine();
engine.initializeQubit('q0');
engine.applyHadamard('q0');
const outcome = engine.measure('q0');
console.log(`Measurement outcome for q0: ${outcome}`);