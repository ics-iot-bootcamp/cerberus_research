## Hercules

Hercules automatically finds decryption key for actual DEX of the given Cerberus sample, decrypts it, then decrypts configuration parameters in the actual payload. All statically, in seconds.

 #### Usage:

```sh
python3.8 get_ioc.py <path_to_apk>
```

*Decrypted DEX file will be saved to current working directory.*

Sample Output (truncated) (URL scheme is not changed in real output):

(In the latest version of the Cerberus; 2: Campaign Name, 3: C2 URL, 6: C2 Communication Key. This information can be used with queryCerberus)
```
$ python3.8 get_ioc.py cevirdikcekazan.apk

======== KEY AND PACKAGE INFO ========
Trying again...
Succesfully decrypted dex
Key was: jXs
gyuhdfhwlqz.lbkzzysjbhwueqyszj.gkfnt.byuqixelqjd

======== DECRYPTED STRINGS ========
Decryption key for strings : yckckbubmbac
1 :  ring0
2 :  yeni1
3 :  hxxp[:]//malimaskim.xyz
4 :  internet erisimi
5 :  https://
6 :  bUIAHFUh249ioAs
7 :  key
.
.
.
97 :  ES
98 :  SS
99 :  WR
100 :  FF

======== IOC INFORMATION ========
AppName, MainActivity, MINSDK, EncryptedDEX, SHA1Sum, C&C ,Size(MB)
cevir kazan , gyuhdfhwlqz.lbkzzysjbhwueqyszj.gkfnt.byuqixelqjd , 20 , assets/sLk.json , 4504b0f9db9867243bb074dc14fc9b330a3e1d73 , hxxp[:]//malimaskim.xyz , 2.217793
```



**Notes:**

>  *DEXDecrypt* in the hercules library also able to automatically
>                             decrypt DEX files of similar malware (like Anubis, ginp) packed
>                             with same method. For usage please refer to code comments on
>                             get_ioc.py .

*It requires **Androguard 3.5.0**. If you are getting an error like below, please upgrade;*

> AttributeError: 'EncodedMethod' object has no attribute
> 'get_instructions_idx'
