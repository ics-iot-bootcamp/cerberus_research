package com.example.mmm.Service;

class StateManager {
    private int mState = 0;

    private int getClearMask(int i) {
        return (15 << i) ^ -1;
    }

    private int getSetMask(int i) {
        return 15 << i;
    }

    StateManager() {
    }

    /* Access modifiers changed, original: 0000 */
    public void setStateTo(int i, int i2) {
        this.mState = (i << i2) | (this.mState & getClearMask(i2));
    }

    /* Access modifiers changed, original: 0000 */
    public int getStateFrom(int i) {
        return (this.mState & getSetMask(i)) >> i;
    }
}