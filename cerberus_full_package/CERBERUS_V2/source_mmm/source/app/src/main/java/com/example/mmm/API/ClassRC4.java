package com.example.mmm.API;
public class ClassRC4 {
    private int[] sbox;
    private static final int SBOX_LENGTH = 256;
    private int i = 0;
    private int j = 0;
    public ClassRC4(byte[] key) {
        sbox = initSBox(key);
    }
    public byte[] decrypt(final byte[] msg) {
        return encrypt(msg);
    }
    public byte[] encrypt(final byte[] msg) {
        byte[] code = new byte[msg.length];
        for (int n = 0; n < msg.length; n++) {
            i = (i + 1) % SBOX_LENGTH;
            j = (j + sbox[i]) % SBOX_LENGTH;
            swap(i, j, sbox);
            int rand = sbox[(sbox[i] + sbox[j]) % SBOX_LENGTH];
            code[n] = (byte) (rand ^ (int) msg[n]);
        }
        return code;
    }
    private int[] initSBox(byte[] key) {
        int[] sbox = new int[SBOX_LENGTH];
        int j = 0;
        for (int i = 0; i < SBOX_LENGTH; i++) {
            sbox[i] = i;
        }
        for (int i = 0; i < SBOX_LENGTH; i++) {
            j = (j + sbox[i] + key[i % key.length] + SBOX_LENGTH) % SBOX_LENGTH;
            swap(i, j, sbox);
        }
        return sbox;
    }
    private void swap(int i, int j, int[] sbox) {
        int temp = sbox[i];
        sbox[i] = sbox[j];
        sbox[j] = temp;
    }
}