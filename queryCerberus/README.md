## queryCerberus

queryCerberus mimics Cerberus (only latest version, planned to support early v2) banking trojan to extract information from C2.

 ### How to Compile:

Simply run following command on a JDK installed system:
```sh
javac -cp ".:okhttp-3.6.0.jar:okio-1.11.0.jar" queryCerberus.java
```

### How to run:

queryCerberus supports three commands.

>  - register
>  - info
>  - getinject

**register**

Device registration can be made by using register command, it will generate an appropriate ID and sent it to C2. If response is 'ok' this ID can be used for further communication. C2 may not generate response if there is not any registered ID. Recommended to run register before other commands.

### Usage:

```sh
java -cp ".:okhttp-3.6.0.jar:okio-1.11.0.jar" queryCerberus register
```

**info**

Settings can be queried with info command. Response may contain backup C2 domains.

### Usage:

```sh
java -cp ".:okhttp-3.6.0.jar:okio-1.11.0.jar" queryCerberus info
```

Sample Output (URL scheme will not be changed in actual output):

```sh
{"this":"global_settings#","id_settings":"[REDACTED]","urls":",hxxp[:]//us0mbizimomrumuzu7din[.]cyou,hxxp[:]//allahdusmaniminbasinavermesin[.]cyou,hxxp[:]//ataratarus0maus0m[.]cyou,hxxp[:]//olalalalalal[.]cyou,hxxp[:]//kurtlarvadisisiber[.]cyou,hxxp[:]//rapimibitiricen[.]cyou,hxxp[:]//benimibitiricen[.]cyou,hxxp[:]//hadibidenesenya[.]cyou,hxxp[:]//hadsizkucik[.]cyou,hxxp[:]//yirtikdondancikmisgibi[.]cyou,hxxp[:]//sabaherkenkalkar[.]cyou,hxxp[:]//bacakarasindansarkar[.]cyou,hxxp[:]//nesenbenibitirebildin[.]cyou,hxxp[:]//nedeogappeninkizii[.]cyou,hxxp[:]//fzbfvbzcvbzcbz[.]cyou,hxxp[:]//fsdfjsdjfsjdfsj[.]cyou,hxxp[:]//xcjvjxcvjxgsjf[.]cyou,hxxp[:]//cxmbcvjbdfjbjdf[.]cyou,hxxp[:]//sdjfjsdfjsdj[.]cyou,hxxp[:]//jferjfejrgjerjg[.]cyou","injection_t":"240","protect_t":"10","cards_t":"600","admin_t":"180","permission_t":"120","emails_t":"45"}
```


**getinject**

This command requires package name parameter to query. It queries given package name for existence of injection template, if exists downloads and saves injection to  package_name.html  file.

### Usage:

```sh
java -cp ".:okhttp-3.6.0.jar:okio-1.11.0.jar" queryCerberus get_inject <package_name>
```
