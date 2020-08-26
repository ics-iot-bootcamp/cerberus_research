import base64
from Crypto.Cipher import ARC4

def isBase64(s):
	try:
		return base64.b64encode(base64.b64decode(s)).decode("utf-8") == s
	except:
		return False

def decryptStr(encoded, key):
	decoded = base64.b16decode(base64.b64decode(encoded).upper())
	decrypted = ARC4.new(key).decrypt(decoded)
	return decrypted.decode("utf-8")

def javaish(st):
	return "L"+st.replace(".", "/")+";"

def dejavaish(st):
	return st.replace("/", ".")[1:-1]

def between(st, s, e):
	bas=st.find(s)+len(s)
	son=bas + st[bas:].find(e)
	return st[bas : son]

def xor_dec(key, keykey):
	result=""
	uz=len(key)
	uzk=len(keykey)
	for i in range(uz):
		result+=chr(key[i] ^ keykey[i%uzk])
	return result

def RC4_dec_dex(ciphertext, key, outfilename):
	decrypted = ARC4.new(key).decrypt(ciphertext)
	if(decrypted[:3]==b'dex'):
		return True, decrypted
	else:
		return False, ""
