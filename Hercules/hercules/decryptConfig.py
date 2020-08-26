import re

from hercules import Utils

def all(cfg_src):
	approach=True
	try:
		rc4_key_cfg=re.findall(r'this\.e \= ([^)]*)\;', cfg_src)[0]
		print("Decryption key for strings :", rc4_key_cfg)
	except:
		print("No common key for strings. Each string has it's own key at it's first 12 character.")
		print("Trying to decrypt with this approach, if fails look at the decompilation to find out how it decrypts itself.")
		approach=False
	

	content = cfg_src.splitlines()
	line_number = 0
	C2URL=""
	for i in content:
		txt = i
		
		x = re.findall(r'\(([^)]+)\)', txt)
			
		if x:
			for string in x:
				line_number += 1
				if len(string) > 0:
					if Utils.isBase64(string):
						try:
							if(approach):
								dstr=Utils.decryptStr(string, rc4_key_cfg)
								print(line_number,": ",dstr)
								if "http://" in dstr:
									C2URL=dstr		
							else:
								dstr=Utils.decryptStr(string[12:], string[:12])
								print(line_number,": ",dstr)
								if "http://" in dstr:
									C2URL=dstr
						except:
							continue
					else:
						continue
				else:
					continue
	return C2URL
