# Cerberus Banking Trojan Research

Related research paper will be there soon.

This repository currently has two tools that can be used.

**Hercules**: Cerberus banking trojan configuration decryptor.

**queryCerberus**: Cerberus banking trojan C2 communication implementation.

Stay Safe & Healthy.

Regards, Cyberwise Research Task Force (Cyberwise - RTF).


## Hercules

Hercules automatically finds decryption key for actual DEX of the given Cerberus sample, decrypts it, then decrypts configuration parameters in the actual payload. All statically, in seconds.

 - **Usage:**

```sh
python3.8 get_ioc.py <path_to_apk>
```

*Decrypted DEX file will be saved to current working directory.*

**Sample Output (truncated) (URL scheme is not changed in real output):**
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
>                             like same method. For usage please refer to code comments on
>                             get_ioc.py .

*It requires **Androguard 3.5.0**. If you are getting an error like below, please upgrade;*

> AttributeError: 'EncodedMethod' object has no attribute
> 'get_instructions_idx'


## queryCerberus

queryCerberus mimics Cerberus banking trojan to extract information from C2.

 - **How to Compile:**

Simply run following command on a JDK installed system:
```sh
javac -cp ".:okhttp-3.6.0.jar:okio-1.11.0.jar" queryCerberus.java
```

 - **How to run:**

queryCerberus supports three commands.

>  - register
>  - info
>  - getinject

**register**

Device registration can be made by using register command, it will generate an appropriate ID and sent it to C2. If response is 'ok' this ID can be used for further communication. C2 may not generate response if there is not any registered ID. Recommended to run register before other commands.

 - **Usage:**

```sh
java -cp ".:okhttp-3.6.0.jar:okio-1.11.0.jar" queryCerberus register
```

**info**

Settings can be queried with info command. Response may contain backup C2 domains.

 - **Usage:**

```sh
java -cp ".:okhttp-3.6.0.jar:okio-1.11.0.jar" queryCerberus info
```

**Sample Output (URL scheme will not be changed in actual output):**

```sh
{"this":"global_settings#","id_settings":"[REDACTED]","urls":",hxxp[:]//us0mbizimomrumuzu7din[.]cyou,hxxp[:]//allahdusmaniminbasinavermesin[.]cyou,hxxp[:]//ataratarus0maus0m[.]cyou,hxxp[:]//olalalalalal[.]cyou,hxxp[:]//kurtlarvadisisiber[.]cyou,hxxp[:]//rapimibitiricen[.]cyou,hxxp[:]//benimibitiricen[.]cyou,hxxp[:]//hadibidenesenya[.]cyou,hxxp[:]//hadsizkucik[.]cyou,hxxp[:]//yirtikdondancikmisgibi[.]cyou,hxxp[:]//sabaherkenkalkar[.]cyou,hxxp[:]//bacakarasindansarkar[.]cyou,hxxp[:]//nesenbenibitirebildin[.]cyou,hxxp[:]//nedeogappeninkizii[.]cyou,hxxp[:]//fzbfvbzcvbzcbz[.]cyou,hxxp[:]//fsdfjsdjfsjdfsj[.]cyou,hxxp[:]//xcjvjxcvjxgsjf[.]cyou,hxxp[:]//cxmbcvjbdfjbjdf[.]cyou,hxxp[:]//sdjfjsdfjsdj[.]cyou,hxxp[:]//jferjfejrgjerjg[.]cyou","injection_t":"240","protect_t":"10","cards_t":"600","admin_t":"180","permission_t":"120","emails_t":"45"}
```


**getinject**

This command requires package name parameter to query. It queries given package name for existence of injection template, if exists downloads and saves injection to  package_name.html  file.

 - **Usage:**

```sh
java -cp ".:okhttp-3.6.0.jar:okio-1.11.0.jar" queryCerberus get_inject <package_name>
```
