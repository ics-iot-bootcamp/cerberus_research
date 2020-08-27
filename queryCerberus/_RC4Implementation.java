//https://stackoverflow.com/questions/12289717/rc4-encryption-java
// This is the RC4 implementation used by the Cerberus banking trojan while communicating with the C2.
public final class _RC4Implementation {
   private int[] _t;
   private int _i = 0;
   private int _j = 0;

   public _RC4Implementation(byte[] _key) {
      this._t = _RC4(_key);
   }

   private static void _swapInt(int var0, int var1, int[] _arr) {
      int _temp = _arr[var0];
      _arr[var0] = _arr[var1];
      _arr[var1] = _temp;
   }

   private static int[] _RC4(byte[] _T) {
      int[] _S = new int[256];
      int _i = 0;

      int _j;
      for(_j = 0; _j < 256; _S[_j] = _j++) {
      }

      for(_j = 0; _i < 256; ++_i) {
         _j = (_j + _S[_i] + _T[_i % _T.length] + 256) % 256;
         _swapInt(_i, _j, _S);
      }

      return _S;
   }

   public final byte[] _RC4Decrypt(byte[] _ciphertext) {
      return this._RC4Encrypt(_ciphertext);
   }

   public final byte[] _RC4Encrypt(byte[] _plaintext) {
      byte[] _ciphertext = new byte[_plaintext.length];

      for(int _counter = 0; _counter < _plaintext.length; ++_counter) {
         this._i = (this._i + 1) % 256;
         int _j = this._j;
         int[] _S = this._t;
         int _i = this._i;
         this._j = (_j + _S[_i]) % 256;
         _swapInt(_i, this._j, _S);
         _S = this._t;
         _ciphertext[_counter] = (byte)((byte)(_S[(_S[this._i] + _S[this._j]) % 256] ^ _plaintext[_counter]));
      }

      return _ciphertext;
   }
}
