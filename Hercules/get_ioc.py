from androguard.misc import AnalyzeAPK
from filehash import FileHash

import sys
import os

from hercules import DEXDecrypt
from hercules import source
from hercules import decryptConfig

import hercules

a, d, dx = AnalyzeAPK(sys.argv[1])

#Usage: python3.8 getioc.py <sample.apk>
#This script statically decrypts encrypted DEX and extracts config file of Cerberus

#Decrypt encrypted DEX
head, tail = os.path.split(sys.argv[1])
outDexName="EXTRACTED_DEX_FROM_"+tail

print()
print("======== KEY AND PACKAGE INFO ========") 
outDexContent, locationDEX=DEXDecrypt.decrypt(a, d, dx, sys.argv[1])
with open(outDexName, "wb") as file:
	file.write(outDexContent)
	file.close()

#Search for the class with configuration parameters
cfg_src=source.getStringsClassSource(a, d, dx, outDexName)

#Decrypt the strings, currently returns C2 URL
print()
print("======== DECRYPTED STRINGS ========") 
decrypted_cfg_src=decryptConfig.all(cfg_src)

#Collect and print other  IoC's
appName = a.get_app_name()
mainActivity=a.get_main_activity()
minSDK=a.get_min_sdk_version()
sha1apk = FileHash('sha1').hash_file(sys.argv[1])
C2URL=decrypted_cfg_src
fileSize=os.path.getsize(sys.argv[1]) * (10**-6)

print()
print("======== IOC INFORMATION ========") 
print("AppName, MainActivity, MINSDK, EncryptedDEX, SHA1Sum, C&C ,Size(MB)")    
print(appName,",", mainActivity,",",minSDK,",",locationDEX,",",sha1apk,",",C2URL,",",fileSize)
